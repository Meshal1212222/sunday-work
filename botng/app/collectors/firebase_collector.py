import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime, date, timedelta
from typing import Dict, Any, List, Optional
import os

from ..config import settings


class FirebaseCollector:
    """جامع بيانات Firebase - Golden Host & Sunday Board"""

    def __init__(self):
        # Initialize Firebase if not already done
        if not firebase_admin._apps:
            cred = credentials.Certificate(settings.google_credentials_path)
            firebase_admin.initialize_app(cred, {
                'databaseURL': settings.firebase_database_url
            })

        self.db = db.reference()

    # ==================== Golden Host Data ====================

    async def get_reports(self, limit: int = 50) -> List[Dict]:
        """جلب البلاغات من Golden Host"""
        try:
            ref = self.db.child('goldenhost/reports')
            data = ref.order_by_child('date').limit_to_last(limit).get()
            return list(data.values()) if data else []
        except Exception as e:
            print(f"Error fetching reports: {e}")
            return []

    async def get_refunds(self, limit: int = 50) -> List[Dict]:
        """جلب الاستردادات"""
        try:
            ref = self.db.child('goldenhost/refunds')
            data = ref.order_by_child('date').limit_to_last(limit).get()
            return list(data.values()) if data else []
        except Exception as e:
            print(f"Error fetching refunds: {e}")
            return []

    async def get_conversations(self, limit: int = 100) -> List[Dict]:
        """جلب المحادثات"""
        try:
            ref = self.db.child('goldenhost/conversations')
            data = ref.limit_to_last(limit).get()
            return list(data.values()) if data else []
        except Exception as e:
            print(f"Error fetching conversations: {e}")
            return []

    async def get_sales(self, limit: int = 100) -> List[Dict]:
        """جلب المبيعات"""
        try:
            ref = self.db.child('goldenhost/sales')
            data = ref.limit_to_last(limit).get()
            return list(data.values()) if data else []
        except Exception as e:
            print(f"Error fetching sales: {e}")
            return []

    async def get_employee_activity(self) -> List[Dict]:
        """جلب نشاط الموظفين"""
        try:
            ref = self.db.child('goldenhost/activity')
            data = ref.get()
            return list(data.values()) if data else []
        except Exception as e:
            print(f"Error fetching activity: {e}")
            return []

    # ==================== Sunday Board Data ====================

    async def get_boards(self) -> Dict[str, Any]:
        """جلب كل البوردات"""
        try:
            ref = self.db.child('sunday/boards')
            return ref.get() or {}
        except Exception as e:
            print(f"Error fetching boards: {e}")
            return {}

    async def get_tasks(self, board_id: str = None) -> List[Dict]:
        """جلب المهام"""
        try:
            if board_id:
                ref = self.db.child(f'sunday/tasks/{board_id}')
            else:
                ref = self.db.child('sunday/tasks')
            data = ref.get()
            if isinstance(data, dict):
                tasks = []
                for board_tasks in data.values():
                    if isinstance(board_tasks, dict):
                        tasks.extend(board_tasks.values())
                    elif isinstance(board_tasks, list):
                        tasks.extend(board_tasks)
                return tasks
            return []
        except Exception as e:
            print(f"Error fetching tasks: {e}")
            return []

    async def get_tasks_by_status(self, status: str) -> List[Dict]:
        """جلب المهام حسب الحالة"""
        tasks = await self.get_tasks()
        return [t for t in tasks if t.get('status') == status]

    async def get_overdue_tasks(self) -> List[Dict]:
        """جلب المهام المتأخرة"""
        tasks = await self.get_tasks()
        today = date.today().isoformat()
        return [t for t in tasks if t.get('dueDate', '') < today and t.get('status') != 'done']

    # ==================== Combined Analytics ====================

    async def get_daily_summary(self, report_date: date = None) -> Dict[str, Any]:
        """ملخص يومي شامل"""
        if report_date is None:
            report_date = date.today()

        date_str = report_date.isoformat()

        # Golden Host Stats
        reports = await self.get_reports(100)
        refunds = await self.get_refunds(100)
        sales = await self.get_sales(100)
        conversations = await self.get_conversations(100)

        # Filter by date
        today_reports = [r for r in reports if r.get('date', '').startswith(date_str)]
        today_refunds = [r for r in refunds if r.get('date', '').startswith(date_str)]
        today_sales = [s for s in sales if s.get('date', '').startswith(date_str)]
        today_conversations = [c for c in conversations if c.get('date', '').startswith(date_str)]

        # Sunday Board Stats
        tasks = await self.get_tasks()
        overdue_tasks = await self.get_overdue_tasks()

        completed_today = [t for t in tasks if t.get('completedDate', '').startswith(date_str)]

        return {
            "date": date_str,
            "golden_host": {
                "reports_count": len(today_reports),
                "refunds_count": len(today_refunds),
                "refunds_total": sum(float(r.get('amount', 0)) for r in today_refunds),
                "sales_count": len(today_sales),
                "conversations_count": len(today_conversations),
                "reports": today_reports[:5],  # آخر 5
                "refunds": today_refunds[:5]
            },
            "sunday_board": {
                "total_tasks": len(tasks),
                "completed_today": len(completed_today),
                "overdue_tasks": len(overdue_tasks),
                "overdue_list": overdue_tasks[:5]
            }
        }

    async def get_employee_performance(self) -> List[Dict]:
        """أداء الموظفين"""
        sales = await self.get_sales(500)
        conversations = await self.get_conversations(500)

        # Group by employee
        employee_stats = {}

        for sale in sales:
            emp = sale.get('employeeName', 'غير معروف')
            if emp not in employee_stats:
                employee_stats[emp] = {'sales': 0, 'conversations': 0, 'reports': 0}
            employee_stats[emp]['sales'] += 1

        for conv in conversations:
            emp = conv.get('agentName', 'غير معروف')
            if emp not in employee_stats:
                employee_stats[emp] = {'sales': 0, 'conversations': 0, 'reports': 0}
            employee_stats[emp]['conversations'] += 1

        return [
            {'name': name, **stats}
            for name, stats in employee_stats.items()
        ]

    # ==================== Write Operations ====================

    async def add_task(self, board_id: str, task: Dict) -> str:
        """إضافة مهمة جديدة"""
        try:
            ref = self.db.child(f'sunday/tasks/{board_id}')
            new_ref = ref.push(task)
            return new_ref.key
        except Exception as e:
            print(f"Error adding task: {e}")
            return None

    async def update_task(self, board_id: str, task_id: str, updates: Dict) -> bool:
        """تحديث مهمة"""
        try:
            ref = self.db.child(f'sunday/tasks/{board_id}/{task_id}')
            ref.update(updates)
            return True
        except Exception as e:
            print(f"Error updating task: {e}")
            return False

    async def add_report(self, report: Dict) -> str:
        """إضافة بلاغ جديد"""
        try:
            ref = self.db.child('goldenhost/reports')
            new_ref = ref.push(report)
            return new_ref.key
        except Exception as e:
            print(f"Error adding report: {e}")
            return None

    async def log_activity(self, activity: Dict) -> bool:
        """تسجيل نشاط"""
        try:
            activity['timestamp'] = datetime.now().isoformat()
            ref = self.db.child('goldenhost/activity')
            ref.push(activity)
            return True
        except Exception as e:
            print(f"Error logging activity: {e}")
            return False
