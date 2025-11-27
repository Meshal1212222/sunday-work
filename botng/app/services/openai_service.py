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
                        "content": """أنت محلل بيانات خبير متخصص في تحليل سلوك المستخدمين.
                        مهمتك تقديم تقرير يومي موجز باللغة العربية.

                        التقرير يجب أن يفصل بوضوح بين:
                        1. الويب (Web) - زوار الموقع
                        2. التطبيق (App) - تحميلات iOS و Android
                        3. سلوك المستخدم من Clarity

                        استخدم الرموز التعبيرية بشكل مناسب.
                        اجعل التقرير مختصر ومفيد للإرسال عبر واتساب."""
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                max_tokens=1500,
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
قم بإنشاء تقرير يومي موجز يفصل بين الويب والتطبيق:

🌐 **الويب (Web) - Google Analytics:**
- الزوار اليوم: {analytics.get('total_users', 0)} ({'+' if users_change >= 0 else ''}{users_change}% عن الأمس)
- الزوار أمس: {analytics.get('yesterday_users', 0)}
- الجلسات: {analytics.get('sessions', 0)} ({'+' if sessions_change >= 0 else ''}{sessions_change}%)
- مشاهدات الصفحات: {analytics.get('page_views', 0)}
- معدل الارتداد: {analytics.get('bounce_rate', 0)}%
- متوسط مدة الجلسة: {analytics.get('avg_session_duration', 0)} ثانية
- الأجهزة: موبايل {analytics.get('devices', {}).get('mobile', 0)} | ديسكتوب {analytics.get('devices', {}).get('desktop', 0)}

📱 **التطبيق (App) - التحميلات:**
- إجمالي اليوم: {downloads.get('today', 0)} ({'+' if downloads_change >= 0 else ''}{downloads_change}%)
- إجمالي أمس: {downloads.get('yesterday', 0)}
- iOS اليوم: {ios_today} | أمس: {ios_yesterday}
- Android اليوم: {android_today} | أمس: {android_yesterday}

🔥 **سلوك المستخدم (Clarity):**
- درجة التفاعل: {clarity.get('engagement_score', 0)}%
- درجة الإحباط: {clarity.get('frustration_score', 0)}%
- نقاط الغضب: {clarity.get('rage_clicks', 0)}
- النقرات الميتة: {clarity.get('dead_clicks', 0)}
- الرجوع السريع: {clarity.get('quick_backs', 0)}

---

المطلوب:
1. **ملخص الويب** (نقطة واحدة)
2. **ملخص التطبيق** (نقطة واحدة)
3. **ملخص السلوك** (نقطة واحدة)
4. **أهم تغيير عن الأمس**

اكتب بشكل موجز جداً مناسب للواتساب.
"""

    def _get_fallback_analysis(
        self,
        analytics: Dict[str, Any],
        clarity: Dict[str, Any],
        downloads: Dict[str, Any]
    ) -> Dict[str, Any]:
        """تحليل بديل في حالة عدم توفر OpenAI"""

        users = analytics.get('total_users', 0)
        yesterday_users = analytics.get('yesterday_users', 0)
        users_change = analytics.get('users_change_percent', 0)

        sessions = analytics.get('sessions', 0)

        downloads_today = downloads.get('today', 0)
        downloads_yesterday = downloads.get('yesterday', 0)
        downloads_change = downloads.get('change_percent', 0)

        ios_today = downloads.get('ios', {}).get('today', 0)
        android_today = downloads.get('android', {}).get('today', 0)

        rage_clicks = clarity.get('rage_clicks', 0)
        engagement = clarity.get('engagement_score', 0)

        users_arrow = "↑" if users_change >= 0 else "↓"
        downloads_arrow = "↑" if downloads_change >= 0 else "↓"

        analysis_text = f"""📊 *تقرير اليوم - {datetime.now().strftime('%Y-%m-%d')}*

━━━━━━━━━━━━━━━━━━━━
🌐 *الويب (Web)*
━━━━━━━━━━━━━━━━━━━━
👥 الزوار: {users} ({users_arrow} {abs(users_change)}%)
📊 أمس: {yesterday_users}
🔄 الجلسات: {sessions}
📈 معدل الارتداد: {analytics.get('bounce_rate', 0)}%

━━━━━━━━━━━━━━━━━━━━
📱 *التطبيق (App)*
━━━━━━━━━━━━━━━━━━━━
📲 التحميلات: {downloads_today} ({downloads_arrow} {abs(downloads_change)}%)
📊 أمس: {downloads_yesterday}
🍎 iOS: {ios_today}
🤖 Android: {android_today}

━━━━━━━━━━━━━━━━━━━━
🔥 *سلوك المستخدم*
━━━━━━━━━━━━━━━━━━━━
🎯 التفاعل: {engagement}%
😤 نقاط الغضب: {rage_clicks}
🖱️ نقرات ميتة: {clarity.get('dead_clicks', 0)}

━━━━━━━━━━━━━━━━━━━━
📋 *الملخص*
━━━━━━━━━━━━━━━━━━━━
{"✅ الويب: زيادة في الزوار" if users_change > 0 else "⚠️ الويب: انخفاض في الزوار" if users_change < 0 else "➖ الويب: ثبات"}
{"✅ التطبيق: زيادة في التحميلات" if downloads_change > 0 else "⚠️ التطبيق: انخفاض في التحميلات" if downloads_change < 0 else "➖ التطبيق: ثبات"}
{"⚠️ تنبيه: نقاط غضب عالية!" if rage_clicks > 10 else "✅ السلوك: جيد"}"""

        return {
            "status": "fallback",
            "analysis": analysis_text.strip(),
            "generated_at": datetime.now().isoformat(),
            "model": "rule_based"
        }

openai_service = OpenAIService()
