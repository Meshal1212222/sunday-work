from fastapi import APIRouter, Request, BackgroundTasks
from typing import Dict, Any
from datetime import datetime

from ..config import settings
from ..database import SessionLocal, WhatsAppMessage
from ..integrations.ultramsg import UltraMsgClient
from ..analyzers.openai_analyzer import OpenAIAnalyzer
from ..reporters.report_generator import ReportGenerator

router = APIRouter()


# الأوامر المتاحة
COMMANDS = {
    "تقرير": "daily_report",
    "كول سنتر": "callcenter_report",
    "زوار": "visitors_report",
    "مقارنة": "comparison_report",
    "مساعدة": "help",
    "help": "help"
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

    # أمر المساعدة
    if message_lower in ["مساعدة", "help", "?"]:
        return """🤖 *أوامر Botng المتاحة:*

📊 *تقرير* - تقرير اليوم الكامل
📞 *كول سنتر* - تقرير المكالمات
👥 *زوار* - تقرير الزوار
📈 *مقارنة* - مقارنة بالأمس

💡 يمكنك أيضاً كتابة أي سؤال وسأحاول مساعدتك!

_شركة ليفل أب القابضة_"""

    # تقرير يومي
    if message_lower == "تقرير":
        generator = ReportGenerator()
        report = await generator.generate_daily_report()
        return report["content"]

    # تقرير كول سنتر
    if message_lower == "كول سنتر":
        generator = ReportGenerator()
        report = await generator.generate_callcenter_report()
        return report["content"]

    # تقرير زوار
    if message_lower == "زوار":
        generator = ReportGenerator()
        report = await generator.generate_visitors_report()
        return report["content"]

    # مقارنة
    if message_lower == "مقارنة":
        generator = ReportGenerator()
        report = await generator.generate_comparison_report()
        return report["content"]

    # معالجة بالذكاء الاصطناعي للرسائل غير المعروفة
    try:
        analyzer = OpenAIAnalyzer()
        response = await analyzer.process_command(message)
        return response
    except Exception as e:
        return f"⚠️ عذراً، حدث خطأ. جرب:\n\n• تقرير\n• كول سنتر\n• زوار\n• مساعدة"


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
    return {"status": "active", "service": "Botng WhatsApp Webhook"}
