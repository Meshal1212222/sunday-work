from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    RunReportRequest,
    DateRange,
    Dimension,
    Metric,
)
from datetime import date, timedelta
from typing import Dict, Any, Optional
import os

from ..config import settings


class GoogleAnalyticsCollector:
    """جامع بيانات Google Analytics 4"""

    def __init__(self):
        # Set credentials path
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = settings.google_credentials_path
        self.property_id = settings.ga4_property_id
        self.client = BetaAnalyticsDataClient()

    async def collect_daily_report(self, report_date: date = None) -> Dict[str, Any]:
        """جمع التقرير اليومي"""
        if report_date is None:
            report_date = date.today() - timedelta(days=1)  # أمس

        date_str = report_date.strftime("%Y-%m-%d")

        try:
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
        try:
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
        end_date = date.today() - timedelta(days=1)
        start_date = end_date - timedelta(days=6)

        try:
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
