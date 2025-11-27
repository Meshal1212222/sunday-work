from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime
import asyncio

from ..config import settings
from ..reporters.report_generator import ReportGenerator
from ..integrations.ultramsg import UltraMsgClient
from ..database import SessionLocal, ScheduledJob

# Global scheduler instance
scheduler = AsyncIOScheduler()


async def send_daily_report():
    """إرسال التقرير اليومي التلقائي"""
    print(f"📊 جاري إرسال التقرير اليومي... {datetime.now()}")

    try:
        generator = ReportGenerator()
        whatsapp = UltraMsgClient()

        # إنشاء التقرير
        report = await generator.generate_daily_report()

        # إرسال للأدمن
        result = await whatsapp.send_message(
            settings.admin_phone,
            report["content"]
        )

        print(f"✅ تم إرسال التقرير اليومي: {result}")

        # تحديث سجل المهمة
        _update_job_record("daily_report")

    except Exception as e:
        print(f"❌ فشل إرسال التقرير: {e}")


async def send_weekly_report():
    """إرسال التقرير الأسبوعي"""
    print(f"📈 جاري إرسال التقرير الأسبوعي... {datetime.now()}")

    try:
        generator = ReportGenerator()
        whatsapp = UltraMsgClient()

        report = await generator.generate_weekly_report()

        result = await whatsapp.send_message(
            settings.admin_phone,
            report["content"]
        )

        print(f"✅ تم إرسال التقرير الأسبوعي: {result}")

        _update_job_record("weekly_report")

    except Exception as e:
        print(f"❌ فشل إرسال التقرير الأسبوعي: {e}")


async def sync_data():
    """مزامنة البيانات من المصادر"""
    print(f"🔄 جاري مزامنة البيانات... {datetime.now()}")

    from ..collectors.clarity import ClarityCollector
    from ..collectors.callcenter import CallCenterCollector

    try:
        clarity = ClarityCollector()
        callcenter = CallCenterCollector()

        # جمع البيانات (سيعيد رسالة تتطلب إدخال يدوي حالياً)
        await clarity.collect()
        await callcenter.collect()

        print("✅ تم فحص مصادر البيانات")

        _update_job_record("data_sync")

    except Exception as e:
        print(f"❌ فشل المزامنة: {e}")


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

    # التقرير اليومي - كل يوم في الوقت المحدد
    scheduler.add_job(
        send_daily_report,
        CronTrigger(hour=int(report_hour), minute=int(report_minute)),
        id="daily_report",
        name="التقرير اليومي",
        replace_existing=True
    )

    # التقرير الأسبوعي - كل أحد الساعة 9 صباحاً
    scheduler.add_job(
        send_weekly_report,
        CronTrigger(day_of_week="sun", hour=9, minute=0),
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

    print(f"⏰ تم تفعيل الجدولة:")
    print(f"   - التقرير اليومي: {settings.report_time}")
    print(f"   - التقرير الأسبوعي: الأحد 09:00")
    print(f"   - مزامنة البيانات: كل 6 ساعات")

    # حفظ المهام في قاعدة البيانات
    _save_jobs_to_db()


def shutdown_scheduler():
    """إيقاف الجدولة"""
    scheduler.shutdown()
    print("⏹️ تم إيقاف الجدولة")


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
