from datetime import date, datetime, timedelta
from typing import Dict, Any, Optional

from ..database import SessionLocal, ClarityData, CallCenterData, Report
from ..analyzers.openai_analyzer import OpenAIAnalyzer
from ..collectors.clarity import ClarityCollector
from ..collectors.callcenter import CallCenterCollector


class ReportGenerator:
    """مولد التقارير"""

    def __init__(self):
        self.analyzer = OpenAIAnalyzer()

    async def generate_daily_report(self, report_date: date = None) -> Dict[str, Any]:
        """إنشاء التقرير اليومي الشامل"""

        if report_date is None:
            report_date = date.today()

        # جمع البيانات
        clarity_data = await self._get_clarity_data(report_date)
        callcenter_data = await self._get_callcenter_data(report_date)

        # تجميع البيانات
        combined_data = {
            "date": report_date.isoformat(),
            "clarity": clarity_data,
            "callcenter": callcenter_data
        }

        # تحليل بالذكاء الاصطناعي
        analysis = await self.analyzer.analyze_data(combined_data, "daily")

        # تنسيق التقرير
        report_content = f"""📊 *التقرير اليومي - {report_date.strftime('%Y/%m/%d')}*

{analysis}

_شركة ليفل أب القابضة | Botng_"""

        # حفظ التقرير
        await self._save_report("daily", report_content, combined_data, analysis)

        return {
            "type": "daily",
            "date": report_date.isoformat(),
            "content": report_content,
            "data": combined_data
        }

    async def generate_weekly_report(self) -> Dict[str, Any]:
        """إنشاء التقرير الأسبوعي"""

        today = date.today()
        week_start = today - timedelta(days=7)

        # جمع بيانات الأسبوع
        weekly_data = {
            "period": f"{week_start.isoformat()} - {today.isoformat()}",
            "days": []
        }

        for i in range(7):
            day = week_start + timedelta(days=i)
            clarity = await self._get_clarity_data(day)
            callcenter = await self._get_callcenter_data(day)
            weekly_data["days"].append({
                "date": day.isoformat(),
                "clarity": clarity,
                "callcenter": callcenter
            })

        # تحليل
        analysis = await self.analyzer.analyze_data(weekly_data, "weekly")

        report_content = f"""📈 *التقرير الأسبوعي*
_{week_start.strftime('%Y/%m/%d')} - {today.strftime('%Y/%m/%d')}_

{analysis}

_شركة ليفل أب القابضة | Botng_"""

        return {
            "type": "weekly",
            "content": report_content,
            "data": weekly_data
        }

    async def generate_callcenter_report(self, report_date: date = None) -> Dict[str, Any]:
        """تقرير الكول سنتر"""

        if report_date is None:
            report_date = date.today()

        data = await self._get_callcenter_data(report_date)
        analysis = await self.analyzer.analyze_data(data, "callcenter")

        report_content = f"""📞 *تقرير الكول سنتر - {report_date.strftime('%Y/%m/%d')}*

{analysis}

_شركة ليفل أب القابضة | Botng_"""

        return {
            "type": "callcenter",
            "content": report_content,
            "data": data
        }

    async def generate_visitors_report(self, report_date: date = None) -> Dict[str, Any]:
        """تقرير الزوار"""

        if report_date is None:
            report_date = date.today()

        data = await self._get_clarity_data(report_date)
        analysis = await self.analyzer.analyze_data(data, "visitors")

        report_content = f"""👥 *تقرير الزوار - {report_date.strftime('%Y/%m/%d')}*

{analysis}

_شركة ليفل أب القابضة | Botng_"""

        return {
            "type": "visitors",
            "content": report_content,
            "data": data
        }

    async def generate_comparison_report(self) -> Dict[str, Any]:
        """تقرير المقارنة مع الأمس"""

        today = date.today()
        yesterday = today - timedelta(days=1)

        today_clarity = await self._get_clarity_data(today)
        today_callcenter = await self._get_callcenter_data(today)

        yesterday_clarity = await self._get_clarity_data(yesterday)
        yesterday_callcenter = await self._get_callcenter_data(yesterday)

        today_data = {"clarity": today_clarity, "callcenter": today_callcenter}
        yesterday_data = {"clarity": yesterday_clarity, "callcenter": yesterday_callcenter}

        analysis = await self.analyzer.compare_data(today_data, yesterday_data)

        report_content = f"""📈 *مقارنة اليوم بالأمس*

{analysis}

_شركة ليفل أب القابضة | Botng_"""

        return {
            "type": "comparison",
            "content": report_content,
            "data": {"today": today_data, "yesterday": yesterday_data}
        }

    async def _get_clarity_data(self, report_date: date) -> Dict[str, Any]:
        """جلب بيانات Clarity"""
        db = SessionLocal()
        try:
            record = db.query(ClarityData).filter(
                ClarityData.date == datetime.combine(report_date, datetime.min.time())
            ).first()

            if record:
                return {
                    "visitors": record.visitors,
                    "sessions": record.sessions,
                    "page_views": record.page_views,
                    "avg_session_duration": record.avg_session_duration,
                    "bounce_rate": record.bounce_rate,
                    "top_pages": record.top_pages
                }
            return {"message": "لا توجد بيانات لهذا التاريخ"}
        finally:
            db.close()

    async def _get_callcenter_data(self, report_date: date) -> Dict[str, Any]:
        """جلب بيانات الكول سنتر"""
        db = SessionLocal()
        try:
            record = db.query(CallCenterData).filter(
                CallCenterData.date == datetime.combine(report_date, datetime.min.time())
            ).first()

            if record:
                return {
                    "total_calls": record.total_calls,
                    "answered_calls": record.answered_calls,
                    "missed_calls": record.missed_calls,
                    "avg_wait_time": record.avg_wait_time,
                    "avg_call_duration": record.avg_call_duration,
                    "agent_stats": record.agent_stats
                }
            return {"message": "لا توجد بيانات لهذا التاريخ"}
        finally:
            db.close()

    async def _save_report(self, report_type: str, content: str, data: Dict, analysis: str):
        """حفظ التقرير في قاعدة البيانات"""
        db = SessionLocal()
        try:
            report = Report(
                report_type=report_type,
                content=content,
                data_snapshot=data,
                ai_analysis=analysis
            )
            db.add(report)
            db.commit()
        finally:
            db.close()
