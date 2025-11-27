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

استخدم تنسيق واتساب الاحترافي:
- استخدم *نص* للعناوين
- استخدم الأرقام بشكل واضح
- اجعل التقرير مرتب ومنظم
- استخدم الإيموجي بشكل معتدل واحترافي

التقرير يجب أن يكون:
1. أنيق وسهل القراءة
2. يفصل بين الويب والتطبيق
3. يوضح التغييرات عن الأمس بالنسب
4. يعطي ملخص تنفيذي في النهاية"""
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                max_tokens=2000,
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
اكتب تقرير يومي احترافي لقولدن هوست:

بيانات الويب (Google Analytics):
- الزوار اليوم: {analytics.get('total_users', 0)}
- الزوار أمس: {analytics.get('yesterday_users', 0)}
- نسبة التغيير: {users_change}%
- الجلسات: {analytics.get('sessions', 0)}
- مشاهدات الصفحات: {analytics.get('page_views', 0)}
- معدل الارتداد: {analytics.get('bounce_rate', 0)}%
- متوسط الجلسة: {analytics.get('avg_session_duration', 0)} ثانية
- موبايل: {analytics.get('devices', {}).get('mobile', 0)}
- ديسكتوب: {analytics.get('devices', {}).get('desktop', 0)}

بيانات التطبيق (App Downloads):
- إجمالي اليوم: {downloads.get('today', 0)}
- إجمالي أمس: {downloads.get('yesterday', 0)}
- نسبة التغيير: {downloads_change}%
- iOS اليوم: {ios_today}
- iOS أمس: {ios_yesterday}
- Android اليوم: {android_today}
- Android أمس: {android_yesterday}

بيانات سلوك المستخدم (Clarity):
- درجة التفاعل: {clarity.get('engagement_score', 0)}%
- درجة الإحباط: {clarity.get('frustration_score', 0)}%
- نقاط الغضب: {clarity.get('rage_clicks', 0)}
- النقرات الميتة: {clarity.get('dead_clicks', 0)}
- الرجوع السريع: {clarity.get('quick_backs', 0)}
- عمق التمرير 50%: {clarity.get('scroll_depth', {}).get('50%', 0)}

اكتب تقرير احترافي يتضمن:
1. عنوان مع التاريخ
2. قسم الويب مع الأرقام والمقارنة
3. قسم التطبيق مع iOS و Android
4. قسم سلوك المستخدم
5. ملخص تنفيذي (3 نقاط رئيسية)
"""

    def _get_fallback_analysis(
        self,
        analytics: Dict[str, Any],
        clarity: Dict[str, Any],
        downloads: Dict[str, Any]
    ) -> Dict[str, Any]:
        """تقرير احترافي بديل"""

        users = analytics.get('total_users', 0)
        yesterday_users = analytics.get('yesterday_users', 0)
        users_change = analytics.get('users_change_percent', 0)
        sessions = analytics.get('sessions', 0)
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

        # Arrows
        users_indicator = "🟢 +" if users_change > 0 else "🔴 " if users_change < 0 else "⚪ "
        downloads_indicator = "🟢 +" if downloads_change > 0 else "🔴 " if downloads_change < 0 else "⚪ "

        # Calculate iOS and Android changes
        ios_change = round(((ios_today - ios_yesterday) / ios_yesterday * 100) if ios_yesterday > 0 else 0, 1)
        android_change = round(((android_today - android_yesterday) / android_yesterday * 100) if android_yesterday > 0 else 0, 1)

        date_str = datetime.now().strftime('%Y/%m/%d')
        day_name = ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"][datetime.now().weekday()]

        analysis_text = f"""
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  📊  *تقرير قولدن هوست اليومي*
┃  📅  {date_str} • {day_name}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


🌐  *أداء الموقع (Web)*
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
│  👥  الزوار
│      • اليوم: *{users:,}*
│      • أمس: {yesterday_users:,}
│      • التغيير: {users_indicator}{abs(users_change)}%
│
│  📱  الجلسات: *{sessions:,}*
│  📄  المشاهدات: *{analytics.get('page_views', 0):,}*
│  ⏱️  متوسط الجلسة: *{avg_duration}* ثانية
│  📊  معدل الارتداد: *{bounce_rate}%*
│
│  🖥️  الأجهزة
│      • موبايل: {mobile} ({round(mobile/(mobile+desktop)*100) if mobile+desktop > 0 else 0}%)
│      • ديسكتوب: {desktop} ({round(desktop/(mobile+desktop)*100) if mobile+desktop > 0 else 0}%)


📱  *تحميلات التطبيق (App)*
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
│  📲  الإجمالي
│      • اليوم: *{downloads_today}*
│      • أمس: {downloads_yesterday}
│      • التغيير: {downloads_indicator}{abs(downloads_change)}%
│
│  🍎  iOS: *{ios_today}* (أمس: {ios_yesterday})
│  🤖  Android: *{android_today}* (أمس: {android_yesterday})


🔥  *سلوك المستخدم (Clarity)*
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
│  🎯  التفاعل: *{engagement}%*
│  😤  الإحباط: *{frustration}%*
│  ⚡  نقاط الغضب: *{rage_clicks}*
│  🖱️  نقرات ميتة: *{dead_clicks}*


📋  *الملخص التنفيذي*
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
{"│  ✅  زيادة في زوار الموقع بنسبة " + str(abs(users_change)) + "%" if users_change > 0 else "│  ⚠️  انخفاض في زوار الموقع بنسبة " + str(abs(users_change)) + "%" if users_change < 0 else "│  ➖  ثبات في زوار الموقع"}
{"│  ✅  زيادة في تحميلات التطبيق بنسبة " + str(abs(downloads_change)) + "%" if downloads_change > 0 else "│  ⚠️  انخفاض في تحميلات التطبيق بنسبة " + str(abs(downloads_change)) + "%" if downloads_change < 0 else "│  ➖  ثبات في تحميلات التطبيق"}
{"│  ⚠️  تنبيه: نقاط غضب عالية تحتاج مراجعة" if rage_clicks > 10 else "│  ✅  تجربة المستخدم جيدة"}

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  🤖 Botng • Level Up Holding
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"""

        return {
            "status": "fallback",
            "analysis": analysis_text.strip(),
            "generated_at": datetime.now().isoformat(),
            "model": "professional_template"
        }

openai_service = OpenAIService()
