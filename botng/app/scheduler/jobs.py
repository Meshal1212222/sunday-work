from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime
import asyncio
import httpx
import os

from ..config import settings
from ..reporters.smart_report import SmartReportGenerator
from ..integrations.ultramsg import UltraMsgClient
from ..database import SessionLocal, ScheduledJob

# Global scheduler instance
scheduler = AsyncIOScheduler()


async def upload_pdf_and_get_url(pdf_path: str) -> str:
    """رفع PDF والحصول على رابط مؤقت"""
    # Upload to file.io for temporary hosting
    async with httpx.AsyncClient(timeout=60.0) as client:
        with open(pdf_path, 'rb') as f:
            files = {'file': (os.path.basename(pdf_path), f, 'application/pdf')}
            response = await client.post('https://file.io', files=files)
            if response.status_code == 200:
                data = response.json()
                return data.get('link', '')
    return ''


async def send_daily_report():
    """إرسال التقرير اليومي التلقائي للقروب"""
    print(f"جاري إرسال التقرير اليومي... {datetime.now()}")

    try:
        generator = SmartReportGenerator()
        whatsapp = UltraMsgClient()

        # إنشاء التقرير (نص + PDF)
        report = await generator.generate_daily_report()

        # تحديد المستلم (القروب أو الأدمن)
        recipient = settings.report_group_id if settings.report_group_id else settings.admin_phone

        # إرسال النص أولاً
        text_result = await whatsapp.send_message(
            recipient,
            report["text"]
        )
        print(f"تم إرسال النص: {text_result}")

        # رفع PDF والحصول على الرابط
        pdf_path = report.get("pdf_path")
        if pdf_path and os.path.exists(pdf_path):
            # Try multiple upload services with retry
            pdf_url = None

            # Method 1: file.io
            for attempt in range(3):
                try:
                    pdf_url = await upload_pdf_and_get_url(pdf_path)
                    if pdf_url:
                        break
                except Exception as e:
                    print(f"Upload attempt {attempt + 1} failed: {e}")
                    await asyncio.sleep(2 ** attempt)

            if pdf_url:
                # إرسال PDF
                pdf_result = await whatsapp.send_document(
                    recipient,
                    pdf_url,
                    f"Golden_Host_Report_{datetime.now().strftime('%Y%m%d')}.pdf"
                )
                print(f"تم إرسال PDF: {pdf_result}")
            else:
                print("فشل رفع PDF")

            # تنظيف الملف المؤقت
            try:
                os.remove(pdf_path)
            except:
                pass

        print(f"تم إرسال التقرير اليومي بنجاح")

        # تحديث سجل المهمة
        _update_job_record("daily_report")

    except Exception as e:
        print(f"فشل إرسال التقرير: {e}")
        import traceback
        traceback.print_exc()


async def send_weekly_report():
    """إرسال التقرير الأسبوعي"""
    print(f"جاري إرسال التقرير الأسبوعي... {datetime.now()}")

    try:
        generator = SmartReportGenerator()
        whatsapp = UltraMsgClient()

        report = await generator.generate_weekly_report()

        # تحديد المستلم
        recipient = settings.report_group_id if settings.report_group_id else settings.admin_phone

        result = await whatsapp.send_message(
            recipient,
            report
        )

        print(f"تم إرسال التقرير الأسبوعي: {result}")

        _update_job_record("weekly_report")

    except Exception as e:
        print(f"فشل إرسال التقرير الأسبوعي: {e}")


async def sync_data():
    """مزامنة البيانات من المصادر"""
    print(f"جاري مزامنة البيانات... {datetime.now()}")

    from ..collectors.clarity import ClarityCollector
    from ..collectors.callcenter import CallCenterCollector

    try:
        clarity = ClarityCollector()
        callcenter = CallCenterCollector()

        # جمع البيانات (سيعيد رسالة تتطلب إدخال يدوي حالياً)
        await clarity.collect()
        await callcenter.collect()

        print("تم فحص مصادر البيانات")

        _update_job_record("data_sync")

    except Exception as e:
        print(f"فشل المزامنة: {e}")


def _update_job_record(job_name: str):
    """تحديث سجل المهمة في قاعدة البيانات"""
    db = SessionLocal()
    try:
        job = db.query(ScheduledJob).filter(ScheduledJob.job_name == job_name).first()
        if job:
            job.last_run = datetime.utcnow()
            db.commit()
    finally:
        db.close()


def start_scheduler():
    """بدء جدولة المهام"""

    # استخراج وقت التقرير من الإعدادات
    report_hour, report_minute = settings.report_time.split(":")

    # التقرير اليومي - كل يوم في الوقت المحدد (11:00 صباحاً بتوقيت الرياض = 08:00 UTC)
    # Riyadh is UTC+3, so 11:00 Riyadh = 08:00 UTC
    utc_hour = int(report_hour) - 3
    if utc_hour < 0:
        utc_hour += 24

    scheduler.add_job(
        send_daily_report,
        CronTrigger(hour=utc_hour, minute=int(report_minute)),
        id="daily_report",
        name="التقرير اليومي",
        replace_existing=True
    )

    # التقرير الأسبوعي - كل أحد الساعة 9 صباحاً (06:00 UTC)
    scheduler.add_job(
        send_weekly_report,
        CronTrigger(day_of_week="sun", hour=6, minute=0),
        id="weekly_report",
        name="التقرير الأسبوعي",
        replace_existing=True
    )

    # مزامنة البيانات - كل 6 ساعات
    scheduler.add_job(
        sync_data,
        CronTrigger(hour="*/6"),
        id="data_sync",
        name="مزامنة البيانات",
        replace_existing=True
    )

    # بدء الجدولة
    scheduler.start()

    print(f"تم تفعيل الجدولة:")
    print(f"   - التقرير اليومي: {settings.report_time} (توقيت الرياض)")
    print(f"   - التقرير الأسبوعي: الأحد 09:00 (توقيت الرياض)")
    print(f"   - مزامنة البيانات: كل 6 ساعات")
    print(f"   - المستلم: {settings.report_group_id or settings.admin_phone}")

    # حفظ المهام في قاعدة البيانات
    _save_jobs_to_db()


def shutdown_scheduler():
    """إيقاف الجدولة"""
    scheduler.shutdown()
    print("تم إيقاف الجدولة")


def _save_jobs_to_db():
    """حفظ المهام المجدولة في قاعدة البيانات"""
    db = SessionLocal()
    try:
        jobs = [
            {
                "job_name": "daily_report",
                "job_type": "daily_report",
                "schedule": settings.report_time
            },
            {
                "job_name": "weekly_report",
                "job_type": "weekly_report",
                "schedule": "sunday 09:00"
            },
            {
                "job_name": "data_sync",
                "job_type": "data_sync",
                "schedule": "every 6 hours"
            }
        ]

        for job_data in jobs:
            existing = db.query(ScheduledJob).filter(
                ScheduledJob.job_name == job_data["job_name"]
            ).first()

            if not existing:
                job = ScheduledJob(**job_data)
                db.add(job)

        db.commit()
    finally:
        db.close()


def get_scheduled_jobs():
    """جلب قائمة المهام المجدولة"""
    return [
        {
            "id": job.id,
            "name": job.name,
            "next_run": job.next_run_time.isoformat() if job.next_run_time else None
        }
        for job in scheduler.get_jobs()
    ]


async def trigger_daily_report_now():
    """تشغيل التقرير اليومي فوراً (للاختبار)"""
    await send_daily_report()
