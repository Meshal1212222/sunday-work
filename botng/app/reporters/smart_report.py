from datetime import datetime, date, timedelta
from typing import Dict, Any

from ..collectors.firebase_collector import FirebaseCollector
from ..collectors.google_analytics import GoogleAnalyticsCollector
from ..analyzers.openai_analyzer import OpenAIAnalyzer
from ..integrations.ultramsg import UltraMsgClient
from ..config import settings


class SmartReportGenerator:
    """مولد التقارير الذكية الشاملة"""

    def __init__(self):
        self.firebase = FirebaseCollector()
        self.ai = OpenAIAnalyzer()
        self.whatsapp = UltraMsgClient()

    async def generate_daily_report(self, report_date: date = None) -> str:
        """التقرير اليومي الشامل"""
        if report_date is None:
            report_date = date.today()

        # جمع البيانات من كل المصادر
        firebase_data = await self.firebase.get_daily_summary(report_date)

        # Google Analytics
        ga_data = {}
        try:
            ga = GoogleAnalyticsCollector()
            ga_result = await ga.collect_daily_report(report_date)
            if ga_result.get('status') == 'success':
                ga_data = ga_result['data']
        except Exception as e:
            print(f"GA Error: {e}")

        # تجميع البيانات للتحليل
        all_data = {
            "date": report_date.isoformat(),
            "golden_host": firebase_data.get('golden_host', {}),
            "sunday_board": firebase_data.get('sunday_board', {}),
            "analytics": ga_data
        }

        # تحليل بالذكاء الاصطناعي
        ai_analysis = await self.ai.analyze_data(all_data, "daily")

        # بناء التقرير
        report = self._build_daily_report(all_data, ai_analysis, report_date)

        return report

    def _build_daily_report(self, data: Dict, ai_analysis: str, report_date: date) -> str:
        """بناء نص التقرير اليومي"""
        gh = data.get('golden_host', {})
        sb = data.get('sunday_board', {})
        ga = data.get('analytics', {})

        report = f"""📊 *التقرير اليومي الشامل*
📅 {report_date.strftime('%Y/%m/%d')} | {self._get_day_name(report_date)}
━━━━━━━━━━━━━━━━━━━━━

🏨 *Golden Host*
├ 📝 البلاغات: {gh.get('reports_count', 0)}
├ 💰 الاستردادات: {gh.get('refunds_count', 0)} ({gh.get('refunds_total', 0):,.0f} ر.س)
├ 🛒 المبيعات: {gh.get('sales_count', 0)}
└ 💬 المحادثات: {gh.get('conversations_count', 0)}

📋 *Sunday Board*
├ 📌 إجمالي المهام: {sb.get('total_tasks', 0)}
├ ✅ مكتملة اليوم: {sb.get('completed_today', 0)}
└ ⚠️ متأخرة: {sb.get('overdue_tasks', 0)}

📈 *إحصائيات الزوار*
├ 👥 المستخدمين: {ga.get('active_users', 'N/A')}
├ 📱 الجلسات: {ga.get('sessions', 'N/A')}
├ 📄 المشاهدات: {ga.get('page_views', 'N/A')}
└ ⏱ متوسط الجلسة: {self._format_duration(ga.get('avg_session_duration', 0))}

━━━━━━━━━━━━━━━━━━━━━
🤖 *تحليل AI:*

{ai_analysis}

━━━━━━━━━━━━━━━━━━━━━
🏢 _شركة ليفل أب القابضة_
🤖 _Botng v1.0_"""

        return report

    async def generate_weekly_report(self) -> str:
        """التقرير الأسبوعي"""
        end_date = date.today()
        start_date = end_date - timedelta(days=6)

        # جمع بيانات الأسبوع
        weekly_data = {
            'period': f"{start_date} - {end_date}",
            'days': []
        }

        totals = {
            'reports': 0,
            'refunds': 0,
            'refunds_amount': 0,
            'sales': 0,
            'conversations': 0,
            'tasks_completed': 0
        }

        for i in range(7):
            day = start_date + timedelta(days=i)
            day_data = await self.firebase.get_daily_summary(day)

            gh = day_data.get('golden_host', {})
            sb = day_data.get('sunday_board', {})

            totals['reports'] += gh.get('reports_count', 0)
            totals['refunds'] += gh.get('refunds_count', 0)
            totals['refunds_amount'] += gh.get('refunds_total', 0)
            totals['sales'] += gh.get('sales_count', 0)
            totals['conversations'] += gh.get('conversations_count', 0)
            totals['tasks_completed'] += sb.get('completed_today', 0)

        weekly_data['totals'] = totals

        # تحليل
        ai_analysis = await self.ai.analyze_data(weekly_data, "weekly")

        report = f"""📈 *التقرير الأسبوعي*
📅 {start_date.strftime('%Y/%m/%d')} - {end_date.strftime('%Y/%m/%d')}
━━━━━━━━━━━━━━━━━━━━━

📊 *ملخص الأسبوع*

🏨 Golden Host:
├ 📝 البلاغات: {totals['reports']}
├ 💰 الاستردادات: {totals['refunds']} ({totals['refunds_amount']:,.0f} ر.س)
├ 🛒 المبيعات: {totals['sales']}
└ 💬 المحادثات: {totals['conversations']}

📋 Sunday Board:
└ ✅ مهام مكتملة: {totals['tasks_completed']}

━━━━━━━━━━━━━━━━━━━━━
🤖 *تحليل AI:*

{ai_analysis}

━━━━━━━━━━━━━━━━━━━━━
🏢 _شركة ليفل أب القابضة_
🤖 _Botng v1.0_"""

        return report

    async def generate_realtime_status(self) -> str:
        """حالة النظام اللحظية"""
        # البيانات اللحظية
        tasks = await self.firebase.get_tasks()
        overdue = await self.firebase.get_overdue_tasks()
        reports = await self.firebase.get_reports(10)

        pending_tasks = [t for t in tasks if t.get('status') == 'pending']
        in_progress = [t for t in tasks if t.get('status') == 'in_progress']

        status = f"""🔴 *الحالة اللحظية*
⏰ {datetime.now().strftime('%H:%M:%S')}
━━━━━━━━━━━━━━━━━━━━━

📋 *المهام*
├ ⏳ قيد الانتظار: {len(pending_tasks)}
├ 🔄 قيد التنفيذ: {len(in_progress)}
└ ⚠️ متأخرة: {len(overdue)}

📝 *آخر البلاغات*
{self._format_recent_items(reports, 'subject')}

━━━━━━━━━━━━━━━━━━━━━
🏢 _شركة ليفل أب القابضة_"""

        return status

    async def generate_employee_report(self) -> str:
        """تقرير أداء الموظفين"""
        performance = await self.firebase.get_employee_performance()

        # ترتيب حسب الأداء
        sorted_perf = sorted(performance, key=lambda x: x.get('sales', 0) + x.get('conversations', 0), reverse=True)

        lines = []
        for i, emp in enumerate(sorted_perf[:10], 1):
            medal = "🥇" if i == 1 else "🥈" if i == 2 else "🥉" if i == 3 else f"{i}."
            lines.append(f"{medal} {emp['name']}: {emp['sales']} مبيعات | {emp['conversations']} محادثة")

        report = f"""👥 *تقرير أداء الموظفين*
━━━━━━━━━━━━━━━━━━━━━

🏆 *الترتيب*

{chr(10).join(lines)}

━━━━━━━━━━━━━━━━━━━━━
🏢 _شركة ليفل أب القابضة_"""

        return report

    async def send_report(self, report_type: str = "daily"):
        """إرسال التقرير للقروب"""
        if report_type == "daily":
            report = await self.generate_daily_report()
        elif report_type == "weekly":
            report = await self.generate_weekly_report()
        elif report_type == "status":
            report = await self.generate_realtime_status()
        elif report_type == "employees":
            report = await self.generate_employee_report()
        else:
            report = await self.generate_daily_report()

        await self.whatsapp.send_message(settings.report_group_id, report)
        return report

    # ==================== Helpers ====================

    def _get_day_name(self, d: date) -> str:
        days = ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد']
        return days[d.weekday()]

    def _format_duration(self, seconds: float) -> str:
        if not seconds:
            return "N/A"
        minutes = int(seconds // 60)
        secs = int(seconds % 60)
        return f"{minutes}:{secs:02d}"

    def _format_recent_items(self, items: list, field: str, limit: int = 5) -> str:
        if not items:
            return "└ لا توجد بيانات"
        lines = []
        for item in items[:limit]:
            lines.append(f"├ • {item.get(field, 'بدون عنوان')[:30]}")
        return "\n".join(lines)
