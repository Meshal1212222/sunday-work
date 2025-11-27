from openai import AsyncOpenAI
from typing import Dict, Any, Optional
from ..config import settings


class OpenAIAnalyzer:
    """محلل البيانات باستخدام OpenAI"""

    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.openai_api_key)
        self.model = settings.openai_model

    async def analyze_data(self, data: Dict[str, Any], analysis_type: str = "daily") -> str:
        """تحليل البيانات وإنشاء تقرير"""

        system_prompt = """أنت محلل بيانات ذكي لشركة ليفل أب القابضة.
        مهمتك تحليل البيانات المقدمة وإنشاء تقرير واضح ومفيد باللغة العربية.

        التقرير يجب أن يكون:
        - مختصر ومباشر
        - يحتوي على أرقام واضحة
        - يقدم توصيات عملية
        - مناسب للإرسال عبر واتساب (استخدم الإيموجي بشكل معتدل)
        """

        if analysis_type == "daily":
            user_prompt = f"""حلل البيانات التالية وأنشئ تقرير يومي:

البيانات:
{data}

المطلوب:
1. ملخص الأداء اليومي
2. أهم الأرقام والإحصائيات
3. مقارنة بالأمس إن وجدت
4. توصيات سريعة
"""
        elif analysis_type == "weekly":
            user_prompt = f"""حلل البيانات التالية وأنشئ تقرير أسبوعي:

البيانات:
{data}

المطلوب:
1. ملخص الأسبوع
2. الاتجاهات والأنماط
3. أفضل وأسوأ الأيام
4. توصيات للأسبوع القادم
"""
        elif analysis_type == "callcenter":
            user_prompt = f"""حلل بيانات الكول سنتر التالية:

البيانات:
{data}

المطلوب:
1. إجمالي المكالمات
2. نسبة الرد
3. متوسط وقت الانتظار
4. أداء الموظفين
5. توصيات لتحسين الأداء
"""
        elif analysis_type == "visitors":
            user_prompt = f"""حلل بيانات الزوار التالية:

البيانات:
{data}

المطلوب:
1. عدد الزوار
2. أكثر الصفحات زيارة
3. مدة الجلسة
4. معدل الارتداد
5. توصيات لتحسين التفاعل
"""
        else:
            user_prompt = f"""حلل البيانات التالية:

{data}

قدم ملخص واضح مع أهم النقاط والتوصيات.
"""

        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=1500
        )

        return response.choices[0].message.content

    async def process_command(self, command: str, context: Optional[Dict] = None) -> str:
        """معالجة أوامر المستخدم"""

        system_prompt = """أنت مساعد ذكي لنظام التقارير.
        مهمتك فهم طلب المستخدم وتحديد نوع التقرير أو المعلومات المطلوبة.

        الأوامر المتاحة:
        - تقرير: تقرير اليوم الكامل
        - كول سنتر: تقرير المكالمات
        - زوار: تقرير Clarity للزوار
        - مقارنة: مقارنة بالأمس

        إذا كان الطلب غير واضح، اسأل للتوضيح.
        """

        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": command}
            ],
            temperature=0.3,
            max_tokens=500
        )

        return response.choices[0].message.content

    async def compare_data(self, today_data: Dict, yesterday_data: Dict) -> str:
        """مقارنة بيانات اليوم بالأمس"""

        prompt = f"""قارن بين بيانات اليوم والأمس:

اليوم:
{today_data}

الأمس:
{yesterday_data}

قدم:
1. نسبة التغيير لكل مقياس
2. هل هناك تحسن أم تراجع
3. أبرز الملاحظات
"""

        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "أنت محلل بيانات. قدم مقارنة واضحة ومختصرة."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=800
        )

        return response.choices[0].message.content
