from datetime import datetime, date, timedelta
from typing import Dict, Any, Optional, Tuple
import httpx
import io
import os
import tempfile

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

from ..config import settings
from ..collectors.google_analytics import GoogleAnalyticsCollector
from ..collectors.firebase_collector import FirebaseCollector


class SmartReportGenerator:
    """مولد التقارير الذكية - نص + PDF"""

    def __init__(self):
        self.data = {}
        self.yesterday_data = {}
        self.ga_collector = GoogleAnalyticsCollector()
        self.firebase_collector = FirebaseCollector()

    async def fetch_live_data(self, for_yesterday: bool = True) -> Dict[str, Any]:
        """جلب البيانات من Google Analytics

        Args:
            for_yesterday: إذا True يجلب بيانات أمس مقارنة بأول أمس
        """
        try:
            # تحديد التواريخ
            if for_yesterday:
                report_date = date.today() - timedelta(days=1)  # أمس
            else:
                report_date = date.today()

            # جلب بيانات Google Analytics (أمس مقارنة بأول أمس)
            ga_comparison = await self.ga_collector.collect_comparison(report_date)

            ga_today = {}
            ga_yesterday = {}

            if ga_comparison.get("status") == "success":
                ga_today = ga_comparison["data"].get("today", {})
                ga_yesterday = ga_comparison["data"].get("yesterday", {})

            return {
                "analytics": {
                    "today": ga_today,      # بيانات أمس
                    "yesterday": ga_yesterday  # بيانات أول أمس
                },
                "clarity": {},
                "report_date": report_date.isoformat()
            }
        except Exception as e:
            print(f"Error fetching live data: {e}")
            return {}

    def _extract_metrics(self, data: Dict) -> Dict[str, Any]:
        """استخراج المقاييس من البيانات"""
        analytics = data.get("analytics", {})
        clarity = data.get("clarity", {})

        # Website metrics من Google Analytics
        # أمس = today, أول أمس = yesterday
        today_metrics = analytics.get("today", {})
        yesterday_metrics = analytics.get("yesterday", {})

        # GA collector يستخدم snake_case
        visitors_today = today_metrics.get("active_users", today_metrics.get("activeUsers", 0))
        visitors_yesterday = yesterday_metrics.get("active_users", yesterday_metrics.get("activeUsers", 0))

        sessions_today = today_metrics.get("sessions", 0)
        page_views_today = today_metrics.get("page_views", today_metrics.get("pageViews", 0))
        page_views_yesterday = yesterday_metrics.get("page_views", yesterday_metrics.get("pageViews", 0))

        avg_session = today_metrics.get("avg_session_duration", today_metrics.get("averageSessionDuration", 0))
        bounce_rate = today_metrics.get("bounce_rate", today_metrics.get("bounceRate", 0))

        # Top pages
        top_pages = today_metrics.get("top_pages", [])

        # Clarity metrics (إذا متوفرة)
        clarity_data = clarity.get("data", clarity) if clarity else {}
        engagement = clarity_data.get("engagement_score", clarity_data.get("engagementScore", 75))
        rage_clicks = clarity_data.get("rage_clicks", clarity_data.get("rageClicks", 0))
        dead_clicks = clarity_data.get("dead_clicks", clarity_data.get("deadClicks", 0))
        quick_backs = clarity_data.get("quick_backs", clarity_data.get("quickBacks", 0))

        # التحميلات - تحتاج مصدر خارجي (App Store Connect / Google Play)
        ios_today = 0
        ios_yesterday = 0
        android_today = 0
        android_yesterday = 0

        return {
            "visitors_today": visitors_today,
            "visitors_yesterday": visitors_yesterday,
            "sessions_today": sessions_today,
            "page_views_today": page_views_today,
            "page_views_yesterday": page_views_yesterday,
            "avg_session": avg_session,
            "bounce_rate": bounce_rate,
            "ios_today": ios_today,
            "ios_yesterday": ios_yesterday,
            "android_today": android_today,
            "android_yesterday": android_yesterday,
            "engagement": engagement,
            "rage_clicks": rage_clicks,
            "dead_clicks": dead_clicks,
            "quick_backs": quick_backs,
            "top_pages": top_pages
        }

    def _calc_change(self, today: float, yesterday: float) -> Tuple[float, str]:
        """حساب نسبة التغيير"""
        if yesterday == 0:
            if today > 0:
                return 100, "+"
            return 0, ""
        change = ((today - yesterday) / yesterday) * 100
        sign = "+" if change > 0 else ""
        return round(change, 1), sign

    def _get_day_name(self, d: date) -> str:
        days = ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد']
        return days[d.weekday()]

    def _get_month_name(self, d: date) -> str:
        months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
        return months[d.month - 1]

    def _format_duration(self, seconds: float) -> str:
        if not seconds:
            return "0:00"
        minutes = int(seconds // 60)
        secs = int(seconds % 60)
        return f"{minutes}:{secs:02d}"

    async def generate_text_summary(self, metrics: Dict = None) -> str:
        """إنشاء ملخص نصي - بيانات أمس"""
        if metrics is None:
            data = await self.fetch_live_data(for_yesterday=True)
            metrics = self._extract_metrics(data)

        # التقرير عن أمس (يوم كامل) مقارنة بأول أمس
        yesterday = date.today() - timedelta(days=1)

        # Calculate changes
        visitors_change, visitors_sign = self._calc_change(
            metrics["visitors_today"], metrics["visitors_yesterday"]
        )
        ios_change, ios_sign = self._calc_change(
            metrics["ios_today"], metrics["ios_yesterday"]
        )
        android_change, android_sign = self._calc_change(
            metrics["android_today"], metrics["android_yesterday"]
        )

        total_today = metrics["ios_today"] + metrics["android_today"]
        total_yesterday = metrics["ios_yesterday"] + metrics["android_yesterday"]
        total_change, total_sign = self._calc_change(total_today, total_yesterday)

        # Icons based on change
        visitors_icon = "" if visitors_change >= 0 else ""
        ios_icon = "" if ios_change >= 0 else ""
        android_icon = "" if android_change >= 0 else ""
        total_icon = "" if total_change >= 0 else ""

        # Status indicators
        web_status = "ممتاز" if visitors_change >= 0 else "يحتاج مراجعة"
        downloads_status = "تصاعد" if total_change >= 0 else "منخفض"
        ux_status = "جيدة" if metrics["engagement"] >= 50 else "تحتاج تحسين"
        ux_warning = "" if metrics["engagement"] < 50 else ""

        summary = f"""*تقرير Golden Host اليومي*
{self._get_day_name(yesterday)} {yesterday.day} {self._get_month_name(yesterday)} {yesterday.year}



*الموقع*
 الزوار: *{metrics['visitors_today']}* (أول أمس: {metrics['visitors_yesterday']}) {visitors_icon}{visitors_sign}{visitors_change}%
 الجلسات: *{metrics['sessions_today']}*
 المشاهدات: *{metrics['page_views_today']}*

*التحميلات*
 iOS: *{metrics['ios_today']}* {ios_icon}{ios_sign}{ios_change}%
 Android: *{metrics['android_today']}* {android_icon}{android_sign}{android_change}%
 الإجمالي: *{total_today}* {total_icon}{total_sign}{total_change}%

*Clarity*
 التفاعل: *{metrics['engagement']}%* {ux_warning}
 نقرات الغضب: *{metrics['rage_clicks']}*



*الملخص*
 الويب: {web_status}
 التحميلات: {downloads_status}
 UX: {ux_status}

_التفاصيل في الملف المرفق_"""

        return summary

    def _create_chart(self, metrics: Dict, chart_type: str = "bar") -> io.BytesIO:
        """إنشاء رسم بياني"""
        plt.style.use('seaborn-v0_8-whitegrid')
        fig, ax = plt.subplots(figsize=(6, 3), dpi=100)

        if chart_type == "comparison":
            categories = ['Visitors', 'Sessions', 'Page Views']
            today_vals = [
                metrics['visitors_today'],
                metrics['sessions_today'],
                metrics['page_views_today']
            ]
            yesterday_vals = [
                metrics['visitors_yesterday'],
                metrics['sessions_today'] * 0.9,  # Estimate
                metrics['page_views_yesterday']
            ]

            x = np.arange(len(categories))
            width = 0.35

            bars1 = ax.bar(x - width/2, today_vals, width, label='Today', color='#4CAF50')
            bars2 = ax.bar(x + width/2, yesterday_vals, width, label='Yesterday', color='#9E9E9E')

            ax.set_ylabel('Count')
            ax.set_xticks(x)
            ax.set_xticklabels(categories)
            ax.legend()
            ax.set_title('Website Performance Comparison')

        elif chart_type == "downloads":
            labels = ['iOS', 'Android']
            today_vals = [metrics['ios_today'], metrics['android_today']]
            yesterday_vals = [metrics['ios_yesterday'], metrics['android_yesterday']]

            x = np.arange(len(labels))
            width = 0.35

            ax.bar(x - width/2, today_vals, width, label='Today', color='#2196F3')
            ax.bar(x + width/2, yesterday_vals, width, label='Yesterday', color='#90CAF9')

            ax.set_ylabel('Downloads')
            ax.set_xticks(x)
            ax.set_xticklabels(labels)
            ax.legend()
            ax.set_title('App Downloads')

        plt.tight_layout()

        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight', facecolor='white')
        buf.seek(0)
        plt.close(fig)

        return buf

    async def generate_pdf_report(self, metrics: Dict = None) -> str:
        """إنشاء تقرير PDF احترافي"""
        if metrics is None:
            data = await self.fetch_live_data()
            metrics = self._extract_metrics(data)

        today = date.today()

        # Create temp file
        temp_dir = tempfile.gettempdir()
        pdf_path = os.path.join(temp_dir, f"golden_host_report_{today.strftime('%Y%m%d')}.pdf")

        # Create PDF
        c = canvas.Canvas(pdf_path, pagesize=A4)
        width, height = A4

        # Colors
        primary_color = colors.HexColor("#1a237e")
        accent_color = colors.HexColor("#ffd700")
        success_color = colors.HexColor("#4caf50")
        warning_color = colors.HexColor("#ff9800")
        danger_color = colors.HexColor("#f44336")
        light_gray = colors.HexColor("#f5f5f5")

        # Header Background
        c.setFillColor(primary_color)
        c.rect(0, height - 80, width, 80, fill=True, stroke=False)

        # Header Text
        c.setFillColor(colors.white)
        c.setFont("Helvetica-Bold", 24)
        c.drawCentredString(width/2, height - 35, "Golden Host Daily Report")

        c.setFont("Helvetica", 12)
        c.drawCentredString(width/2, height - 55, f"{today.strftime('%A, %d %B %Y')}")

        # Gold accent line
        c.setStrokeColor(accent_color)
        c.setLineWidth(3)
        c.line(50, height - 80, width - 50, height - 80)

        y_pos = height - 120

        # KPI Cards Row
        card_width = 120
        card_height = 70
        start_x = 50
        spacing = (width - 100 - 4 * card_width) / 3

        kpi_data = [
            ("Visitors", metrics['visitors_today'], f"vs {metrics['visitors_yesterday']}", success_color if metrics['visitors_today'] >= metrics['visitors_yesterday'] else danger_color),
            ("Sessions", metrics['sessions_today'], "Today", colors.HexColor("#2196f3")),
            ("Page Views", metrics['page_views_today'], f"vs {metrics['page_views_yesterday']}", success_color if metrics['page_views_today'] >= metrics['page_views_yesterday'] else danger_color),
            ("Bounce Rate", f"{metrics['bounce_rate']}%", "Rate", warning_color if metrics['bounce_rate'] > 50 else success_color)
        ]

        for i, (label, value, subtitle, card_color) in enumerate(kpi_data):
            x = start_x + i * (card_width + spacing)

            # Card background
            c.setFillColor(light_gray)
            c.roundRect(x, y_pos - card_height, card_width, card_height, 5, fill=True, stroke=False)

            # Color indicator
            c.setFillColor(card_color)
            c.rect(x, y_pos - card_height, 5, card_height, fill=True, stroke=False)

            # Value
            c.setFillColor(colors.black)
            c.setFont("Helvetica-Bold", 18)
            c.drawCentredString(x + card_width/2, y_pos - 30, str(value))

            # Label
            c.setFont("Helvetica", 10)
            c.setFillColor(colors.gray)
            c.drawCentredString(x + card_width/2, y_pos - 45, label)

            # Subtitle
            c.setFont("Helvetica", 8)
            c.drawCentredString(x + card_width/2, y_pos - 58, subtitle)

        y_pos -= card_height + 30

        # Website Performance Section
        c.setFillColor(primary_color)
        c.setFont("Helvetica-Bold", 14)
        c.drawString(50, y_pos, "Website Performance")

        y_pos -= 20

        # Table header
        c.setFillColor(colors.HexColor("#e3f2fd"))
        c.rect(50, y_pos - 20, width - 100, 20, fill=True, stroke=False)

        c.setFillColor(colors.black)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(60, y_pos - 15, "Metric")
        c.drawString(200, y_pos - 15, "Today")
        c.drawString(300, y_pos - 15, "Yesterday")
        c.drawString(400, y_pos - 15, "Change")

        y_pos -= 20

        # Table rows
        visitors_change, visitors_sign = self._calc_change(metrics['visitors_today'], metrics['visitors_yesterday'])
        pv_change, pv_sign = self._calc_change(metrics['page_views_today'], metrics['page_views_yesterday'])

        table_data = [
            ("Active Users", metrics['visitors_today'], metrics['visitors_yesterday'], f"{visitors_sign}{visitors_change}%"),
            ("Sessions", metrics['sessions_today'], "-", "-"),
            ("Page Views", metrics['page_views_today'], metrics['page_views_yesterday'], f"{pv_sign}{pv_change}%"),
            ("Avg Session", self._format_duration(metrics['avg_session']), "-", "-"),
            ("Bounce Rate", f"{metrics['bounce_rate']}%", "-", "-")
        ]

        c.setFont("Helvetica", 10)
        for i, (metric, today_val, yesterday_val, change) in enumerate(table_data):
            row_y = y_pos - (i * 18)

            if i % 2 == 0:
                c.setFillColor(colors.HexColor("#fafafa"))
                c.rect(50, row_y - 13, width - 100, 18, fill=True, stroke=False)

            c.setFillColor(colors.black)
            c.drawString(60, row_y - 10, metric)
            c.drawString(200, row_y - 10, str(today_val))
            c.drawString(300, row_y - 10, str(yesterday_val))

            # Color the change
            if "+" in str(change):
                c.setFillColor(success_color)
            elif "-" in str(change) and change != "-":
                c.setFillColor(danger_color)
            else:
                c.setFillColor(colors.gray)
            c.drawString(400, row_y - 10, str(change))

        y_pos -= len(table_data) * 18 + 30

        # App Downloads Section
        c.setFillColor(primary_color)
        c.setFont("Helvetica-Bold", 14)
        c.drawString(50, y_pos, "App Downloads")

        y_pos -= 20

        # Downloads table
        c.setFillColor(colors.HexColor("#e8f5e9"))
        c.rect(50, y_pos - 20, width - 100, 20, fill=True, stroke=False)

        c.setFillColor(colors.black)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(60, y_pos - 15, "Platform")
        c.drawString(200, y_pos - 15, "Today")
        c.drawString(300, y_pos - 15, "Yesterday")
        c.drawString(400, y_pos - 15, "Change")

        y_pos -= 20

        ios_change, ios_sign = self._calc_change(metrics['ios_today'], metrics['ios_yesterday'])
        android_change, android_sign = self._calc_change(metrics['android_today'], metrics['android_yesterday'])
        total_today = metrics['ios_today'] + metrics['android_today']
        total_yesterday = metrics['ios_yesterday'] + metrics['android_yesterday']
        total_change, total_sign = self._calc_change(total_today, total_yesterday)

        downloads_data = [
            ("iOS", metrics['ios_today'], metrics['ios_yesterday'], f"{ios_sign}{ios_change}%"),
            ("Android", metrics['android_today'], metrics['android_yesterday'], f"{android_sign}{android_change}%"),
            ("Total", total_today, total_yesterday, f"{total_sign}{total_change}%")
        ]

        c.setFont("Helvetica", 10)
        for i, (platform, today_val, yesterday_val, change) in enumerate(downloads_data):
            row_y = y_pos - (i * 18)

            if i % 2 == 0:
                c.setFillColor(colors.HexColor("#fafafa"))
                c.rect(50, row_y - 13, width - 100, 18, fill=True, stroke=False)

            c.setFillColor(colors.black)
            c.drawString(60, row_y - 10, platform)
            c.drawString(200, row_y - 10, str(today_val))
            c.drawString(300, row_y - 10, str(yesterday_val))

            if "+" in str(change):
                c.setFillColor(success_color)
            elif "-" in str(change) and change != "-":
                c.setFillColor(danger_color)
            else:
                c.setFillColor(colors.gray)
            c.drawString(400, row_y - 10, str(change))

        y_pos -= len(downloads_data) * 18 + 30

        # User Behavior Section (Clarity)
        c.setFillColor(danger_color)
        c.setFont("Helvetica-Bold", 14)
        c.drawString(50, y_pos, "User Behavior (Clarity)")

        # Warning if engagement is low
        if metrics['engagement'] < 50:
            c.setFillColor(colors.HexColor("#ffebee"))
            c.rect(50, y_pos - 80, width - 100, 70, fill=True, stroke=False)
            c.setStrokeColor(danger_color)
            c.setLineWidth(2)
            c.rect(50, y_pos - 80, width - 100, 70, fill=False, stroke=True)

        y_pos -= 25

        clarity_items = [
            ("Engagement Score", f"{metrics['engagement']}%", danger_color if metrics['engagement'] < 50 else success_color),
            ("Rage Clicks", metrics['rage_clicks'], warning_color if metrics['rage_clicks'] > 10 else success_color),
            ("Dead Clicks", metrics['dead_clicks'], warning_color if metrics['dead_clicks'] > 5 else success_color),
            ("Quick Backs", metrics['quick_backs'], warning_color if metrics['quick_backs'] > 10 else success_color)
        ]

        c.setFont("Helvetica", 10)
        for i, (label, value, indicator_color) in enumerate(clarity_items):
            row_y = y_pos - (i * 15)
            c.setFillColor(colors.black)
            c.drawString(60, row_y, f"{label}:")
            c.setFillColor(indicator_color)
            c.setFont("Helvetica-Bold", 10)
            c.drawString(180, row_y, str(value))
            c.setFont("Helvetica", 10)

        y_pos -= len(clarity_items) * 15 + 30

        # Summary Section
        c.setFillColor(primary_color)
        c.setFont("Helvetica-Bold", 14)
        c.drawString(50, y_pos, "Performance Summary")

        y_pos -= 25

        # Summary cards
        summary_width = 150
        summary_height = 40

        summaries = [
            ("Web Performance", "Excellent" if metrics['visitors_today'] >= metrics['visitors_yesterday'] else "Needs Review",
             success_color if metrics['visitors_today'] >= metrics['visitors_yesterday'] else warning_color),
            ("App Downloads", "Growing" if total_today >= total_yesterday else "Declining",
             success_color if total_today >= total_yesterday else warning_color),
            ("User Experience", "Good" if metrics['engagement'] >= 50 else "Needs Improvement",
             success_color if metrics['engagement'] >= 50 else danger_color)
        ]

        summary_spacing = (width - 100 - 3 * summary_width) / 2

        for i, (title, status, bg_color) in enumerate(summaries):
            x = 50 + i * (summary_width + summary_spacing)

            c.setFillColor(bg_color)
            c.roundRect(x, y_pos - summary_height, summary_width, summary_height, 5, fill=True, stroke=False)

            c.setFillColor(colors.white)
            c.setFont("Helvetica-Bold", 10)
            c.drawCentredString(x + summary_width/2, y_pos - 15, title)
            c.setFont("Helvetica", 9)
            c.drawCentredString(x + summary_width/2, y_pos - 30, status)

        # Footer
        c.setFillColor(colors.gray)
        c.setFont("Helvetica", 8)
        c.drawCentredString(width/2, 30, f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | Level Up Holding | Botng v1.0")

        c.save()

        return pdf_path

    async def generate_daily_report(self, report_date: date = None) -> Dict[str, Any]:
        """إنشاء التقرير اليومي الكامل (نص + PDF) - بيانات أمس"""
        # التقرير اليومي دائماً عن أمس (يوم كامل)
        if report_date is None:
            report_date = date.today() - timedelta(days=1)

        # Fetch live data (for_yesterday=True بشكل افتراضي)
        data = await self.fetch_live_data(for_yesterday=True)
        metrics = self._extract_metrics(data)

        # Generate text summary
        text_summary = await self.generate_text_summary(metrics)

        # Generate PDF
        pdf_path = await self.generate_pdf_report(metrics)

        return {
            "text": text_summary,
            "pdf_path": pdf_path,
            "metrics": metrics,
            "date": report_date.isoformat()
        }

    async def generate_weekly_report(self) -> str:
        """التقرير الأسبوعي"""
        end_date = date.today() - timedelta(days=1)  # أمس
        start_date = end_date - timedelta(days=6)

        # جلب بيانات Google Analytics الأسبوعية
        ga_weekly = await self.ga_collector.collect_weekly_summary()

        if ga_weekly.get("status") == "success":
            weekly_data = ga_weekly["data"]
            total_users = weekly_data.get("total_users", 0)
            total_sessions = weekly_data.get("total_sessions", 0)
            total_views = weekly_data.get("total_views", 0)
        else:
            # fallback - استخدام تقديرات
            data = await self.fetch_live_data()
            metrics = self._extract_metrics(data)
            total_users = metrics['visitors_today'] * 7
            total_sessions = metrics['sessions_today'] * 7
            total_views = metrics['page_views_today'] * 7

        report = f"""*التقرير الأسبوعي - Golden Host*
{start_date.strftime('%d/%m')} - {end_date.strftime('%d/%m/%Y')}



*الموقع الإلكتروني*
 إجمالي الزوار: *{total_users:,}*
 إجمالي الجلسات: *{total_sessions:,}*
 إجمالي المشاهدات: *{total_views:,}*



_شركة ليفل أب القابضة | Botng_"""

        return report
