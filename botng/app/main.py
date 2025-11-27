"""
أتمتة إحصائيات التحميل وسلوك المستخدم - قولدن هوست
Golden Host Analytics Automation

نظام أتمتة لجمع وتحليل:
- Google Analytics (الزوار والجلسات)
- Microsoft Clarity (سلوك المستخدم)
- تحميلات التطبيق
- إرسال تقارير يومية عبر واتساب مع مقارنة بالأمس
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from contextlib import asynccontextmanager
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
import os
from dotenv import load_dotenv

from app.routers import dashboard, reports, analytics
from app.services.report_generator import generate_daily_report

load_dotenv()

# Get the directory where this file is located
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, "static")

scheduler = AsyncIOScheduler()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Schedule daily report at 9:00 AM Saudi Arabia time
    scheduler.add_job(
        generate_daily_report,
        CronTrigger(hour=9, minute=0, timezone="Asia/Riyadh"),
        id="daily_report",
        name="تقرير الإحصائيات اليومي"
    )
    scheduler.start()
    print("✅ النظام يعمل - التقارير مجدولة الساعة 9:00 صباحاً بتوقيت الرياض")
    yield
    # Shutdown
    scheduler.shutdown()
    print("👋 تم إيقاف النظام")

app = FastAPI(
    title="أتمتة إحصائيات قولدن هوست",
    description="نظام أتمتة إحصائيات التحميل وسلوك المستخدم مع تقارير يومية",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])

@app.get("/api")
async def api_info():
    return {
        "name": "أتمتة إحصائيات قولدن هوست",
        "description": "نظام أتمتة إحصائيات التحميل وسلوك المستخدم",
        "version": "1.0.0",
        "status": "running",
        "features": [
            "Google Analytics - إحصائيات الزوار",
            "Microsoft Clarity - سلوك المستخدم",
            "App Downloads - تحميلات التطبيق",
            "OpenAI Analysis - تحليل ذكي",
            "WhatsApp Reports - تقارير يومية",
            "Yesterday Comparison - مقارنة بالأمس"
        ],
        "report_schedule": "9:00 AM Riyadh Time"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "golden-host-analytics"}

@app.get("/")
async def serve_home():
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))

# Mount static files (must be after specific routes)
app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
