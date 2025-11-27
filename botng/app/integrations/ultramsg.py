import httpx
from typing import Optional
from ..config import settings


class UltraMsgClient:
    """Ultra Message API Client للتواصل عبر واتساب"""

    def __init__(self):
        self.instance_id = settings.ultramsg_instance_id
        self.token = settings.ultramsg_token
        self.base_url = f"{settings.ultramsg_base_url}/{self.instance_id}"

    async def send_message(self, phone: str, message: str) -> dict:
        """إرسال رسالة نصية"""
        url = f"{self.base_url}/messages/chat"

        payload = {
            "token": self.token,
            "to": phone,
            "body": message
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, data=payload)
            return response.json()

    async def send_image(self, phone: str, image_url: str, caption: str = "") -> dict:
        """إرسال صورة"""
        url = f"{self.base_url}/messages/image"

        payload = {
            "token": self.token,
            "to": phone,
            "image": image_url,
            "caption": caption
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, data=payload)
            return response.json()

    async def send_document(self, phone: str, document_url: str, filename: str) -> dict:
        """إرسال ملف"""
        url = f"{self.base_url}/messages/document"

        payload = {
            "token": self.token,
            "to": phone,
            "document": document_url,
            "filename": filename
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, data=payload)
            return response.json()

    async def get_messages(self, page: int = 1, limit: int = 100) -> dict:
        """جلب الرسائل"""
        url = f"{self.base_url}/messages"

        params = {
            "token": self.token,
            "page": page,
            "limit": limit
        }

        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            return response.json()

    async def get_instance_status(self) -> dict:
        """فحص حالة الـ instance"""
        url = f"{self.base_url}/instance/status"

        params = {"token": self.token}

        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            return response.json()
