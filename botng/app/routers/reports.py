"""
Reports Router
API endpoints للتقارير
"""

from fastapi import APIRouter, Query, BackgroundTasks
from typing import Optional
from datetime import datetime

from app.services.report_generator import (
    generate_daily_report,
    generate_quick_report,
    generate_custom_report,
    send_test_report_to_phone
)
from app.services.whatsapp_service import whatsapp_service

router = APIRouter()


@router.post("/send-report")
async def send_report(
    background_tasks: BackgroundTasks,
    report_type: str = Query(default="daily", enum=["daily", "weekly", "quick"])
):
    """إرسال تقرير"""

    if report_type == "quick":
        # Quick report - immediate response
        result = await generate_quick_report()
        return {
            "status": "success",
            "type": "quick",
            "report": result,
            "timestamp": datetime.now().isoformat()
        }

    # Daily/Weekly reports - run in background
    background_tasks.add_task(generate_daily_report)

    return {
        "status": "queued",
        "type": report_type,
        "message": f"تقرير {report_type} تم جدولته وسيتم إرساله قريباً",
        "timestamp": datetime.now().isoformat()
    }


@router.get("/preview")
async def preview_report():
    """معاينة التقرير بدون إرسال"""

    result = await generate_quick_report()

    return {
        "status": "success",
        "preview": result,
        "note": "هذا معاينة فقط - لم يتم إرسال التقرير",
        "timestamp": datetime.now().isoformat()
    }


@router.post("/custom")
async def custom_report(
    report_type: str = Query(default="quick", enum=["quick", "weekly", "monthly"])
):
    """توليد تقرير مخصص"""

    result = await generate_custom_report(report_type)

    return {
        "status": "success",
        "report": result,
        "timestamp": datetime.now().isoformat()
    }


@router.post("/send-now")
async def send_report_now():
    """إرسال التقرير فوراً"""

    result = await generate_daily_report()

    return {
        "status": "sent",
        "result": result,
        "timestamp": datetime.now().isoformat()
    }


@router.post("/test-whatsapp")
async def test_whatsapp(phone: Optional[str] = None):
    """اختبار إرسال واتساب"""

    test_message = """
🧪 *رسالة اختبار من Botng*

هذه رسالة اختبار للتأكد من عمل إرسال الواتساب.

✅ الاتصال يعمل بشكل صحيح!

⏰ الوقت: {time}
""".format(time=datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

    if phone:
        result = await whatsapp_service.send_message(phone, test_message)
    else:
        result = await whatsapp_service.send_daily_report(test_message)

    return {
        "status": "test_sent",
        "result": result,
        "timestamp": datetime.now().isoformat()
    }


@router.get("/schedule")
async def get_schedule():
    """جدول التقارير"""

    return {
        "status": "success",
        "schedule": {
            "daily_report": {
                "time": "09:00",
                "timezone": "Asia/Riyadh",
                "enabled": True
            }
        },
        "next_run": "غداً الساعة 9:00 صباحاً بتوقيت الرياض"
    }


@router.post("/send-test/{phone}")
async def send_test_to_phone(phone: str):
    """إرسال تقرير اختباري لرقم محدد"""

    # Clean phone number
    clean_phone = phone.replace(" ", "").replace("-", "").replace("+", "")
    if not clean_phone.startswith("966"):
        clean_phone = "966" + clean_phone.lstrip("0")

    result = await send_test_report_to_phone(clean_phone)

    return {
        "status": "sent",
        "phone": clean_phone,
        "result": result,
        "timestamp": datetime.now().isoformat()
    }
