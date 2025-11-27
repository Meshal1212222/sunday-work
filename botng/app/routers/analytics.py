"""
Analytics Router
API endpoints للتحليلات
"""

from fastapi import APIRouter, Query
from datetime import datetime

from app.services.analytics_service import analytics_service
from app.services.clarity_service import clarity_service
from app.services.openai_service import openai_service
from app.services.firebase_service import firebase_service

router = APIRouter()


@router.get("/google")
async def get_google_analytics(days: int = Query(default=1, le=30)):
    """بيانات Google Analytics"""

    data = await analytics_service.get_daily_stats(days)

    return {
        "status": "success",
        "source": "google_analytics",
        "period_days": days,
        "data": data,
        "timestamp": datetime.now().isoformat()
    }


@router.get("/clarity")
async def get_clarity_data():
    """بيانات Microsoft Clarity"""

    data = await clarity_service.get_daily_summary()

    return {
        "status": "success",
        "source": "microsoft_clarity",
        "data": data,
        "timestamp": datetime.now().isoformat()
    }


@router.get("/behavior")
async def get_user_behavior():
    """تحليل سلوك المستخدم"""

    ga_behavior = await analytics_service.get_user_behavior()
    clarity_insights = await clarity_service.get_user_insights()

    return {
        "status": "success",
        "google_analytics": ga_behavior,
        "clarity": clarity_insights,
        "timestamp": datetime.now().isoformat()
    }


@router.get("/heatmaps")
async def get_heatmaps():
    """بيانات الخرائط الحرارية"""

    data = await clarity_service.get_heatmap_data()

    return {
        "status": "success",
        "source": "clarity_heatmaps",
        "data": data,
        "timestamp": datetime.now().isoformat()
    }


@router.get("/sessions")
async def get_sessions():
    """تسجيلات الجلسات"""

    recordings = await clarity_service.get_session_recordings()

    return {
        "status": "success",
        "source": "clarity_recordings",
        "count": len(recordings),
        "recordings": recordings,
        "timestamp": datetime.now().isoformat()
    }


@router.post("/analyze")
async def analyze_data():
    """تحليل شامل بالذكاء الاصطناعي"""

    # Collect all data
    analytics_data = await analytics_service.get_daily_stats()
    clarity_data = await clarity_service.get_daily_summary()
    firebase_data = await firebase_service.get_all_stats()

    # Analyze with OpenAI
    analysis = await openai_service.analyze_user_behavior(
        analytics_data,
        clarity_data,
        firebase_data
    )

    return {
        "status": "success",
        "analysis": analysis,
        "data_sources": ["google_analytics", "microsoft_clarity", "firebase"],
        "timestamp": datetime.now().isoformat()
    }


@router.get("/summary")
async def get_summary():
    """ملخص سريع للتحليلات"""

    analytics = await analytics_service.get_daily_stats()
    clarity = await clarity_service.get_user_insights()
    firebase = await firebase_service.get_all_stats()

    return {
        "status": "success",
        "summary": {
            "users_today": analytics.get("total_users", 0),
            "sessions": analytics.get("sessions", 0),
            "bounce_rate": analytics.get("bounce_rate", 0),
            "engagement_score": clarity.get("engagement_score", 0),
            "frustration_score": clarity.get("frustration_score", 0),
            "task_completion": firebase.get("sunday_board", {}).get("completion_rate", 0),
            "reports_today": firebase.get("golden_host", {}).get("reports_today", 0)
        },
        "timestamp": datetime.now().isoformat()
    }


@router.get("/trends")
async def get_trends():
    """الاتجاهات (آخر 7 أيام)"""

    # Get 7 days data
    analytics_7d = await analytics_service.get_daily_stats(7)

    return {
        "status": "success",
        "period": "7_days",
        "trends": {
            "users": analytics_7d.get("total_users", 0),
            "sessions": analytics_7d.get("sessions", 0),
            "top_pages": analytics_7d.get("top_pages", []),
            "devices": analytics_7d.get("devices", {}),
            "countries": analytics_7d.get("countries", {})
        },
        "timestamp": datetime.now().isoformat()
    }
