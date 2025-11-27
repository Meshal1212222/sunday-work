"""
Firebase Service
جلب إحصائيات من Firebase Realtime Database
"""

import os
from datetime import datetime
from typing import Dict, Any, List, Optional
import httpx

class FirebaseService:
    def __init__(self):
        self.database_url = os.getenv(
            "FIREBASE_DATABASE_URL",
            "https://sunday-fb28c-default-rtdb.firebaseio.com"
        )
        self.api_key = os.getenv("FIREBASE_API_KEY", "")

    async def _fetch(self, path: str) -> Optional[Dict]:
        """Fetch data from Firebase"""
        try:
            url = f"{self.database_url}/{path}.json"
            async with httpx.AsyncClient() as client:
                response = await client.get(url)
                if response.status_code == 200:
                    return response.json()
                return None
        except Exception as e:
            print(f"❌ Firebase fetch error: {e}")
            return None

    async def get_golden_host_stats(self) -> Dict[str, Any]:
        """إحصائيات Golden Host"""
        reports = await self._fetch("goldenhost/reports") or []
        refunds = await self._fetch("goldenhost/refunds") or []
        conversations = await self._fetch("goldenhost/conversations") or []
        sales = await self._fetch("goldenhost/sales") or []
        activity = await self._fetch("goldenhost/activity") or []

        # Count items (handle both list and dict formats)
        def count_items(data):
            if isinstance(data, list):
                return len(data)
            elif isinstance(data, dict):
                return len(data.keys())
            return 0

        return {
            "total_reports": count_items(reports),
            "total_refunds": count_items(refunds),
            "total_conversations": count_items(conversations),
            "total_sales": count_items(sales),
            "activity_count": count_items(activity),
            "reports_today": self._count_today(reports),
            "refunds_today": self._count_today(refunds),
            "sales_today": self._count_today(sales)
        }

    async def get_sunday_board_stats(self) -> Dict[str, Any]:
        """إحصائيات Sunday Board"""
        boards = await self._fetch("sunday/boards") or {}
        tasks = await self._fetch("sunday/tasks") or {}

        total_tasks = 0
        completed_tasks = 0
        in_progress_tasks = 0

        if isinstance(tasks, dict):
            for board_tasks in tasks.values():
                if isinstance(board_tasks, dict):
                    for task in board_tasks.values():
                        total_tasks += 1
                        status = task.get("status", "").lower()
                        if status in ["done", "completed", "مكتمل"]:
                            completed_tasks += 1
                        elif status in ["in_progress", "working", "قيد التنفيذ"]:
                            in_progress_tasks += 1

        return {
            "total_boards": len(boards) if isinstance(boards, dict) else 0,
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "in_progress_tasks": in_progress_tasks,
            "pending_tasks": total_tasks - completed_tasks - in_progress_tasks,
            "completion_rate": round((completed_tasks / total_tasks * 100) if total_tasks > 0 else 0, 1)
        }

    async def get_all_stats(self) -> Dict[str, Any]:
        """جميع الإحصائيات"""
        golden_host = await self.get_golden_host_stats()
        sunday_board = await self.get_sunday_board_stats()

        return {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "timestamp": datetime.now().isoformat(),
            "golden_host": golden_host,
            "sunday_board": sunday_board,
            "summary": {
                "total_activities": golden_host["activity_count"],
                "total_customer_interactions": (
                    golden_host["total_reports"] +
                    golden_host["total_refunds"] +
                    golden_host["total_conversations"]
                ),
                "task_completion_rate": sunday_board["completion_rate"]
            }
        }

    def _count_today(self, data) -> int:
        """Count items created today"""
        today = datetime.now().strftime("%Y-%m-%d")
        count = 0

        items = []
        if isinstance(data, list):
            items = data
        elif isinstance(data, dict):
            items = data.values()

        for item in items:
            if isinstance(item, dict):
                created = item.get("date", item.get("createdAt", item.get("timestamp", "")))
                if isinstance(created, str) and today in created:
                    count += 1

        return count

    async def get_activity_log(self, limit: int = 20) -> List[Dict[str, Any]]:
        """جلب سجل النشاطات"""
        activity = await self._fetch("goldenhost/activity")

        if not activity:
            return []

        items = []
        if isinstance(activity, list):
            items = activity[-limit:]
        elif isinstance(activity, dict):
            items = list(activity.values())[-limit:]

        return items

firebase_service = FirebaseService()
