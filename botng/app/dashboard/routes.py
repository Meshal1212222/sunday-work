from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from datetime import datetime, date, timedelta
from typing import Dict, Any, List
import os

from ..collectors.firebase_collector import FirebaseCollector
from ..collectors.google_analytics import GoogleAnalyticsCollector
from ..reporters.smart_report import SmartReportGenerator
from ..automations.triggers import AutomationTriggers
from ..config import settings

router = APIRouter()

# Templates
templates_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "templates")
templates = Jinja2Templates(directory=templates_dir)


# ==================== Dashboard Page ====================

@router.get("/", response_class=HTMLResponse)
async def dashboard_page(request: Request):
    """صفحة لوحة التحكم الرئيسية"""
    return templates.TemplateResponse("dashboard.html", {"request": request})


# ==================== Stats API ====================

@router.get("/stats")
async def get_dashboard_stats():
    """إحصائيات لوحة التحكم"""
    try:
        firebase = FirebaseCollector()
        today = date.today()

        # جلب البيانات من Firebase
        daily_data = await firebase.get_daily_summary(today)

        # Google Analytics
        ga_data = {}
        try:
            ga = GoogleAnalyticsCollector()
            ga_result = await ga.collect_daily_report()
            if ga_result.get('status') == 'success':
                ga_data = ga_result['data']
        except Exception as e:
            print(f"GA Error: {e}")

        return {
            "status": "success",
            "timestamp": datetime.now().isoformat(),
            "golden_host": daily_data.get('golden_host', {}),
            "sunday_board": daily_data.get('sunday_board', {}),
            "analytics": ga_data
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "golden_host": {},
            "sunday_board": {},
            "analytics": {}
        }


# ==================== Tasks API ====================

@router.get("/tasks")
async def get_tasks():
    """جلب قائمة المهام"""
    try:
        firebase = FirebaseCollector()
        tasks = await firebase.get_tasks()

        # إضافة حالة "متأخر" للمهام المتأخرة
        today = date.today()
        for task in tasks:
            due_date_str = task.get('due_date')
            if due_date_str and task.get('status') != 'done':
                try:
                    due_date = datetime.strptime(due_date_str, '%Y-%m-%d').date()
                    if due_date < today:
                        task['status'] = 'overdue'
                except:
                    pass

        return tasks

    except Exception as e:
        return []


@router.get("/tasks/overdue")
async def get_overdue_tasks():
    """جلب المهام المتأخرة فقط"""
    try:
        firebase = FirebaseCollector()
        overdue = await firebase.get_overdue_tasks()
        return overdue
    except Exception as e:
        return []


# ==================== Activity API ====================

@router.get("/activity")
async def get_activity():
    """جلب آخر النشاطات"""
    try:
        firebase = FirebaseCollector()

        activities = []

        # آخر البلاغات
        reports = await firebase.get_reports(5)
        for r in reports:
            activities.append({
                "type": "report",
                "title": "بلاغ جديد",
                "description": r.get('subject', 'بدون عنوان')[:50],
                "time": r.get('created_at', '')[:10] if r.get('created_at') else '',
                "timestamp": r.get('created_at', '')
            })

        # آخر المهام
        tasks = await firebase.get_tasks()
        recent_tasks = sorted(
            [t for t in tasks if t.get('created_at')],
            key=lambda x: x.get('created_at', ''),
            reverse=True
        )[:5]

        for t in recent_tasks:
            activities.append({
                "type": "task",
                "title": "مهمة جديدة",
                "description": t.get('title', 'بدون عنوان')[:50],
                "time": t.get('created_at', '')[:10] if t.get('created_at') else '',
                "timestamp": t.get('created_at', '')
            })

        # ترتيب حسب الوقت
        activities.sort(key=lambda x: x.get('timestamp', ''), reverse=True)

        return activities[:10]

    except Exception as e:
        return []


# ==================== Reports API ====================

@router.post("/send-report")
async def send_report(type: str = "daily"):
    """إرسال تقرير عبر واتساب"""
    try:
        generator = SmartReportGenerator()

        if type == "daily":
            report = await generator.generate_daily_report()
        elif type == "weekly":
            report = await generator.generate_weekly_report()
        else:
            report = await generator.generate_daily_report()

        # إرسال للقروب
        await generator.whatsapp.send_message(settings.report_group_id, report)

        return {
            "status": "sent",
            "type": type,
            "timestamp": datetime.now().isoformat()
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


# ==================== Triggers API ====================

@router.post("/check-triggers")
async def check_triggers():
    """فحص التنبيهات"""
    try:
        triggers = AutomationTriggers()

        results = {
            "new_reports": await triggers.check_new_reports(),
            "high_refunds": await triggers.check_high_refunds(),
            "overdue_tasks": await triggers.check_overdue_tasks()
        }

        checked_count = sum(1 for r in results.values() if r)

        return {
            "status": "checked",
            "checked": checked_count,
            "results": results,
            "timestamp": datetime.now().isoformat()
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "checked": 0
        }


# ==================== Sync API ====================

@router.post("/sync")
async def sync_data():
    """مزامنة البيانات من جميع المصادر"""
    try:
        firebase = FirebaseCollector()

        # مزامنة البيانات
        results = {
            "reports": len(await firebase.get_reports(100)),
            "refunds": len(await firebase.get_refunds(100)),
            "tasks": len(await firebase.get_tasks()),
            "conversations": len(await firebase.get_conversations(100))
        }

        return {
            "status": "synced",
            "results": results,
            "timestamp": datetime.now().isoformat()
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


# ==================== Systems Status API ====================

@router.get("/systems-status")
async def get_systems_status():
    """حالة الأنظمة المتصلة"""
    status = {
        "golden_host": {"status": "unknown", "message": ""},
        "sunday_board": {"status": "unknown", "message": ""},
        "google_analytics": {"status": "unknown", "message": ""},
        "whatsapp": {"status": "unknown", "message": ""},
        "firebase": {"status": "unknown", "message": ""},
        "openai": {"status": "unknown", "message": ""}
    }

    # فحص Firebase
    try:
        firebase = FirebaseCollector()
        await firebase.get_tasks()
        status["firebase"] = {"status": "connected", "message": "متصل"}
        status["golden_host"] = {"status": "connected", "message": "متصل"}
        status["sunday_board"] = {"status": "connected", "message": "متصل"}
    except Exception as e:
        status["firebase"] = {"status": "error", "message": str(e)}

    # فحص Google Analytics
    try:
        ga = GoogleAnalyticsCollector()
        result = await ga.collect_daily_report()
        if result.get('status') == 'success':
            status["google_analytics"] = {"status": "connected", "message": "متصل"}
        else:
            status["google_analytics"] = {"status": "error", "message": result.get('message', 'خطأ')}
    except Exception as e:
        status["google_analytics"] = {"status": "error", "message": str(e)}

    # فحص WhatsApp
    try:
        if settings.ultramsg_instance_id and settings.ultramsg_token:
            status["whatsapp"] = {"status": "connected", "message": "متصل"}
        else:
            status["whatsapp"] = {"status": "error", "message": "بيانات الاعتماد مفقودة"}
    except Exception as e:
        status["whatsapp"] = {"status": "error", "message": str(e)}

    # فحص OpenAI
    try:
        if settings.openai_api_key:
            status["openai"] = {"status": "connected", "message": "متصل"}
        else:
            status["openai"] = {"status": "error", "message": "API Key مفقود"}
    except Exception as e:
        status["openai"] = {"status": "error", "message": str(e)}

    return status
