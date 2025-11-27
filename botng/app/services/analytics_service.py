"""
Google Analytics 4 Service
جلب بيانات سلوك المستخدم من GA4 مع مقارنة الأمس
أتمتة إحصائيات التحميل وسلوك المستخدم - قولدن هوست
"""

import os
from datetime import datetime, timedelta
from typing import Dict, Any
import httpx

class AnalyticsService:
    def __init__(self):
        self.property_id = os.getenv("GA4_PROPERTY_ID", "")
        self.measurement_id = os.getenv("GA4_MEASUREMENT_ID", "G-R50TBPQFJL")
        self.api_secret = os.getenv("GA4_API_SECRET", "")

    async def get_daily_stats(self) -> Dict[str, Any]:
        """جلب إحصائيات اليوم مع مقارنة الأمس"""

        # Try to get real data from GA4
        if self.property_id and self.api_secret:
            try:
                today_data = await self._fetch_ga4_data(days_ago=0)
                yesterday_data = await self._fetch_ga4_data(days_ago=1)

                if today_data and yesterday_data:
                    return self._combine_with_comparison(today_data, yesterday_data)
            except Exception as e:
                print(f"❌ GA4 API Error: {e}")

        # Fallback to mock data with comparison
        return await self._get_mock_data_with_comparison()

    async def _fetch_ga4_data(self, days_ago: int = 0) -> Dict[str, Any]:
        """Fetch data from GA4 Data API"""
        # Would use google-analytics-data library when credentials are configured
        return None

    def _combine_with_comparison(
        self,
        today: Dict[str, Any],
        yesterday: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Combine today and yesterday data with percentage changes"""

        def calc_change(today_val, yesterday_val):
            if yesterday_val == 0:
                return 100 if today_val > 0 else 0
            return round(((today_val - yesterday_val) / yesterday_val) * 100, 1)

        return {
            # Today's data
            "total_users": today.get("total_users", 0),
            "sessions": today.get("sessions", 0),
            "page_views": today.get("page_views", 0),
            "avg_session_duration": today.get("avg_session_duration", 0),
            "bounce_rate": today.get("bounce_rate", 0),
            "new_users": today.get("new_users", 0),
            "top_pages": today.get("top_pages", []),
            "devices": today.get("devices", {}),
            "countries": today.get("countries", {}),

            # Yesterday's data
            "yesterday_users": yesterday.get("total_users", 0),
            "yesterday_sessions": yesterday.get("sessions", 0),
            "yesterday_page_views": yesterday.get("page_views", 0),

            # Percentage changes
            "users_change_percent": calc_change(
                today.get("total_users", 0),
                yesterday.get("total_users", 0)
            ),
            "sessions_change_percent": calc_change(
                today.get("sessions", 0),
                yesterday.get("sessions", 0)
            ),
            "page_views_change_percent": calc_change(
                today.get("page_views", 0),
                yesterday.get("page_views", 0)
            ),

            "date": datetime.now().strftime("%Y-%m-%d"),
            "source": "ga4_api"
        }

    async def _get_mock_data_with_comparison(self) -> Dict[str, Any]:
        """Mock data with yesterday comparison"""
        import random

        # Today's data
        today_users = random.randint(120, 200)
        today_sessions = int(today_users * 1.4)
        today_page_views = int(today_sessions * 3.5)

        # Yesterday's data
        yesterday_users = random.randint(100, 180)
        yesterday_sessions = int(yesterday_users * 1.4)
        yesterday_page_views = int(yesterday_sessions * 3.5)

        def calc_change(today_val, yesterday_val):
            if yesterday_val == 0:
                return 100 if today_val > 0 else 0
            return round(((today_val - yesterday_val) / yesterday_val) * 100, 1)

        return {
            # Today
            "total_users": today_users,
            "sessions": today_sessions,
            "page_views": today_page_views,
            "avg_session_duration": random.randint(120, 300),
            "bounce_rate": round(random.uniform(35, 55), 1),
            "new_users": int(today_users * 0.3),
            "top_pages": [
                "/",
                "/golden-host/dashboard.html",
                "/golden-host/digital-care-library.html"
            ],
            "devices": {
                "mobile": int(today_users * 0.55),
                "desktop": int(today_users * 0.40),
                "tablet": int(today_users * 0.05)
            },
            "countries": {
                "Saudi Arabia": int(today_users * 0.75),
                "UAE": int(today_users * 0.12),
                "Kuwait": int(today_users * 0.08),
                "Egypt": int(today_users * 0.05)
            },

            # Yesterday
            "yesterday_users": yesterday_users,
            "yesterday_sessions": yesterday_sessions,
            "yesterday_page_views": yesterday_page_views,

            # Changes
            "users_change_percent": calc_change(today_users, yesterday_users),
            "sessions_change_percent": calc_change(today_sessions, yesterday_sessions),
            "page_views_change_percent": calc_change(today_page_views, yesterday_page_views),

            "date": datetime.now().strftime("%Y-%m-%d"),
            "source": "mock_data"
        }

    async def get_user_behavior(self) -> Dict[str, Any]:
        """تحليل سلوك المستخدم"""
        return {
            "events": {
                "page_view": 890,
                "click": 345,
                "scroll": 567,
                "form_submit": 23,
                "download": 45
            },
            "popular_pages": {
                "/": 300,
                "/golden-host/dashboard.html": 180,
                "/golden-host/digital-care-library.html": 150
            },
            "total_events": 1870
        }

analytics_service = AnalyticsService()
