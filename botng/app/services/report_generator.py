"""
Report Generator Service
أتمتة إحصائيات التحميل وسلوك المستخدم - قولدن هوست

التقرير يشمل:
- Google Analytics (الزوار، الجلسات، معدل الارتداد)
- Microsoft Clarity (سلوك المستخدم، نقاط الغضب)
- تحميلات التطبيق
- مقارنة بالأمس (النسب المئوية)
"""

from datetime import datetime
from typing import Dict, Any

from app.services.analytics_service import analytics_service
from app.services.clarity_service import clarity_service
from app.services.downloads_service import downloads_service
from app.services.openai_service import openai_service
from app.services.whatsapp_service import whatsapp_service


async def generate_daily_report() -> Dict[str, Any]:
    """توليد وإرسال التقرير اليومي"""

    print(f"🚀 بدء توليد التقرير اليومي - {datetime.now()}")

    try:
        # 1. جمع بيانات Google Analytics
        print("📊 جمع بيانات Google Analytics...")
        analytics_data = await analytics_service.get_daily_stats()

        # 2. جمع بيانات Clarity
        print("🔥 جمع بيانات Microsoft Clarity...")
        clarity_data = await clarity_service.get_daily_summary()

        # 3. جمع بيانات التحميلات
        print("📱 جمع بيانات التحميلات...")
        downloads_data = await downloads_service.get_today_downloads()

        # 4. تحليل البيانات بالذكاء الاصطناعي
        print("🤖 تحليل البيانات بـ OpenAI...")
        analysis = await openai_service.analyze_user_behavior(
            analytics_data,
            clarity_data,
            downloads_data
        )

        # 5. تنسيق التقرير لواتساب
        print("📝 تنسيق التقرير...")
        formatted_report = whatsapp_service.format_report_for_whatsapp(analysis)

        # 6. إرسال التقرير
        print("📱 إرسال عبر واتساب...")
        send_results = await whatsapp_service.send_daily_report(formatted_report)

        result = {
            "status": "success",
            "timestamp": datetime.now().isoformat(),
            "data_collected": {
                "analytics": bool(analytics_data),
                "clarity": bool(clarity_data),
                "downloads": bool(downloads_data)
            },
            "analysis_status": analysis.get("status"),
            "send_results": send_results,
            "report_preview": formatted_report[:500] + "..."
        }

        print(f"✅ تم إكمال التقرير اليومي - {datetime.now()}")
        return result

    except Exception as e:
        print(f"❌ خطأ في توليد التقرير: {e}")
        return {
            "status": "error",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }


async def generate_quick_report() -> Dict[str, Any]:
    """توليد تقرير سريع (بدون إرسال)"""

    analytics_data = await analytics_service.get_daily_stats()
    clarity_data = await clarity_service.get_daily_summary()
    downloads_data = await downloads_service.get_today_downloads()

    analysis = await openai_service.analyze_user_behavior(
        analytics_data,
        clarity_data,
        downloads_data
    )

    return {
        "raw_data": {
            "analytics": analytics_data,
            "clarity": clarity_data,
            "downloads": downloads_data
        },
        "analysis": analysis,
        "generated_at": datetime.now().isoformat()
    }


async def get_comparison_summary() -> Dict[str, Any]:
    """ملخص المقارنة مع الأمس"""

    analytics = await analytics_service.get_daily_stats()
    downloads = await downloads_service.get_today_downloads()

    return {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "users": {
            "today": analytics.get("total_users", 0),
            "yesterday": analytics.get("yesterday_users", 0),
            "change": f"{analytics.get('users_change_percent', 0)}%"
        },
        "sessions": {
            "today": analytics.get("sessions", 0),
            "yesterday": analytics.get("yesterday_sessions", 0),
            "change": f"{analytics.get('sessions_change_percent', 0)}%"
        },
        "downloads": {
            "today": downloads.get("today", 0),
            "yesterday": downloads.get("yesterday", 0),
            "change": f"{downloads.get('change_percent', 0)}%"
        }
    }
