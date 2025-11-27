"""
Dashboard Router
API endpoints للوحة التحكم
"""

from fastapi import APIRouter, Query
from typing import Optional
from datetime import datetime

from app.services.firebase_service import firebase_service
from app.services.analytics_service import analytics_service
from app.services.clarity_service import clarity_service

router = APIRouter()


@router.get("/stats")
async def get_dashboard_stats():
    """إحصائيات لوحة التحكم"""

    firebase_stats = await firebase_service.get_all_stats()
    analytics_stats = await analytics_service.get_daily_stats()

    return {
        "status": "success",
        "timestamp": datetime.now().isoformat(),
        "firebase": firebase_stats,
        "analytics": {
            "total_users": analytics_stats.get("total_users", 0),
            "sessions": analytics_stats.get("sessions", 0),
            "page_views": analytics_stats.get("page_views", 0)
        }
    }


@router.get("/tasks")
async def get_tasks():
    """قائمة المهام"""

    sunday_stats = await firebase_service.get_sunday_board_stats()

    return {
        "status": "success",
        "tasks": {
            "total": sunday_stats.get("total_tasks", 0),
            "completed": sunday_stats.get("completed_tasks", 0),
            "in_progress": sunday_stats.get("in_progress_tasks", 0),
            "pending": sunday_stats.get("pending_tasks", 0)
        },
        "completion_rate": sunday_stats.get("completion_rate", 0)
    }


@router.get("/activity")
async def get_activity(limit: int = Query(default=20, le=100)):
    """سجل النشاطات"""

    activity_log = await firebase_service.get_activity_log(limit)

    return {
        "status": "success",
        "count": len(activity_log),
        "activity": activity_log
    }


@router.get("/golden-host")
async def get_golden_host_stats():
    """إحصائيات Golden Host"""

    stats = await firebase_service.get_golden_host_stats()

    return {
        "status": "success",
        "stats": stats,
        "timestamp": datetime.now().isoformat()
    }


@router.get("/sunday-board")
async def get_sunday_board_stats():
    """إحصائيات Sunday Board"""

    stats = await firebase_service.get_sunday_board_stats()

    return {
        "status": "success",
        "stats": stats,
        "timestamp": datetime.now().isoformat()
    }


@router.get("/user-behavior")
async def get_user_behavior():
    """سلوك المستخدم من Analytics و Clarity"""

    analytics_behavior = await analytics_service.get_user_behavior()
    clarity_insights = await clarity_service.get_user_insights()

    return {
        "status": "success",
        "analytics": analytics_behavior,
        "clarity": clarity_insights,
        "timestamp": datetime.now().isoformat()
    }


@router.post("/sync")
async def sync_data():
    """مزامنة البيانات"""

    # Refresh all data
    firebase_stats = await firebase_service.get_all_stats()
    analytics_stats = await analytics_service.get_daily_stats()
    clarity_stats = await clarity_service.get_daily_summary()

    return {
        "status": "synced",
        "timestamp": datetime.now().isoformat(),
        "data_sources": {
            "firebase": "synced",
            "analytics": "synced",
            "clarity": "synced"
        }
    }
