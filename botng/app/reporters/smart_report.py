from datetime import datetime, date, timedelta
from typing import Dict, Any, Optional

from ..collectors.firebase_collector import FirebaseCollector
from ..collectors.google_analytics import GoogleAnalyticsCollector
from ..collectors.clarity import ClarityCollector
from ..analyzers.openai_analyzer import OpenAIAnalyzer
from ..integrations.ultramsg import UltraMsgClient
from ..config import settings


class SmartReportGenerator:
    """مولد التقارير الذكية - نص فقط بدون PDF"""

    def __init__(self):
        self.firebase = FirebaseCollector()
        self.ai = OpenAIAnalyzer()
        self.whatsapp = UltraMsgClient()

    def _calc_change(self, today: float, yesterday: float) -> tuple:
        """حساب نسبة التغيير"""
        if yesterday == 0:
            return 0, "🟢"
        change = ((today - yesterday) / yesterday) * 100
        icon = "🟢" if change > 0 else "🔴" if change < 0 else "⚪"
        return round(change, 1), icon

    def _format_change(self, today: float, yesterday: float, reverse: bool = False) -> str:
        """تنسيق التغيير مع السهم"""
        change, icon = self._calc_change(today, yesterday)
        if reverse:
            icon = "🟢" if change < 0 else "🔴" if change > 0 else "⚪"
        arrow = "+" if change > 0 else ""
        return f"(أمس: {yesterday}) {icon} {arrow}{change}%"

    def _get_day_name(self, d: date) -> str:
        days = ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد']
        return days[d.weekday()]

    def _format_duration(self, seconds: float) -> str:
        if not seconds:
            return "N/A"
        minutes = int(seconds // 60)
        secs = int(seconds % 60)
        return f"{minutes}:{secs:02d}"

    async def generate_daily_report(self, report_date: date = None) -> str:
        """التقرير اليومي - نص فقط"""
        if report_date is None:
            report_date = date.today()

        yesterday = report_date - timedelta(days=1)

        # جلب بيانات اليوم من Google Analytics
        ga_today = {}
        ga_yesterday = {}
        try:
            ga = GoogleAnalyticsCollector()
            result_today = await ga.collect_daily_report(report_date)
            result_yesterday = await ga.collect_daily_report(yesterday)
            if result_today.get('status') == 'success':
                ga_today = result_today['data']
            if result_yesterday.get('status') == 'success':
                ga_yesterday = result_yesterday['data']
        except Exception as e:
            print(f"GA Error: {e}")

        # جلب تحميلات التطبيق من Firebase
        downloads_today = {'ios': 0, 'android': 0, 'total': 0}
        downloads_yesterday = {'ios': 0, 'android': 0, 'total': 0}
        try:
            downloads_today = await self.firebase.get_app_downloads(report_date)
            downloads_yesterday = await self.firebase.get_app_downloads(yesterday)
        except Exception as e:
            print(f"Firebase Downloads Error: {e}")

        # جلب بيانات Clarity
        clarity_data = {}
        try:
            clarity = ClarityCollector()
            clarity_data = await clarity.get_daily_metrics(report_date)
        except Exception as e:
            print(f"Clarity Error: {e}")

        # استخراج القيم
        visitors_today = ga_today.get('active_users', 0)
        visitors_yesterday = ga_yesterday.get('active_users', 0)
        sessions_today = ga_today.get('sessions', 0)
        page_views_today = ga_today.get('page_views', 0)
        page_views_yesterday = ga_yesterday.get('page_views', 0)
        avg_session = ga_today.get('avg_session_duration', 0)
        bounce_rate = ga_today.get('bounce_rate', 0)

        ios_today = downloads_today.get('ios', 0)
        ios_yesterday = downloads_yesterday.get('ios', 0)
        android_today = downloads_today.get('android', 0)
        android_yesterday = downloads_yesterday.get('android', 0)
        total_downloads_today = downloads_today.get('total', 0)
        total_downloads_yesterday = downloads_yesterday.get('total', 0)

        rage_clicks = clarity_data.get('rage_clicks', 0)
        dead_clicks = clarity_data.get('dead_clicks', 0)
        quick_backs = clarity_data.get('quick_backs', 0)
        engagement = clarity_data.get('engagement_score', 0)

        # تحديد حالة الأداء
        web_status = "✅ ممتاز" if visitors_today > visitors_yesterday else "⚠️ يحتاج مراجعة"
        downloads_status = "✅ في تصاعد" if total_downloads_today > total_downloads_yesterday else "⚠️ منخفض"
        ux_status = "✅ جيدة" if engagement >= 50 else "⚠️ تحتاج تحسين"

        # بناء التقرير النصي
        report = f"""📊 *تقرير Golden Host اليومي*
📅 {self._get_day_name(report_date)} {report_date.strftime('%d')} {self._get_month_name(report_date)} {report_date.year}
━━━━━━━━━━━━━━━━━━━━━

🌐 إحصائيات الموقع
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
├ 👥 الزوار: {visitors_today:,} {self._format_change(visitors_today, visitors_yesterday)}
├ 📱 الجلسات: {sessions_today:,}
├ 📄 المشاهدات: {page_views_today:,}
├ ⏱ متوسط الجلسة: {self._format_duration(avg_session)} دقيقة
└ 📉 معدل الارتداد: {bounce_rate}%

📱 تحميلات التطبيق
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
├ 🍎 iOS: {ios_today} {self._format_change(ios_today, ios_yesterday)}
├ 🤖 Android: {android_today} {self._format_change(android_today, android_yesterday)}
└ 📊 الإجمالي: {total_downloads_today} {self._format_change(total_downloads_today, total_downloads_yesterday)}

🔥 سلوك المستخدم (Clarity)
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
├ 😤 نقرات الغضب: {rage_clicks}
├ 🖱 النقرات الميتة: {dead_clicks}
├ ↩️ الرجوع السريع: {quick_backs}
└ 📊 درجة التفاعل: {engagement}%

━━━━━━━━━━━━━━━━━━━━━
📈 ملخص الأداء
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
{web_status} أداء الويب
{downloads_status} التحميلات
{ux_status} تجربة المستخدم

━━━━━━━━━━━━━━━━━━━━━
🏢 شركة ليفل أب القابضة
🤖 Botng v1.0"""

        return report

    def _get_month_name(self, d: date) -> str:
        months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
        return months[d.month - 1]

    async def generate_weekly_report(self) -> str:
        """التقرير الأسبوعي"""
        end_date = date.today()
        start_date = end_date - timedelta(days=6)

        # جمع بيانات الأسبوع
        totals = {
            'visitors': 0,
            'sessions': 0,
            'page_views': 0,
            'ios': 0,
            'android': 0
        }

        try:
            ga = GoogleAnalyticsCollector()
            for i in range(7):
                day = start_date + timedelta(days=i)
                result = await ga.collect_daily_report(day)
                if result.get('status') == 'success':
                    data = result['data']
                    totals['visitors'] += data.get('active_users', 0)
                    totals['sessions'] += data.get('sessions', 0)
                    totals['page_views'] += data.get('page_views', 0)

                downloads = await self.firebase.get_app_downloads(day)
                totals['ios'] += downloads.get('ios', 0)
                totals['android'] += downloads.get('android', 0)
        except Exception as e:
            print(f"Weekly Report Error: {e}")

        report = f"""📈 *التقرير الأسبوعي*
📅 {start_date.strftime('%d/%m')} - {end_date.strftime('%d/%m/%Y')}
━━━━━━━━━━━━━━━━━━━━━

🌐 إحصائيات الموقع
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
├ 👥 الزوار: {totals['visitors']:,}
├ 📱 الجلسات: {totals['sessions']:,}
└ 📄 المشاهدات: {totals['page_views']:,}

📱 تحميلات التطبيق
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
├ 🍎 iOS: {totals['ios']}
├ 🤖 Android: {totals['android']}
└ 📊 الإجمالي: {totals['ios'] + totals['android']}

━━━━━━━━━━━━━━━━━━━━━
🏢 شركة ليفل أب القابضة
🤖 Botng v1.0"""

        return report

    async def send_report(self, report_type: str = "daily", phone: str = None):
        """إرسال التقرير عبر الواتساب"""
        if phone is None:
            phone = settings.admin_phone

        if report_type == "daily":
            report = await self.generate_daily_report()
        elif report_type == "weekly":
            report = await self.generate_weekly_report()
        else:
            report = await self.generate_daily_report()

        await self.whatsapp.send_message(phone, report)
        return report
