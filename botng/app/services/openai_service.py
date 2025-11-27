"""
OpenAI Service
تحليل البيانات باستخدام الذكاء الاصطناعي
أتمتة إحصائيات التحميل وسلوك المستخدم - قولدن هوست
"""

import os
from datetime import datetime
from typing import Dict, Any
from openai import AsyncOpenAI

class OpenAIService:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY", "")
        self.client = AsyncOpenAI(api_key=self.api_key) if self.api_key else None
        self.model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

    async def analyze_user_behavior(
        self,
        analytics_data: Dict[str, Any],
        clarity_data: Dict[str, Any],
        downloads_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """تحليل شامل لسلوك المستخدم"""

        if not self.client:
            return self._get_fallback_analysis(analytics_data, clarity_data, downloads_data)

        prompt = self._build_analysis_prompt(analytics_data, clarity_data, downloads_data)

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": """أنت محلل بيانات خبير. اكتب تقرير يومي احترافي وأنيق باللغة العربية.

مهم جداً: أضف شرح مختصر لكل مصطلح بين قوسين حتى يفهم القارئ.

مثال:
- الجلسات (عدد الزيارات): 234
- المشاهدات (عدد الصفحات المفتوحة): 890
- معدل الارتداد (نسبة الخروج السريع): 42%

استخدم تنسيق واتساب الاحترافي واجعل التقرير واضح ومفهوم للجميع."""
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                max_tokens=2500,
                temperature=0.7
            )

            analysis_text = response.choices[0].message.content

            return {
                "status": "success",
                "analysis": analysis_text,
                "generated_at": datetime.now().isoformat(),
                "model": self.model
            }

        except Exception as e:
            print(f"❌ OpenAI Error: {e}")
            return self._get_fallback_analysis(analytics_data, clarity_data, downloads_data)

    def _build_analysis_prompt(
        self,
        analytics: Dict[str, Any],
        clarity: Dict[str, Any],
        downloads: Dict[str, Any]
    ) -> str:
        """بناء prompt التحليل"""

        users_change = analytics.get('users_change_percent', 0)
        sessions_change = analytics.get('sessions_change_percent', 0)
        downloads_change = downloads.get('change_percent', 0)

        ios_today = downloads.get('ios', {}).get('today', 0)
        ios_yesterday = downloads.get('ios', {}).get('yesterday', 0)
        android_today = downloads.get('android', {}).get('today', 0)
        android_yesterday = downloads.get('android', {}).get('yesterday', 0)

        return f"""
اكتب تقرير يومي احترافي لقولدن هوست مع شرح كل مصطلح:

بيانات الويب (Google Analytics):
- الزوار: {analytics.get('total_users', 0)} (أمس: {analytics.get('yesterday_users', 0)}) تغيير: {users_change}%
- الجلسات: {analytics.get('sessions', 0)}
- مشاهدات الصفحات: {analytics.get('page_views', 0)}
- معدل الارتداد: {analytics.get('bounce_rate', 0)}%
- متوسط الجلسة: {analytics.get('avg_session_duration', 0)} ثانية
- موبايل: {analytics.get('devices', {}).get('mobile', 0)}
- ديسكتوب: {analytics.get('devices', {}).get('desktop', 0)}

بيانات التطبيق:
- تحميلات اليوم: {downloads.get('today', 0)} (أمس: {downloads.get('yesterday', 0)}) تغيير: {downloads_change}%
- iOS: {ios_today} (أمس: {ios_yesterday})
- Android: {android_today} (أمس: {android_yesterday})

بيانات Clarity:
- درجة التفاعل: {clarity.get('engagement_score', 0)}%
- درجة الإحباط: {clarity.get('frustration_score', 0)}%
- نقاط الغضب: {clarity.get('rage_clicks', 0)}
- النقرات الميتة: {clarity.get('dead_clicks', 0)}
- الرجوع السريع: {clarity.get('quick_backs', 0)}

اكتب تقرير احترافي يشرح كل مصطلح بين قوسين.
"""

    def _get_fallback_analysis(
        self,
        analytics: Dict[str, Any],
        clarity: Dict[str, Any],
        downloads: Dict[str, Any]
    ) -> Dict[str, Any]:
        """تقرير احترافي بديل مع شرح المصطلحات"""

        users = analytics.get('total_users', 0)
        yesterday_users = analytics.get('yesterday_users', 0)
        users_change = analytics.get('users_change_percent', 0)
        sessions = analytics.get('sessions', 0)
        page_views = analytics.get('page_views', 0)
        bounce_rate = analytics.get('bounce_rate', 0)
        avg_duration = analytics.get('avg_session_duration', 0)
        mobile = analytics.get('devices', {}).get('mobile', 0)
        desktop = analytics.get('devices', {}).get('desktop', 0)

        downloads_today = downloads.get('today', 0)
        downloads_yesterday = downloads.get('yesterday', 0)
        downloads_change = downloads.get('change_percent', 0)
        ios_today = downloads.get('ios', {}).get('today', 0)
        ios_yesterday = downloads.get('ios', {}).get('yesterday', 0)
        android_today = downloads.get('android', {}).get('today', 0)
        android_yesterday = downloads.get('android', {}).get('yesterday', 0)

        engagement = clarity.get('engagement_score', 0)
        frustration = clarity.get('frustration_score', 0)
        rage_clicks = clarity.get('rage_clicks', 0)
        dead_clicks = clarity.get('dead_clicks', 0)
        quick_backs = clarity.get('quick_backs', 0)

        # Indicators
        users_indicator = "🟢 +" if users_change > 0 else "🔴 " if users_change < 0 else "⚪ "
        downloads_indicator = "🟢 +" if downloads_change > 0 else "🔴 " if downloads_change < 0 else "⚪ "

        # Pages per session
        pages_per_session = round(page_views / sessions, 1) if sessions > 0 else 0

        date_str = datetime.now().strftime('%Y/%m/%d')
        day_name = ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"][datetime.now().weekday()]

        # Bounce rate status
        bounce_status = "ممتاز" if bounce_rate < 40 else "جيد" if bounce_rate < 55 else "يحتاج تحسين"
        engagement_status = "ممتاز" if engagement > 70 else "جيد" if engagement > 50 else "يحتاج تحسين"

        analysis_text = f"""
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  📊  *تقرير قولدن هوست اليومي*
┃  📅  {date_str} • {day_name}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛



🌐  *الموقع الإلكتروني (Web)*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👥  *الزوار* _(عدد الأشخاص الذين دخلوا الموقع)_
     اليوم: *{users:,}*  │  أمس: {yesterday_users:,}
     التغيير: {users_indicator}{abs(users_change)}%

🔄  *الجلسات* _(عدد مرات الدخول للموقع)_
     *{sessions:,}* جلسة

📄  *المشاهدات* _(عدد الصفحات التي تم فتحها)_
     *{page_views:,}* صفحة
     معدل: *{pages_per_session}* صفحة لكل زيارة

⏱️  *متوسط الجلسة* _(كم يقضي الزائر في الموقع)_
     *{avg_duration}* ثانية ({round(avg_duration/60, 1)} دقيقة)

📊  *معدل الارتداد* _(نسبة من يخرج بدون تصفح)_
     *{bounce_rate}%* - {bounce_status}

🖥️  *الأجهزة* _(من أين يدخلون)_
     📱 موبايل: {mobile} ({round(mobile/(mobile+desktop)*100) if mobile+desktop > 0 else 0}%)
     💻 ديسكتوب: {desktop} ({round(desktop/(mobile+desktop)*100) if mobile+desktop > 0 else 0}%)



📱  *تحميلات التطبيق (App)*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📲  *إجمالي التحميلات* _(عدد من حمّل التطبيق)_
     اليوم: *{downloads_today}*  │  أمس: {downloads_yesterday}
     التغيير: {downloads_indicator}{abs(downloads_change)}%

🍎  *iOS* _(أجهزة آيفون)_
     اليوم: *{ios_today}*  │  أمس: {ios_yesterday}

🤖  *Android* _(أجهزة أندرويد)_
     اليوم: *{android_today}*  │  أمس: {android_yesterday}



🔥  *سلوك المستخدم (Clarity)*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯  *درجة التفاعل* _(مدى تفاعل الزوار مع المحتوى)_
     *{engagement}%* - {engagement_status}

😤  *درجة الإحباط* _(مؤشر صعوبة الاستخدام)_
     *{frustration}%*

⚡  *نقاط الغضب* _(نقرات متكررة من إحباط المستخدم)_
     *{rage_clicks}* {"⚠️ عالي" if rage_clicks > 10 else "✅ طبيعي"}

🖱️  *النقرات الميتة* _(نقر على عناصر غير قابلة للنقر)_
     *{dead_clicks}* {"⚠️ كثير" if dead_clicks > 10 else "✅ طبيعي"}

↩️  *الرجوع السريع* _(خروج سريع بعد الدخول)_
     *{quick_backs}* مرة



📋  *الملخص التنفيذي*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{"✅  الموقع: زيادة " + str(abs(users_change)) + "% في الزوار" if users_change > 0 else "⚠️  الموقع: انخفاض " + str(abs(users_change)) + "% في الزوار" if users_change < 0 else "➖  الموقع: ثبات في الزوار"}

{"✅  التطبيق: زيادة " + str(abs(downloads_change)) + "% في التحميلات" if downloads_change > 0 else "⚠️  التطبيق: انخفاض " + str(abs(downloads_change)) + "% في التحميلات" if downloads_change < 0 else "➖  التطبيق: ثبات في التحميلات"}

{"⚠️  تنبيه: نقاط غضب عالية - راجع تجربة المستخدم" if rage_clicks > 10 else "✅  تجربة المستخدم: جيدة"}

{"⚠️  معدل الارتداد مرتفع - حسّن المحتوى" if bounce_rate > 55 else ""}


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  🤖  Botng • Level Up Holding
┃  ⏰  التقرير اليومي - 9:00 صباحاً
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"""

        return {
            "status": "fallback",
            "analysis": analysis_text.strip(),
            "generated_at": datetime.now().isoformat(),
            "model": "professional_template"
        }

openai_service = OpenAIService()
