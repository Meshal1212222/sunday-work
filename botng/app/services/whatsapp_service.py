"""
WhatsApp Service
إرسال التقارير والملفات عبر واتساب
"""

import os
import base64
from datetime import datetime
from typing import Dict, Any, List, Optional
import httpx

class WhatsAppService:
    def __init__(self):
        # Support multiple WhatsApp APIs
        self.provider = os.getenv("WHATSAPP_PROVIDER", "whatsapp_business")

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

    async def send_document(self, file_path: str, caption: str = "") -> List[Dict[str, Any]]:
        """إرسال ملف (PDF) لجميع المستلمين"""

        results = []
        recipients = [r.strip() for r in self.default_recipients if r.strip()]

        if not recipients:
            result = await self._log_document("NO_RECIPIENTS", file_path, caption)
            return [result]

        for phone in recipients:
            if self.provider == "ultramsg" and self.ultramsg_instance:
                result = await self._send_ultramsg_document(phone, file_path, caption)
            elif self.access_token:
                result = await self._send_business_api_document(phone, file_path, caption)
            else:
                result = await self._log_document(phone, file_path, caption)
            results.append(result)

        return results

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

    async def _send_business_api_document(self, phone: str, file_path: str, caption: str) -> Dict[str, Any]:
        """إرسال ملف عبر WhatsApp Business API"""

        # First upload the media
        upload_url = f"https://graph.facebook.com/v18.0/{self.phone_number_id}/media"

        headers = {
            "Authorization": f"Bearer {self.access_token}",
        }

        try:
            async with httpx.AsyncClient() as client:
                # Upload file
                with open(file_path, 'rb') as f:
                    files = {
                        'file': (os.path.basename(file_path), f, 'application/pdf'),
                        'messaging_product': (None, 'whatsapp'),
                        'type': (None, 'application/pdf')
                    }
                    upload_response = await client.post(upload_url, headers=headers, files=files)

                if upload_response.status_code != 200:
                    return {"status": "upload_failed", "error": upload_response.text}

                media_id = upload_response.json().get('id')

                # Send document message
                send_url = f"https://graph.facebook.com/v18.0/{self.phone_number_id}/messages"
                payload = {
                    "messaging_product": "whatsapp",
                    "to": phone,
                    "type": "document",
                    "document": {
                        "id": media_id,
                        "caption": caption,
                        "filename": os.path.basename(file_path)
                    }
                }

                headers["Content-Type"] = "application/json"
                response = await client.post(send_url, json=payload, headers=headers)

                if response.status_code == 200:
                    return {
                        "status": "sent",
                        "type": "document",
                        "provider": "whatsapp_business",
                        "phone": phone,
                        "file": os.path.basename(file_path),
                        "timestamp": datetime.now().isoformat()
                    }
                else:
                    return {"status": "failed", "error": response.text, "phone": phone}

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

    async def _send_ultramsg_document(self, phone: str, file_path: str, caption: str) -> Dict[str, Any]:
        """إرسال ملف عبر UltraMsg API"""

        url = f"https://api.ultramsg.com/{self.ultramsg_instance}/messages/document"

        # Read and encode file
        with open(file_path, 'rb') as f:
            file_data = base64.b64encode(f.read()).decode('utf-8')

        payload = {
            "token": self.ultramsg_token,
            "to": phone,
            "filename": os.path.basename(file_path),
            "document": f"data:application/pdf;base64,{file_data}",
            "caption": caption
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(url, data=payload)
                if response.status_code == 200:
                    return {
                        "status": "sent",
                        "type": "document",
                        "provider": "ultramsg",
                        "phone": phone,
                        "file": os.path.basename(file_path),
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

    async def _log_document(self, phone: str, file_path: str, caption: str) -> Dict[str, Any]:
        """تسجيل إرسال الملف (للاختبار)"""

        print(f"""
╔══════════════════════════════════════════════════════════════╗
║  📎 WhatsApp Document (Logged - No API configured)           ║
╠══════════════════════════════════════════════════════════════╣
║  To: {phone}
║  File: {os.path.basename(file_path)}
║  Caption: {caption}
║  Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
╚══════════════════════════════════════════════════════════════╝
""")

        return {
            "status": "logged",
            "type": "document",
            "provider": "console",
            "phone": phone,
            "file": os.path.basename(file_path),
            "timestamp": datetime.now().isoformat()
        }

    async def send_daily_report(self, report: str) -> List[Dict[str, Any]]:
        """إرسال التقرير اليومي لجميع المستلمين"""

        results = []
        recipients = [r.strip() for r in self.default_recipients if r.strip()]

        if not recipients:
            result = await self._log_message("NO_RECIPIENTS", report)
            return [result]

        for phone in recipients:
            result = await self.send_message(phone, report)
            results.append(result)

        return results

    async def send_alert(self, alert_type: str, details: str) -> List[Dict[str, Any]]:
        """إرسال تنبيه عاجل"""

        alert_message = f"""
🚨 *تنبيه: {alert_type}*

{details}

⏰ الوقت: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""

        return await self.send_daily_report(alert_message)

    def format_report_for_whatsapp(self, analysis: Dict[str, Any]) -> str:
        """تنسيق التقرير لواتساب"""

        report = analysis.get("analysis", "")

        # WhatsApp formatting
        report = report.replace("**", "*")
        report = report.replace("### ", "📌 ")
        report = report.replace("## ", "📊 ")
        report = report.replace("# ", "🔷 ")

        return report

whatsapp_service = WhatsAppService()
