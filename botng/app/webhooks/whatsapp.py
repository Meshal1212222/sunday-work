from fastapi import APIRouter, Request, BackgroundTasks
from typing import Dict, Any
from datetime import datetime

from ..config import settings
from ..database import SessionLocal, WhatsAppMessage
from ..integrations.ultramsg import UltraMsgClient
from ..analyzers.openai_analyzer import OpenAIAnalyzer
from ..reporters.smart_report import SmartReportGenerator

router = APIRouter()


# الأوامر المتاحة
COMMANDS = {
    # التقارير
    "تقرير": "daily_report",
    "اسبوعي": "weekly_report",
    "حالة": "status_report",
    "موظفين": "employee_report",

    # Golden Host
    "بلاغات": "reports_summary",
    "استردادات": "refunds_summary",
    "محادثات": "conversations_summary",

    # Sunday Board
    "مهام": "tasks_summary",
    "متاخرة": "overdue_tasks",

    # Analytics
    "زوار": "visitors_report",
    "مقارنة": "comparison_report",

    # Help
    "مساعدة": "help",
    "اوامر": "help",
    "help": "help",
}


async def process_incoming_message(data: Dict[str, Any]):
    """معالجة الرسائل الواردة في الخلفية"""

    phone = data.get("from", "").replace("@c.us", "")
    message = data.get("body", "").strip()
    message_id = data.get("id", "")

    # تجاهل الرسائل الفارغة
    if not message:
        return

    # حفظ الرسالة في قاعدة البيانات
    db = SessionLocal()
    try:
        msg_record = WhatsAppMessage(
            direction="incoming",
            phone=phone,
            message=message,
            message_type="command" if message in COMMANDS else "text"
        )
        db.add(msg_record)
        db.commit()

        # معالجة الأمر
        response = await handle_command(message, phone)

        # إرسال الرد
        whatsapp = UltraMsgClient()
        await whatsapp.send_message(phone, response)

        # حفظ الرد
        msg_record.processed = True
        msg_record.response = response
        db.commit()

    finally:
        db.close()


async def handle_command(message: str, phone: str) -> str:
    """معالجة الأوامر"""

    message_lower = message.strip()
    generator = SmartReportGenerator()

    # ==================== Help ====================
    if message_lower in ["مساعدة", "اوامر", "help", "?"]:
        return """🤖 *أوامر Botng*
━━━━━━━━━━━━━━━━━━━━━

📊 *التقارير*
├ تقرير - التقرير اليومي الشامل
├ اسبوعي - التقرير الأسبوعي
├ حالة - الحالة اللحظية
└ موظفين - أداء الموظفين

🏨 *Golden Host*
├ بلاغات - ملخص البلاغات
├ استردادات - ملخص الاستردادات
└ محادثات - ملخص المحادثات

📋 *Sunday Board*
├ مهام - ملخص المهام
└ متاخرة - المهام المتأخرة

📈 *Analytics*
├ زوار - تقرير الزوار
└ مقارنة - مقارنة بالأمس

━━━━━━━━━━━━━━━━━━━━━
🏢 _شركة ليفل أب القابضة_"""

    # ==================== Reports ====================
    if message_lower == "تقرير":
        return await generator.generate_daily_report()

    if message_lower == "اسبوعي":
        return await generator.generate_weekly_report()

    if message_lower == "حالة":
        return await generator.generate_realtime_status()

    if message_lower == "موظفين":
        return await generator.generate_employee_report()

    # ==================== Golden Host ====================
    if message_lower == "بلاغات":
        firebase = generator.firebase
        reports = await firebase.get_reports(10)
        if not reports:
            return "📝 لا توجد بلاغات حالياً"

        lines = ["📝 *آخر البلاغات*", "━━━━━━━━━━━━━━━"]
        for r in reports[:10]:
            lines.append(f"• {r.get('subject', 'بدون عنوان')[:40]}")
        lines.append("━━━━━━━━━━━━━━━")
        lines.append("_شركة ليفل أب القابضة_")
        return "\n".join(lines)

    if message_lower == "استردادات":
        firebase = generator.firebase
        refunds = await firebase.get_refunds(10)
        if not refunds:
            return "💰 لا توجد استردادات حالياً"

        total = sum(float(r.get('amount', 0)) for r in refunds)
        lines = ["💰 *آخر الاستردادات*", "━━━━━━━━━━━━━━━"]
        for r in refunds[:10]:
            lines.append(f"• {r.get('amount', 0):,.0f} ر.س - {r.get('reason', 'بدون سبب')[:30]}")
        lines.append(f"━━━━━━━━━━━━━━━")
        lines.append(f"💵 الإجمالي: {total:,.0f} ر.س")
        lines.append("_شركة ليفل أب القابضة_")
        return "\n".join(lines)

    if message_lower == "محادثات":
        firebase = generator.firebase
        conversations = await firebase.get_conversations(20)
        if not conversations:
            return "💬 لا توجد محادثات حالياً"

        responded = len([c for c in conversations if c.get('status') == 'responded'])
        rate = (responded / len(conversations) * 100) if conversations else 0

        return f"""💬 *ملخص المحادثات*
━━━━━━━━━━━━━━━
📊 الإجمالي: {len(conversations)}
✅ تم الرد: {responded}
📈 نسبة الرد: {rate:.1f}%
━━━━━━━━━━━━━━━
_شركة ليفل أب القابضة_"""

    # ==================== Sunday Board ====================
    if message_lower == "مهام":
        firebase = generator.firebase
        tasks = await firebase.get_tasks()

        pending = len([t for t in tasks if t.get('status') == 'pending'])
        in_progress = len([t for t in tasks if t.get('status') == 'in_progress'])
        done = len([t for t in tasks if t.get('status') == 'done'])

        return f"""📋 *ملخص المهام*
━━━━━━━━━━━━━━━
📌 الإجمالي: {len(tasks)}
⏳ قيد الانتظار: {pending}
🔄 قيد التنفيذ: {in_progress}
✅ مكتملة: {done}
━━━━━━━━━━━━━━━
_شركة ليفل أب القابضة_"""

    if message_lower == "متاخرة":
        firebase = generator.firebase
        overdue = await firebase.get_overdue_tasks()

        if not overdue:
            return "✅ لا توجد مهام متأخرة!"

        lines = ["⚠️ *المهام المتأخرة*", "━━━━━━━━━━━━━━━"]
        for t in overdue[:10]:
            lines.append(f"• {t.get('title', 'بدون عنوان')[:40]}")
        lines.append("━━━━━━━━━━━━━━━")
        lines.append("_شركة ليفل أب القابضة_")
        return "\n".join(lines)

    # ==================== Analytics ====================
    if message_lower == "زوار":
        try:
            from ..collectors.google_analytics import GoogleAnalyticsCollector
            ga = GoogleAnalyticsCollector()
            result = await ga.collect_daily_report()
            if result.get('status') == 'success':
                data = result['data']
                return f"""👥 *تقرير الزوار*
━━━━━━━━━━━━━━━
📅 التاريخ: {data.get('date', 'N/A')}
👥 المستخدمين: {data.get('active_users', 0)}
📱 الجلسات: {data.get('sessions', 0)}
📄 المشاهدات: {data.get('page_views', 0)}
🆕 جدد: {data.get('new_users', 0)}
━━━━━━━━━━━━━━━
_شركة ليفل أب القابضة_"""
        except Exception as e:
            return f"⚠️ خطأ في جلب بيانات الزوار"

    if message_lower == "مقارنة":
        try:
            from ..collectors.google_analytics import GoogleAnalyticsCollector
            ga = GoogleAnalyticsCollector()
            result = await ga.collect_comparison()
            if result.get('status') == 'success':
                changes = result['data']['changes']
                return f"""📈 *مقارنة بالأمس*
━━━━━━━━━━━━━━━
👥 المستخدمين: {changes.get('active_users', 0):+.1f}%
📱 الجلسات: {changes.get('sessions', 0):+.1f}%
📄 المشاهدات: {changes.get('page_views', 0):+.1f}%
🆕 جدد: {changes.get('new_users', 0):+.1f}%
━━━━━━━━━━━━━━━
_شركة ليفل أب القابضة_"""
        except Exception as e:
            return f"⚠️ خطأ في جلب المقارنة"

    # ==================== AI Response ====================
    try:
        analyzer = OpenAIAnalyzer()
        response = await analyzer.process_command(message)
        return response
    except Exception as e:
        return f"""⚠️ لم أفهم الأمر.

جرب أحد هذه الأوامر:
• تقرير
• مهام
• بلاغات
• مساعدة

_للمزيد اكتب: مساعدة_"""


@router.post("/whatsapp")
async def whatsapp_webhook(request: Request, background_tasks: BackgroundTasks):
    """استقبال رسائل واتساب من Ultra Message"""

    try:
        data = await request.json()

        # التحقق من نوع الحدث
        event_type = data.get("event_type", "")

        if event_type == "message_received":
            # معالجة الرسالة في الخلفية
            background_tasks.add_task(process_incoming_message, data.get("data", {}))

        return {"status": "received"}

    except Exception as e:
        return {"status": "error", "message": str(e)}


@router.get("/whatsapp")
async def whatsapp_webhook_verify(request: Request):
    """التحقق من الـ webhook (GET request)"""
    return {"status": "active", "service": "Botng WhatsApp Webhook", "version": "1.0"}
