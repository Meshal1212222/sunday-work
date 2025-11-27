"""
OpenAI Service
تحليل البيانات باستخدام الذكاء الاصطناعي
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

                        التقرير يجب أن يتضمن:
                        1. ملخص الأرقام الرئيسية
                        2. المقارنة مع الأمس (بالنسب المئوية ↑ أو ↓)
                        3. أهم التغييرات والملاحظات

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

        # Calculate changes
        users_change = analytics.get('users_change_percent', 0)
        sessions_change = analytics.get('sessions_change_percent', 0)
        downloads_change = downloads.get('change_percent', 0)

        return f"""
قم بإنشاء تقرير يومي موجز:

📊 **Google Analytics - اليوم:**
- المستخدمون: {analytics.get('total_users', 0)} ({'+' if users_change >= 0 else ''}{users_change}% عن الأمس)
- الجلسات: {analytics.get('sessions', 0)} ({'+' if sessions_change >= 0 else ''}{sessions_change}% عن الأمس)
- مشاهدات الصفحات: {analytics.get('page_views', 0)}
- متوسط مدة الجلسة: {analytics.get('avg_session_duration', 0)} ثانية
- معدل الارتداد: {analytics.get('bounce_rate', 0)}%
- المستخدمون الجدد: {analytics.get('new_users', 0)}
- أعلى الصفحات: {', '.join(analytics.get('top_pages', [])[:3])}

📊 **أمس للمقارنة:**
- المستخدمون أمس: {analytics.get('yesterday_users', 0)}
- الجلسات أمس: {analytics.get('yesterday_sessions', 0)}

🔥 **Microsoft Clarity:**
- نقاط الغضب (Rage Clicks): {clarity.get('rage_clicks', 0)}
- النقرات الميتة (Dead Clicks): {clarity.get('dead_clicks', 0)}
- الرجوع السريع: {clarity.get('quick_backs', 0)}
- درجة التفاعل: {clarity.get('engagement_score', 0)}%
- درجة الإحباط: {clarity.get('frustration_score', 0)}%
- عمق التمرير 50%+: {clarity.get('scroll_depth', {}).get('50%', 0)} مستخدم

📱 **تحميلات التطبيق:**
- تحميلات اليوم: {downloads.get('today', 0)}
- تحميلات أمس: {downloads.get('yesterday', 0)}
- التغيير: {'+' if downloads_change >= 0 else ''}{downloads_change}%

---

المطلوب:
1. **ملخص سريع** (3 نقاط رئيسية)
2. **ماذا تغير عن الأمس؟** (أهم التغييرات بالنسب)
3. **ملاحظة مهمة** (إن وجدت)

اكتب التقرير بشكل موجز جداً مناسب للواتساب.
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
        sessions_change = analytics.get('sessions_change_percent', 0)

        downloads_today = downloads.get('today', 0)
        downloads_change = downloads.get('change_percent', 0)

        rage_clicks = clarity.get('rage_clicks', 0)
        engagement = clarity.get('engagement_score', 0)

        # Build report
        users_arrow = "↑" if users_change >= 0 else "↓"
        sessions_arrow = "↑" if sessions_change >= 0 else "↓"
        downloads_arrow = "↑" if downloads_change >= 0 else "↓"

        analysis_text = f"""📊 *تقرير اليوم - {datetime.now().strftime('%Y-%m-%d')}*

*Google Analytics:*
👥 المستخدمون: {users} ({users_arrow} {abs(users_change)}%)
📱 الجلسات: {sessions} ({sessions_arrow} {abs(sessions_change)}%)
📈 معدل الارتداد: {analytics.get('bounce_rate', 0)}%

*Clarity:*
🎯 درجة التفاعل: {engagement}%
😤 نقاط الغضب: {rage_clicks}
🖱️ النقرات الميتة: {clarity.get('dead_clicks', 0)}

*التحميلات:*
📲 اليوم: {downloads_today} ({downloads_arrow} {abs(downloads_change)}%)

*مقارنة بالأمس:*
{"✅ زيادة في الزوار" if users_change > 0 else "⚠️ انخفاض في الزوار" if users_change < 0 else "➖ ثبات في الزوار"}
{"✅ زيادة في التحميلات" if downloads_change > 0 else "⚠️ انخفاض في التحميلات" if downloads_change < 0 else "➖ ثبات في التحميلات"}
{"⚠️ نقاط غضب عالية - راجع Clarity" if rage_clicks > 10 else ""}"""

        return {
            "status": "fallback",
            "analysis": analysis_text.strip(),
            "generated_at": datetime.now().isoformat(),
            "model": "rule_based"
        }

openai_service = OpenAIService()
