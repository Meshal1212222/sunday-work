"""
Pydantic Schemas for Botng API
"""

from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


class AnalyticsStats(BaseModel):
    total_users: int = 0
    sessions: int = 0
    page_views: int = 0
    avg_session_duration: float = 0
    bounce_rate: float = 0
    new_users: int = 0
    top_pages: List[str] = []
    devices: Dict[str, int] = {}
    countries: Dict[str, int] = {}


class ClarityInsights(BaseModel):
    total_sessions: int = 0
    unique_visitors: int = 0
    rage_clicks: int = 0
    dead_clicks: int = 0
    quick_backs: int = 0
    frustration_score: int = 0
    engagement_score: int = 0
    scroll_depth: Dict[str, int] = {}


class GoldenHostStats(BaseModel):
    total_reports: int = 0
    total_refunds: int = 0
    total_conversations: int = 0
    total_sales: int = 0
    reports_today: int = 0
    refunds_today: int = 0
    sales_today: int = 0


class SundayBoardStats(BaseModel):
    total_boards: int = 0
    total_tasks: int = 0
    completed_tasks: int = 0
    in_progress_tasks: int = 0
    pending_tasks: int = 0
    completion_rate: float = 0


class ReportAnalysis(BaseModel):
    status: str
    analysis: str
    generated_at: str
    model: str
    data_sources: List[str] = []


class DashboardResponse(BaseModel):
    status: str
    timestamp: str
    firebase: Dict[str, Any]
    analytics: Dict[str, Any]


class ReportResponse(BaseModel):
    status: str
    type: str
    timestamp: str
    report: Optional[Dict[str, Any]] = None
    message: Optional[str] = None


class WhatsAppResult(BaseModel):
    status: str
    provider: str
    phone: str
    timestamp: str
    error: Optional[str] = None
