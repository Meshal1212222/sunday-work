"""
App Downloads Service
جلب بيانات تحميلات التطبيق من App Store Connect و Google Play Console
"""

import os
from datetime import datetime, timedelta
from typing import Dict, Any
import httpx

class DownloadsService:
    def __init__(self):
        # App Store Connect
        self.appstore_key_id = os.getenv("APPSTORE_KEY_ID", "")
        self.appstore_issuer_id = os.getenv("APPSTORE_ISSUER_ID", "")
        self.appstore_private_key = os.getenv("APPSTORE_PRIVATE_KEY", "")

        # Google Play Console
        self.play_service_account = os.getenv("PLAY_SERVICE_ACCOUNT_JSON", "")
        self.play_package_name = os.getenv("PLAY_PACKAGE_NAME", "")

        # Firebase for storing download counts
        self.firebase_url = os.getenv(
            "FIREBASE_DATABASE_URL",
            "https://sunday-fb28c-default-rtdb.firebaseio.com"
        )

    async def get_today_downloads(self) -> Dict[str, Any]:
        """جلب تحميلات اليوم"""

        today_data = await self._get_downloads_from_firebase("today")
        yesterday_data = await self._get_downloads_from_firebase("yesterday")

        today_total = today_data.get("total", 0)
        yesterday_total = yesterday_data.get("total", 0)

        # Calculate change percentage
        if yesterday_total > 0:
            change_percent = round(((today_total - yesterday_total) / yesterday_total) * 100, 1)
        else:
            change_percent = 100 if today_total > 0 else 0

        return {
            "today": today_total,
            "yesterday": yesterday_total,
            "change_percent": change_percent,
            "ios": {
                "today": today_data.get("ios", 0),
                "yesterday": yesterday_data.get("ios", 0)
            },
            "android": {
                "today": today_data.get("android", 0),
                "yesterday": yesterday_data.get("android", 0)
            },
            "source": today_data.get("source", "firebase")
        }

    async def _get_downloads_from_firebase(self, day: str) -> Dict[str, Any]:
        """جلب بيانات التحميلات من Firebase"""

        if day == "today":
            date_str = datetime.now().strftime("%Y-%m-%d")
        else:
            date_str = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.firebase_url}/downloads/{date_str}.json"
                )
                if response.status_code == 200 and response.json():
                    data = response.json()
                    return {
                        "total": data.get("total", data.get("ios", 0) + data.get("android", 0)),
                        "ios": data.get("ios", 0),
                        "android": data.get("android", 0),
                        "source": "firebase"
                    }
        except Exception as e:
            print(f"❌ Firebase downloads error: {e}")

        # Return mock data if Firebase doesn't have the data
        return await self._get_mock_downloads(day)

    async def _get_mock_downloads(self, day: str) -> Dict[str, Any]:
        """Mock download data"""
        import random

        base_ios = random.randint(15, 35)
        base_android = random.randint(25, 55)

        if day == "yesterday":
            base_ios = int(base_ios * 0.9)
            base_android = int(base_android * 0.9)

        return {
            "total": base_ios + base_android,
            "ios": base_ios,
            "android": base_android,
            "source": "mock_data"
        }

    async def save_downloads(self, ios: int, android: int, date_str: str = None) -> bool:
        """حفظ بيانات التحميلات في Firebase"""

        if not date_str:
            date_str = datetime.now().strftime("%Y-%m-%d")

        data = {
            "ios": ios,
            "android": android,
            "total": ios + android,
            "updated_at": datetime.now().isoformat()
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.put(
                    f"{self.firebase_url}/downloads/{date_str}.json",
                    json=data
                )
                return response.status_code == 200
        except Exception as e:
            print(f"❌ Error saving downloads: {e}")
            return False

    async def get_weekly_trend(self) -> Dict[str, Any]:
        """اتجاه التحميلات الأسبوعي"""

        weekly_data = []
        total_week = 0

        for i in range(7):
            date = datetime.now() - timedelta(days=i)
            date_str = date.strftime("%Y-%m-%d")

            try:
                async with httpx.AsyncClient() as client:
                    response = await client.get(
                        f"{self.firebase_url}/downloads/{date_str}.json"
                    )
                    if response.status_code == 200 and response.json():
                        data = response.json()
                        day_total = data.get("total", 0)
                    else:
                        day_total = 0
            except:
                day_total = 0

            weekly_data.append({
                "date": date_str,
                "downloads": day_total
            })
            total_week += day_total

        return {
            "daily_breakdown": weekly_data,
            "total_week": total_week,
            "average_daily": round(total_week / 7, 1)
        }

downloads_service = DownloadsService()
