from datetime import datetime, date, timedelta
from typing import Dict, Any, List, Callable
import asyncio

from ..collectors.firebase_collector import FirebaseCollector
from ..collectors.google_analytics import GoogleAnalyticsCollector
from ..collectors.crashes_collector import CrashesCollector
from ..integrations.ultramsg import UltraMsgClient
from ..analyzers.openai_analyzer import OpenAIAnalyzer
from ..config import settings


class AutomationTriggers:
    """نظام الأتمتة والتريقرات"""

    def __init__(self):
        self.firebase = FirebaseCollector()
        self.whatsapp = UltraMsgClient()
        self.ai = OpenAIAnalyzer()
        self.crashes = CrashesCollector()
        self.triggers: List[Dict] = []

    # ==================== Trigger Definitions ====================

    async def check_new_reports(self) -> List[Dict]:
        """تريقر: بلاغ جديد"""
        reports = await self.firebase.get_reports(10)
        # Check for new reports in last 5 minutes
        now = datetime.now()
        new_reports = []
        for report in reports:
            report_time = datetime.fromisoformat(report.get('date', ''))
            if (now - report_time).total_seconds() < 300:  # 5 minutes
                new_reports.append(report)
        return new_reports

    async def check_high_refunds(self, threshold: float = 1000) -> List[Dict]:
        """تريقر: استرداد عالي القيمة"""
        refunds = await self.firebase.get_refunds(20)
        return [r for r in refunds if float(r.get('amount', 0)) >= threshold]

    async def check_overdue_tasks(self) -> List[Dict]:
        """تريقر: مهام متأخرة"""
        return await self.firebase.get_overdue_tasks()

    async def check_visitor_spike(self, threshold_percent: float = 20) -> Dict:
        """تريقر: زيادة مفاجئة في الزوار"""
        try:
            ga = GoogleAnalyticsCollector()
            comparison = await ga.collect_comparison()
            if comparison.get('status') == 'success':
                change = comparison['data']['changes'].get('active_users', 0)
                if change >= threshold_percent:
                    return {
                        'triggered': True,
                        'change': change,
                        'data': comparison['data']
                    }
        except:
            pass
        return {'triggered': False}

    async def check_low_response_rate(self, threshold: float = 80) -> Dict:
        """تريقر: انخفاض معدل الرد"""
        conversations = await self.firebase.get_conversations(100)
        if not conversations:
            return {'triggered': False}

        today = date.today().isoformat()
        today_convs = [c for c in conversations if c.get('date', '').startswith(today)]

        if not today_convs:
            return {'triggered': False}

        responded = len([c for c in today_convs if c.get('status') == 'responded'])
        rate = (responded / len(today_convs)) * 100

        if rate < threshold:
            return {
                'triggered': True,
                'rate': rate,
                'total': len(today_convs),
                'responded': responded
            }
        return {'triggered': False}

    async def check_app_crashes(self, threshold: int = 5) -> Dict:
        """تريقر: crashes في التطبيق (للتقرير اليومي)"""
        try:
            crash_data = await self.crashes.get_crashes_count()
            if crash_data.get("status") == "success":
                total = crash_data.get("total_crashes", 0)
                if total >= threshold:
                    return {
                        'triggered': True,
                        'crashes': total,
                        'details': crash_data.get("details", [])
                    }
        except Exception as e:
            print(f"Crash check error: {e}")
        return {'triggered': False}

    async def check_realtime_crashes(self) -> Dict:
        """تريقر: crashes جديدة في الوقت الفعلي - تنبيه فوري"""
        try:
            new_crash_data = await self.crashes.check_new_crashes()
            if new_crash_data.get("has_new"):
                return {
                    'triggered': True,
                    'new_count': new_crash_data.get("new_count", 0),
                    'total': new_crash_data.get("total", 0),
                    'details': new_crash_data.get("details", []),
                    'timestamp': new_crash_data.get("timestamp")
                }
        except Exception as e:
            print(f"Realtime crash check error: {e}")
        return {'triggered': False}

    # ==================== Actions ====================

    async def send_alert(self, message: str, priority: str = "normal"):
        """إرسال تنبيه للقروب"""
        emoji = "🔴" if priority == "high" else "🟡" if priority == "medium" else "🟢"

        alert_message = f"""{emoji} *تنبيه Botng*

{message}

⏰ {datetime.now().strftime('%Y-%m-%d %H:%M')}
━━━━━━━━━━━━━━━
_شركة ليفل أب القابضة_"""

        await self.whatsapp.send_message(settings.report_group_id, alert_message)

    async def send_crash_alert(self, message: str):
        """إرسال تنبيه Crashes للأرقام الخاصة (ليس للقروب)"""
        alert_message = f"""🚨 *تنبيه Crashes - سري*

{message}

⏰ {datetime.now().strftime('%Y-%m-%d %H:%M')}
━━━━━━━━━━━━━━━
_شركة ليفل أب القابضة_"""

        # إرسال لكل رقم خاص
        recipients = settings.crash_alert_recipients.split(",")
        for recipient in recipients:
            recipient = recipient.strip()
            if recipient:
                await self.whatsapp.send_message(recipient, alert_message)

    async def create_task_from_report(self, report: Dict) -> str:
        """إنشاء مهمة من بلاغ"""
        task = {
            'title': f"متابعة بلاغ: {report.get('subject', 'بدون عنوان')}",
            'description': report.get('description', ''),
            'status': 'pending',
            'priority': 'high',
            'source': 'golden_host_report',
            'sourceId': report.get('id'),
            'createdAt': datetime.now().isoformat(),
            'dueDate': (date.today() + timedelta(days=1)).isoformat()
        }
        return await self.firebase.add_task('main', task)

    async def analyze_and_alert(self, data: Dict, context: str):
        """تحليل بالـ AI وإرسال تنبيه"""
        analysis = await self.ai.analyze_data(data, context)
        await self.send_alert(analysis, priority="medium")

    # ==================== Automation Runner ====================

    async def run_all_checks(self):
        """تشغيل كل التريقرات"""
        results = []

        # Check overdue tasks
        overdue = await self.check_overdue_tasks()
        if overdue:
            results.append({
                'trigger': 'overdue_tasks',
                'count': len(overdue),
                'data': overdue
            })
            await self.send_alert(
                f"⚠️ يوجد *{len(overdue)}* مهام متأخرة!\n\nالمهام:\n" +
                "\n".join([f"• {t.get('title', 'بدون عنوان')}" for t in overdue[:5]]),
                priority="high"
            )

        # Check visitor spike
        spike = await self.check_visitor_spike()
        if spike.get('triggered'):
            results.append({
                'trigger': 'visitor_spike',
                'change': spike['change']
            })
            await self.send_alert(
                f"📈 زيادة في الزوار بنسبة *{spike['change']:.1f}%*!",
                priority="medium"
            )

        # Check response rate
        response = await self.check_low_response_rate()
        if response.get('triggered'):
            results.append({
                'trigger': 'low_response_rate',
                'rate': response['rate']
            })
            await self.send_alert(
                f"⚠️ معدل الرد منخفض: *{response['rate']:.1f}%*\n"
                f"الإجمالي: {response['total']} | تم الرد: {response['responded']}",
                priority="high"
            )

        # Check realtime crashes - فحص لحظي وإرسال للأرقام الخاصة
        realtime_crashes = await self.check_realtime_crashes()
        if realtime_crashes.get('triggered'):
            results.append({
                'trigger': 'realtime_crashes',
                'new_count': realtime_crashes['new_count'],
                'total': realtime_crashes['total']
            })
            # تفاصيل الـ crashes الجديدة
            details_text = "*🆕 Crashes جديدة:*"
            for detail in realtime_crashes.get('details', [])[:5]:
                screen = detail.get('screen', detail.get('page', 'N/A'))
                platform = detail.get('platform', '')
                version = detail.get('version', '')
                count = detail.get('count', 0)

                # تقصير اسم الشاشة إذا طويل
                if len(screen) > 30:
                    screen = "..." + screen[-27:]

                platform_emoji = "🍎" if "ios" in platform.lower() else "🤖" if "android" in platform.lower() else "🌐"
                details_text += f"\n{platform_emoji} {screen} ({count}x)"
                if version and version != "N/A":
                    details_text += f" v{version}"

            await self.send_crash_alert(
                f"🚨 *Crash جديد الآن!*\n\n"
                f"{details_text}\n\n"
                f"الإجمالي: *{realtime_crashes['total']}* crashes"
            )

        return results


class AutomationScheduler:
    """جدولة الأتمتة - مراقبة لحظية"""

    def __init__(self):
        self.triggers = AutomationTriggers()
        self.running = False

    async def start(self):
        """بدء المراقبة اللحظية"""
        self.running = True
        print("🔴 بدء المراقبة اللحظية للـ Crashes...")
        while self.running:
            await self.triggers.run_all_checks()
            await asyncio.sleep(60)  # فحص كل دقيقة للتنبيهات الفورية

    def stop(self):
        """إيقاف المراقبة"""
        self.running = False
        print("⏹️ تم إيقاف المراقبة")
