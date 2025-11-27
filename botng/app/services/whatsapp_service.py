"""
WhatsApp Service
إرسال التقارير عبر واتساب
"""

import os
from datetime import datetime
from typing import Dict, Any, List, Optional
import httpx

class WhatsAppService:
    def __init__(self):
        # Support multiple WhatsApp APIs
        self.provider = os.getenv("WHATSAPP_PROVIDER", "whatsapp_business")  # or "twilio", "ultramsg"

        # WhatsApp Business API
        self.phone_number_id = os.getenv("WHATSAPP_PHONE_NUMBER_ID", "")
        self.access_token = os.getenv("WHATSAPP_ACCESS_TOKEN", "")

        # Alternative: UltraMsg API
        self.ultramsg_instance = os.getenv("ULTRAMSG_INSTANCE_ID", "")
        self.ultramsg_token = os.getenv("ULTRAMSG_TOKEN", "")

        # Recipients
        self.default_recipients = os.getenv("WHATSAPP_RECIPIENTS", "").split(",")

    async def send_message(self, phone: str, message: str) -> Dict[str, Any]:
        """إرسال رسالة واتساب"""

        if self.provider == "ultramsg" and self.ultramsg_instance:
            return await self._send_ultramsg(phone, message)
        elif self.access_token:
            return await self._send_business_api(phone, message)
        else:
            return await self._log_message(phone, message)

    async def _send_business_api(self, phone: str, message: str) -> Dict[str, Any]:
        """إرسال عبر WhatsApp Business API"""

        url = f"https://graph.facebook.com/v18.0/{self.phone_number_id}/messages"

        payload = {
            "messaging_product": "whatsapp",
            "to": phone,
            "type": "text",
            "text": {"body": message}
        }

        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(url, json=payload, headers=headers)
                if response.status_code == 200:
                    return {
                        "status": "sent",
                        "provider": "whatsapp_business",
                        "phone": phone,
                        "timestamp": datetime.now().isoformat()
                    }
                else:
                    return {
                        "status": "failed",
                        "error": response.text,
                        "phone": phone
                    }
        except Exception as e:
            return {"status": "error", "error": str(e)}

    async def _send_ultramsg(self, phone: str, message: str) -> Dict[str, Any]:
        """إرسال عبر UltraMsg API"""

        url = f"https://api.ultramsg.com/{self.ultramsg_instance}/messages/chat"

        payload = {
            "token": self.ultramsg_token,
            "to": phone,
            "body": message
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(url, data=payload)
                if response.status_code == 200:
                    return {
                        "status": "sent",
                        "provider": "ultramsg",
                        "phone": phone,
                        "timestamp": datetime.now().isoformat()
                    }
                else:
                    return {
                        "status": "failed",
                        "error": response.text,
                        "phone": phone
                    }
        except Exception as e:
            return {"status": "error", "error": str(e)}

    async def _log_message(self, phone: str, message: str) -> Dict[str, Any]:
        """تسجيل الرسالة (للاختبار)"""

        print(f"""
╔══════════════════════════════════════════════════════════════╗
║  📱 WhatsApp Message (Logged - No API configured)            ║
╠══════════════════════════════════════════════════════════════╣
║  To: {phone}
║  Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
╠══════════════════════════════════════════════════════════════╣
{message}
╚══════════════════════════════════════════════════════════════╝
""")

        return {
            "status": "logged",
            "provider": "console",
            "phone": phone,
            "timestamp": datetime.now().isoformat(),
            "message_preview": message[:100] + "..." if len(message) > 100 else message
        }

    async def send_daily_report(self, report: str) -> List[Dict[str, Any]]:
        """إرسال التقرير اليومي لجميع المستلمين"""

        results = []
        recipients = [r.strip() for r in self.default_recipients if r.strip()]

        if not recipients:
            # If no recipients configured, just log
            result = await self._log_message("NO_RECIPIENTS", report)
            return [result]

        for phone in recipients:
            result = await self.send_message(phone, report)
            results.append(result)

        return results

    async def send_alert(self, alert_type: str, details: str) -> List[Dict[str, Any]]:
        """إرسال تنبيه عاجل"""

        alert_message = f"""
🚨 **تنبيه: {alert_type}**

{details}

⏰ الوقت: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""

        return await self.send_daily_report(alert_message)

    def format_report_for_whatsapp(self, analysis: Dict[str, Any]) -> str:
        """تنسيق التقرير لواتساب"""

        report = analysis.get("analysis", "")

        # WhatsApp formatting
        # Replace markdown headers
        report = report.replace("**", "*")  # Bold
        report = report.replace("### ", "📌 ")
        report = report.replace("## ", "📊 ")
        report = report.replace("# ", "🔷 ")

        # Add header
        header = f"""
━━━━━━━━━━━━━━━━━━━━━━━
📊 *تقرير Botng اليومي*
🗓️ {datetime.now().strftime('%Y-%m-%d')}
━━━━━━━━━━━━━━━━━━━━━━━

"""

        # Add footer
        footer = """

━━━━━━━━━━━━━━━━━━━━━━━
🤖 Botng - Level Up Holding
━━━━━━━━━━━━━━━━━━━━━━━
"""

        return header + report + footer

whatsapp_service = WhatsAppService()
