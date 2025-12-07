from datetime import date, timedelta
from typing import Dict, Any, Optional
import os
import json

from ..config import settings


class GoogleAnalyticsCollector:
    """جامع بيانات Google Analytics 4"""

    _client = None
    _initialized = False

    def __init__(self):
        self.property_id = settings.ga4_property_id
        self.client = None

        if GoogleAnalyticsCollector._initialized:
            self.client = GoogleAnalyticsCollector._client
            return

        try:
            # Try environment variable first (for Railway)
            cred_json = os.environ.get('GOOGLE_CREDENTIALS_JSON')
            if cred_json:
                # Write to temp file for google client
                import tempfile
                with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
                    f.write(cred_json)
                    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = f.name
            elif os.path.exists(settings.google_credentials_path):
                os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = settings.google_credentials_path
            else:
                print("⚠️ Google credentials not found - GA disabled")
                GoogleAnalyticsCollector._initialized = True
                return

            from google.analytics.data_v1beta import BetaAnalyticsDataClient
            self.client = BetaAnalyticsDataClient()
            GoogleAnalyticsCollector._client = self.client
            GoogleAnalyticsCollector._initialized = True

        except Exception as e:
            print(f"⚠️ GA init error: {e}")
            GoogleAnalyticsCollector._initialized = True

    async def collect_daily_report(self, report_date: date = None) -> Dict[str, Any]:
        """جمع التقرير اليومي"""
        if not self.client:
            return {"status": "error", "message": "GA not configured", "data": {}}

        if report_date is None:
            report_date = date.today() - timedelta(days=1)  # أمس

        date_str = report_date.strftime("%Y-%m-%d")

        try:
            from google.analytics.data_v1beta.types import (
                RunReportRequest, DateRange, Dimension, Metric
            )

            # طلب البيانات الأساسية
            request = RunReportRequest(
                property=f"properties/{self.property_id}",
                date_ranges=[DateRange(start_date=date_str, end_date=date_str)],
                metrics=[
                    Metric(name="activeUsers"),
                    Metric(name="sessions"),
                    Metric(name="screenPageViews"),
                    Metric(name="averageSessionDuration"),
                    Metric(name="bounceRate"),
                    Metric(name="newUsers"),
                ],
            )

            response = self.client.run_report(request)

            # استخراج البيانات
            data = {
                "date": date_str,
                "active_users": 0,
                "sessions": 0,
                "page_views": 0,
                "avg_session_duration": 0,
                "bounce_rate": 0,
                "new_users": 0,
            }

            if response.rows:
                row = response.rows[0]
                data["active_users"] = int(row.metric_values[0].value or 0)
                data["sessions"] = int(row.metric_values[1].value or 0)
                data["page_views"] = int(row.metric_values[2].value or 0)
                data["avg_session_duration"] = float(row.metric_values[3].value or 0)
                data["bounce_rate"] = float(row.metric_values[4].value or 0)
                data["new_users"] = int(row.metric_values[5].value or 0)

            # جلب أفضل الصفحات
            data["top_pages"] = await self._get_top_pages(date_str)

            return {
                "status": "success",
                "data": data
            }

        except Exception as e:
            return {
                "status": "error",
                "message": str(e)
            }

    async def _get_top_pages(self, date_str: str, limit: int = 5) -> list:
        """جلب أكثر الصفحات زيارة"""
        if not self.client:
            return []
        try:
            from google.analytics.data_v1beta.types import (
                RunReportRequest, DateRange, Dimension, Metric
            )

            request = RunReportRequest(
                property=f"properties/{self.property_id}",
                date_ranges=[DateRange(start_date=date_str, end_date=date_str)],
                dimensions=[Dimension(name="pagePath")],
                metrics=[Metric(name="screenPageViews")],
                limit=limit,
            )

            response = self.client.run_report(request)

            pages = []
            for row in response.rows:
                pages.append({
                    "page": row.dimension_values[0].value,
                    "views": int(row.metric_values[0].value)
                })

            return pages

        except Exception:
            return []

    async def collect_comparison(self, today: date = None) -> Dict[str, Any]:
        """مقارنة اليوم بالأمس"""
        if today is None:
            today = date.today() - timedelta(days=1)

        yesterday = today - timedelta(days=1)

        today_data = await self.collect_daily_report(today)
        yesterday_data = await self.collect_daily_report(yesterday)

        if today_data["status"] == "success" and yesterday_data["status"] == "success":
            comparison = {
                "today": today_data["data"],
                "yesterday": yesterday_data["data"],
                "changes": {}
            }

            # حساب نسب التغيير
            for key in ["active_users", "sessions", "page_views", "new_users"]:
                today_val = today_data["data"].get(key, 0)
                yesterday_val = yesterday_data["data"].get(key, 0)

                if yesterday_val > 0:
                    change = ((today_val - yesterday_val) / yesterday_val) * 100
                else:
                    change = 100 if today_val > 0 else 0

                comparison["changes"][key] = round(change, 1)

            return {
                "status": "success",
                "data": comparison
            }

        return {
            "status": "error",
            "message": "فشل في جلب البيانات"
        }

    async def collect_weekly_summary(self) -> Dict[str, Any]:
        """ملخص الأسبوع"""
        if not self.client:
            return {"status": "error", "message": "GA not configured"}

        end_date = date.today() - timedelta(days=1)
        start_date = end_date - timedelta(days=6)

        try:
            from google.analytics.data_v1beta.types import (
                RunReportRequest, DateRange, Dimension, Metric
            )

            request = RunReportRequest(
                property=f"properties/{self.property_id}",
                date_ranges=[DateRange(
                    start_date=start_date.strftime("%Y-%m-%d"),
                    end_date=end_date.strftime("%Y-%m-%d")
                )],
                dimensions=[Dimension(name="date")],
                metrics=[
                    Metric(name="activeUsers"),
                    Metric(name="sessions"),
                    Metric(name="screenPageViews"),
                ],
            )

            response = self.client.run_report(request)

            daily_data = []
            total_users = 0
            total_sessions = 0
            total_views = 0

            for row in response.rows:
                day_data = {
                    "date": row.dimension_values[0].value,
                    "users": int(row.metric_values[0].value or 0),
                    "sessions": int(row.metric_values[1].value or 0),
                    "views": int(row.metric_values[2].value or 0),
                }
                daily_data.append(day_data)
                total_users += day_data["users"]
                total_sessions += day_data["sessions"]
                total_views += day_data["views"]

            return {
                "status": "success",
                "data": {
                    "period": f"{start_date} - {end_date}",
                    "total_users": total_users,
                    "total_sessions": total_sessions,
                    "total_views": total_views,
                    "daily_breakdown": daily_data
                }
            }

        except Exception as e:
            return {
                "status": "error",
                "message": str(e)
            }

    async def get_checkout_funnel(self, report_date: date = None) -> Dict[str, Any]:
        """
        تحليل Funnel الحجوزات - نسبة الإكمال من صفحة الدفع

        يتتبع:
        - begin_checkout: المستخدمين اللي وصلوا صفحة الدفع
        - purchase: المستخدمين اللي أكملوا الحجز
        - النسبة: معدل التحويل
        """
        if not self.client:
            return {"status": "error", "message": "GA not configured"}

        if report_date is None:
            report_date = date.today() - timedelta(days=1)

        date_str = report_date.strftime("%Y-%m-%d")

        try:
            from google.analytics.data_v1beta.types import (
                RunReportRequest, DateRange, Dimension, Metric, FilterExpression, Filter
            )

            # جلب أحداث الـ Checkout
            checkout_events = [
                "begin_checkout",      # بدأ الدفع
                "add_payment_info",    # أضاف معلومات الدفع
                "purchase",            # أكمل الشراء
                "view_cart",           # شاهد السلة
                # أحداث مخصصة محتملة
                "checkout_started",
                "payment_started",
                "booking_complete",
                "reservation_complete"
            ]

            request = RunReportRequest(
                property=f"properties/{self.property_id}",
                date_ranges=[DateRange(start_date=date_str, end_date=date_str)],
                dimensions=[Dimension(name="eventName")],
                metrics=[
                    Metric(name="eventCount"),
                    Metric(name="totalUsers")
                ],
                dimension_filter=FilterExpression(
                    filter=Filter(
                        field_name="eventName",
                        in_list_filter=Filter.InListFilter(values=checkout_events)
                    )
                )
            )

            response = self.client.run_report(request)

            # تجميع البيانات
            funnel_data = {}
            for row in response.rows:
                event_name = row.dimension_values[0].value
                event_count = int(row.metric_values[0].value or 0)
                users = int(row.metric_values[1].value or 0)
                funnel_data[event_name] = {
                    "count": event_count,
                    "users": users
                }

            # حساب نسبة التحويل
            checkout_started = (
                funnel_data.get("begin_checkout", {}).get("users", 0) or
                funnel_data.get("checkout_started", {}).get("users", 0) or
                funnel_data.get("payment_started", {}).get("users", 0) or
                funnel_data.get("add_payment_info", {}).get("users", 0)
            )

            completed = (
                funnel_data.get("purchase", {}).get("users", 0) or
                funnel_data.get("booking_complete", {}).get("users", 0) or
                funnel_data.get("reservation_complete", {}).get("users", 0)
            )

            # حساب النسب
            if checkout_started > 0:
                conversion_rate = (completed / checkout_started) * 100
                abandonment_rate = 100 - conversion_rate
                abandoned_count = checkout_started - completed
            else:
                conversion_rate = 0
                abandonment_rate = 0
                abandoned_count = 0

            return {
                "status": "success",
                "date": date_str,
                "data": {
                    "checkout_started": checkout_started,      # وصلوا صفحة الدفع
                    "completed": completed,                     # أكملوا الحجز
                    "abandoned": abandoned_count,               # لم يكملوا
                    "conversion_rate": round(conversion_rate, 1),    # نسبة الإكمال %
                    "abandonment_rate": round(abandonment_rate, 1),  # نسبة التخلي %
                    "funnel_details": funnel_data               # تفاصيل كل حدث
                }
            }

        except Exception as e:
            return {
                "status": "error",
                "message": str(e)
            }

    async def get_checkout_funnel_comparison(self, report_date: date = None) -> Dict[str, Any]:
        """مقارنة Funnel أمس بأول أمس"""
        if report_date is None:
            report_date = date.today() - timedelta(days=1)

        day_before = report_date - timedelta(days=1)

        today_data = await self.get_checkout_funnel(report_date)
        yesterday_data = await self.get_checkout_funnel(day_before)

        if today_data.get("status") == "success" and yesterday_data.get("status") == "success":
            today_rate = today_data["data"]["conversion_rate"]
            yesterday_rate = yesterday_data["data"]["conversion_rate"]

            if yesterday_rate > 0:
                rate_change = today_rate - yesterday_rate
            else:
                rate_change = today_rate

            return {
                "status": "success",
                "data": {
                    "yesterday": today_data["data"],      # أمس
                    "day_before": yesterday_data["data"], # أول أمس
                    "rate_change": round(rate_change, 1), # التغيير في النسبة
                    "is_improved": rate_change > 0
                }
            }

        return today_data  # إرجاع بيانات أمس على الأقل
