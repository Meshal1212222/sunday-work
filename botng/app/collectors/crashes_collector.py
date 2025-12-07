from datetime import date, timedelta
from typing import Dict, Any, List
from ..config import settings


class CrashesCollector:
    """جامع بيانات الـ Crashes من GA4"""

    def __init__(self):
        self.ga_collector = None
        try:
            from .google_analytics import GoogleAnalyticsCollector
            self.ga_collector = GoogleAnalyticsCollector()
        except Exception as e:
            print(f"GA not available for crashes: {e}")

    async def get_crashes_count(self, report_date: date = None) -> Dict[str, Any]:
        """جلب عدد الـ crashes لتاريخ معين"""
        if not self.ga_collector or not self.ga_collector.client:
            return {"status": "error", "message": "GA not configured", "crashes": 0}

        if report_date is None:
            report_date = date.today() - timedelta(days=1)

        date_str = report_date.strftime("%Y-%m-%d")

        try:
            from google.analytics.data_v1beta.types import (
                RunReportRequest, DateRange, Dimension, Metric, FilterExpression, Filter
            )

            # جلب events من نوع app_exception أو crash
            request = RunReportRequest(
                property=f"properties/{self.ga_collector.property_id}",
                date_ranges=[DateRange(start_date=date_str, end_date=date_str)],
                dimensions=[Dimension(name="eventName")],
                metrics=[Metric(name="eventCount")],
                dimension_filter=FilterExpression(
                    filter=Filter(
                        field_name="eventName",
                        in_list_filter=Filter.InListFilter(
                            values=["app_exception", "crash", "fatal_error", "error"]
                        )
                    )
                )
            )

            response = self.ga_collector.client.run_report(request)

            total_crashes = 0
            crash_details = []

            for row in response.rows:
                event_name = row.dimension_values[0].value
                count = int(row.metric_values[0].value or 0)
                total_crashes += count
                crash_details.append({
                    "event": event_name,
                    "count": count
                })

            return {
                "status": "success",
                "date": date_str,
                "total_crashes": total_crashes,
                "details": crash_details
            }

        except Exception as e:
            return {
                "status": "error",
                "message": str(e),
                "crashes": 0
            }

    async def get_crashes_comparison(self, report_date: date = None) -> Dict[str, Any]:
        """مقارنة crashes اليوم بالأمس"""
        if report_date is None:
            report_date = date.today() - timedelta(days=1)

        yesterday = report_date - timedelta(days=1)

        today_data = await self.get_crashes_count(report_date)
        yesterday_data = await self.get_crashes_count(yesterday)

        today_crashes = today_data.get("total_crashes", 0) if today_data.get("status") == "success" else 0
        yesterday_crashes = yesterday_data.get("total_crashes", 0) if yesterday_data.get("status") == "success" else 0

        # حساب التغيير
        if yesterday_crashes > 0:
            change = ((today_crashes - yesterday_crashes) / yesterday_crashes) * 100
        else:
            change = 100 if today_crashes > 0 else 0

        return {
            "today": today_crashes,
            "yesterday": yesterday_crashes,
            "change": round(change, 1),
            "is_increase": today_crashes > yesterday_crashes
        }
