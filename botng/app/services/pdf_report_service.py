"""
PDF Report Service
توليد تقارير PDF احترافية مع رسوم بيانية
"""

import os
import io
from datetime import datetime, timedelta
from typing import Dict, Any, List
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from matplotlib.patches import FancyBboxPatch
import numpy as np
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_RIGHT, TA_CENTER

class PDFReportService:
    def __init__(self):
        self.output_dir = os.getenv("REPORTS_DIR", "/tmp/reports")
        os.makedirs(self.output_dir, exist_ok=True)

        # Colors
        self.primary_color = '#1a2d4a'
        self.gold_color = '#d4af37'
        self.green_color = '#10B981'
        self.red_color = '#EF4444'
        self.gray_color = '#6B7280'

    async def generate_daily_pdf(
        self,
        analytics: Dict[str, Any],
        clarity: Dict[str, Any],
        downloads: Dict[str, Any],
        history: List[Dict[str, Any]] = None
    ) -> str:
        """توليد تقرير PDF يومي"""

        date_str = datetime.now().strftime('%Y-%m-%d')
        filename = f"golden_host_report_{date_str}.pdf"
        filepath = os.path.join(self.output_dir, filename)

        # Generate charts
        charts = await self._generate_charts(analytics, clarity, downloads, history)

        # Create PDF
        doc = SimpleDocTemplate(
            filepath,
            pagesize=A4,
            rightMargin=1.5*cm,
            leftMargin=1.5*cm,
            topMargin=1.5*cm,
            bottomMargin=1.5*cm
        )

        # Build content
        story = []
        styles = getSampleStyleSheet()

        # Custom styles
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            spaceAfter=30,
            alignment=TA_CENTER,
            textColor=colors.HexColor(self.primary_color)
        )

        subtitle_style = ParagraphStyle(
            'CustomSubtitle',
            parent=styles['Normal'],
            fontSize=14,
            spaceAfter=20,
            alignment=TA_CENTER,
            textColor=colors.HexColor(self.gray_color)
        )

        section_style = ParagraphStyle(
            'SectionTitle',
            parent=styles['Heading2'],
            fontSize=16,
            spaceBefore=20,
            spaceAfter=10,
            textColor=colors.HexColor(self.primary_color)
        )

        # Header
        day_name = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][datetime.now().weekday()]
        story.append(Paragraph("Golden Host Daily Report", title_style))
        story.append(Paragraph(f"{date_str} • {day_name}", subtitle_style))
        story.append(Spacer(1, 20))

        # Summary Cards Table
        summary_data = self._create_summary_table(analytics, downloads, clarity)
        story.append(summary_data)
        story.append(Spacer(1, 30))

        # Web Analytics Section
        story.append(Paragraph("🌐 Website Analytics", section_style))
        if 'web_chart' in charts:
            story.append(Image(charts['web_chart'], width=450, height=200))
        story.append(Spacer(1, 10))

        web_table = self._create_web_table(analytics)
        story.append(web_table)
        story.append(Spacer(1, 30))

        # App Downloads Section
        story.append(Paragraph("📱 App Downloads", section_style))
        if 'downloads_chart' in charts:
            story.append(Image(charts['downloads_chart'], width=450, height=200))
        story.append(Spacer(1, 10))

        downloads_table = self._create_downloads_table(downloads)
        story.append(downloads_table)
        story.append(Spacer(1, 30))

        # User Behavior Section
        story.append(Paragraph("🔥 User Behavior (Clarity)", section_style))
        if 'clarity_chart' in charts:
            story.append(Image(charts['clarity_chart'], width=450, height=200))
        story.append(Spacer(1, 10))

        clarity_table = self._create_clarity_table(clarity)
        story.append(clarity_table)

        # Build PDF
        doc.build(story)

        return filepath

    async def _generate_charts(
        self,
        analytics: Dict,
        clarity: Dict,
        downloads: Dict,
        history: List = None
    ) -> Dict[str, str]:
        """Generate charts as images"""

        charts = {}

        # Set style
        plt.style.use('seaborn-v0_8-whitegrid')

        # 1. Web Analytics Chart (Comparison)
        fig, ax = plt.subplots(figsize=(10, 4))

        categories = ['Visitors', 'Sessions', 'Page Views']
        today_values = [
            analytics.get('total_users', 0),
            analytics.get('sessions', 0),
            analytics.get('page_views', 0) / 10  # Scale down
        ]
        yesterday_values = [
            analytics.get('yesterday_users', 0),
            analytics.get('yesterday_sessions', 0),
            analytics.get('yesterday_page_views', 0) / 10
        ]

        x = np.arange(len(categories))
        width = 0.35

        bars1 = ax.bar(x - width/2, today_values, width, label='Today', color=self.gold_color)
        bars2 = ax.bar(x + width/2, yesterday_values, width, label='Yesterday', color=self.gray_color, alpha=0.7)

        ax.set_ylabel('Count')
        ax.set_title('Website Performance: Today vs Yesterday', fontsize=14, fontweight='bold', color=self.primary_color)
        ax.set_xticks(x)
        ax.set_xticklabels(categories)
        ax.legend()

        # Add value labels
        for bar in bars1:
            height = bar.get_height()
            ax.annotate(f'{int(height)}',
                       xy=(bar.get_x() + bar.get_width() / 2, height),
                       ha='center', va='bottom', fontsize=10, fontweight='bold')

        plt.tight_layout()
        web_chart_path = os.path.join(self.output_dir, 'web_chart.png')
        plt.savefig(web_chart_path, dpi=150, bbox_inches='tight')
        plt.close()
        charts['web_chart'] = web_chart_path

        # 2. Downloads Chart (iOS vs Android)
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))

        # Pie chart for today
        ios = downloads.get('ios', {}).get('today', 0)
        android = downloads.get('android', {}).get('today', 0)

        if ios + android > 0:
            sizes = [ios, android]
            labels = [f'iOS\n{ios}', f'Android\n{android}']
            colors_pie = ['#007AFF', '#3DDC84']
            explode = (0.05, 0.05)

            ax1.pie(sizes, explode=explode, labels=labels, colors=colors_pie,
                   autopct='%1.1f%%', shadow=True, startangle=90)
            ax1.set_title("Today's Downloads", fontsize=12, fontweight='bold')

        # Bar comparison
        platforms = ['iOS', 'Android']
        today_dl = [downloads.get('ios', {}).get('today', 0), downloads.get('android', {}).get('today', 0)]
        yesterday_dl = [downloads.get('ios', {}).get('yesterday', 0), downloads.get('android', {}).get('yesterday', 0)]

        x = np.arange(len(platforms))
        width = 0.35

        ax2.bar(x - width/2, today_dl, width, label='Today', color=['#007AFF', '#3DDC84'])
        ax2.bar(x + width/2, yesterday_dl, width, label='Yesterday', color=['#007AFF', '#3DDC84'], alpha=0.5)
        ax2.set_ylabel('Downloads')
        ax2.set_title('Platform Comparison', fontsize=12, fontweight='bold')
        ax2.set_xticks(x)
        ax2.set_xticklabels(platforms)
        ax2.legend()

        plt.tight_layout()
        downloads_chart_path = os.path.join(self.output_dir, 'downloads_chart.png')
        plt.savefig(downloads_chart_path, dpi=150, bbox_inches='tight')
        plt.close()
        charts['downloads_chart'] = downloads_chart_path

        # 3. Clarity Metrics Chart
        fig, ax = plt.subplots(figsize=(10, 4))

        metrics = ['Engagement', 'Frustration', 'Rage Clicks', 'Dead Clicks']
        values = [
            clarity.get('engagement_score', 0),
            clarity.get('frustration_score', 0),
            clarity.get('rage_clicks', 0) * 5,  # Scale for visibility
            clarity.get('dead_clicks', 0) * 5
        ]

        bar_colors = [self.green_color, self.red_color, '#F59E0B', self.gray_color]
        bars = ax.barh(metrics, values, color=bar_colors, height=0.6)

        ax.set_xlabel('Score / Count')
        ax.set_title('User Behavior Metrics', fontsize=14, fontweight='bold', color=self.primary_color)

        # Add value labels
        for bar, val in zip(bars, [clarity.get('engagement_score', 0), clarity.get('frustration_score', 0),
                                    clarity.get('rage_clicks', 0), clarity.get('dead_clicks', 0)]):
            ax.text(bar.get_width() + 1, bar.get_y() + bar.get_height()/2,
                   f'{val}{"%" if "score" in str(val) else ""}', va='center', fontsize=10, fontweight='bold')

        plt.tight_layout()
        clarity_chart_path = os.path.join(self.output_dir, 'clarity_chart.png')
        plt.savefig(clarity_chart_path, dpi=150, bbox_inches='tight')
        plt.close()
        charts['clarity_chart'] = clarity_chart_path

        return charts

    def _create_summary_table(self, analytics: Dict, downloads: Dict, clarity: Dict) -> Table:
        """Create summary cards table"""

        users_change = analytics.get('users_change_percent', 0)
        downloads_change = downloads.get('change_percent', 0)

        data = [
            ['Website Visitors', 'App Downloads', 'Engagement Score'],
            [
                f"{analytics.get('total_users', 0):,}",
                f"{downloads.get('today', 0)}",
                f"{clarity.get('engagement_score', 0)}%"
            ],
            [
                f"{'↑' if users_change >= 0 else '↓'} {abs(users_change)}%",
                f"{'↑' if downloads_change >= 0 else '↓'} {abs(downloads_change)}%",
                "vs yesterday"
            ]
        ]

        table = Table(data, colWidths=[150, 150, 150])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor(self.primary_color)),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('FONTSIZE', (0, 1), (-1, 1), 20),
            ('FONTSIZE', (0, 2), (-1, 2), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('TOPPADDING', (0, 1), (-1, 1), 15),
            ('BOTTOMPADDING', (0, 1), (-1, 1), 5),
            ('TEXTCOLOR', (0, 2), (-1, 2), colors.HexColor(self.gray_color)),
            ('BOX', (0, 0), (-1, -1), 1, colors.HexColor(self.primary_color)),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E5E7EB')),
        ]))

        return table

    def _create_web_table(self, analytics: Dict) -> Table:
        """Create web analytics table"""

        data = [
            ['Metric', 'Today', 'Yesterday', 'Change'],
            ['Visitors', str(analytics.get('total_users', 0)), str(analytics.get('yesterday_users', 0)),
             f"{analytics.get('users_change_percent', 0)}%"],
            ['Sessions', str(analytics.get('sessions', 0)), str(analytics.get('yesterday_sessions', 0)),
             f"{analytics.get('sessions_change_percent', 0)}%"],
            ['Page Views', str(analytics.get('page_views', 0)), str(analytics.get('yesterday_page_views', 0)),
             f"{analytics.get('page_views_change_percent', 0)}%"],
            ['Bounce Rate', f"{analytics.get('bounce_rate', 0)}%", '-', '-'],
            ['Avg. Session', f"{analytics.get('avg_session_duration', 0)}s", '-', '-'],
        ]

        table = Table(data, colWidths=[120, 100, 100, 80])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor(self.primary_color)),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
            ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#F9FAFB')),
            ('BOX', (0, 0), (-1, -1), 1, colors.HexColor(self.primary_color)),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E5E7EB')),
        ]))

        return table

    def _create_downloads_table(self, downloads: Dict) -> Table:
        """Create downloads table"""

        ios_today = downloads.get('ios', {}).get('today', 0)
        ios_yesterday = downloads.get('ios', {}).get('yesterday', 0)
        android_today = downloads.get('android', {}).get('today', 0)
        android_yesterday = downloads.get('android', {}).get('yesterday', 0)

        data = [
            ['Platform', 'Today', 'Yesterday', 'Change'],
            ['iOS (iPhone)', str(ios_today), str(ios_yesterday),
             f"{round((ios_today-ios_yesterday)/ios_yesterday*100) if ios_yesterday > 0 else 0}%"],
            ['Android', str(android_today), str(android_yesterday),
             f"{round((android_today-android_yesterday)/android_yesterday*100) if android_yesterday > 0 else 0}%"],
            ['Total', str(downloads.get('today', 0)), str(downloads.get('yesterday', 0)),
             f"{downloads.get('change_percent', 0)}%"],
        ]

        table = Table(data, colWidths=[120, 100, 100, 80])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#10B981')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
            ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#F0FDF4')),
            ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#10B981')),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E5E7EB')),
        ]))

        return table

    def _create_clarity_table(self, clarity: Dict) -> Table:
        """Create clarity metrics table"""

        data = [
            ['Metric', 'Value', 'Status'],
            ['Engagement Score', f"{clarity.get('engagement_score', 0)}%",
             'Good' if clarity.get('engagement_score', 0) > 50 else 'Needs Improvement'],
            ['Frustration Score', f"{clarity.get('frustration_score', 0)}%",
             'Low' if clarity.get('frustration_score', 0) < 30 else 'High ⚠️'],
            ['Rage Clicks', str(clarity.get('rage_clicks', 0)),
             'Normal' if clarity.get('rage_clicks', 0) < 10 else 'High ⚠️'],
            ['Dead Clicks', str(clarity.get('dead_clicks', 0)),
             'Normal' if clarity.get('dead_clicks', 0) < 10 else 'High ⚠️'],
            ['Quick Backs', str(clarity.get('quick_backs', 0)), '-'],
        ]

        table = Table(data, colWidths=[150, 100, 150])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#EF4444')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
            ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#FEF2F2')),
            ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#EF4444')),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E5E7EB')),
        ]))

        return table

pdf_report_service = PDFReportService()
