from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from datetime import datetime, date
import os

from .config import settings
from .database import init_db, get_db, SessionLocal
from .webhooks.whatsapp import router as whatsapp_router
from .dashboard.routes import router as dashboard_router
from .scheduler.jobs import start_scheduler, shutdown_scheduler, trigger_daily_report_now
from .reporters.smart_report import SmartReportGenerator
from .reporters.report_generator import ReportGenerator
from .integrations.ultramsg import UltraMsgClient


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    print("🚀 Starting Botng...")
    try:
        init_db()
        print("✅ Database initialized")
    except Exception as e:
        print(f"⚠️ Database init warning: {e}")

    try:
        start_scheduler()
        print("✅ Scheduler started")
    except Exception as e:
        print(f"⚠️ Scheduler warning: {e}")

    print("✅ Botng is ready!")

    yield

    # Shutdown
    print("👋 Shutting down Botng...")
    try:
        shutdown_scheduler()
    except Exception as e:
        print(f"⚠️ Shutdown warning: {e}")


app = FastAPI(
    title="Botng",
    description="نظام أتمتة ذكي لجمع البيانات وتحليلها وإرسال التقارير",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(whatsapp_router, prefix="/webhook", tags=["WhatsApp"])
app.include_router(dashboard_router, prefix="/api/dashboard", tags=["Dashboard"])

# Static files
static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")


# ==================== Root & Dashboard ====================

@app.get("/")
async def root():
    """الصفحة الرئيسية - توجيه للوحة التحكم"""
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url="/api/dashboard/")


# ==================== Health Check ====================

@app.get("/api/health")
async def health_check():
    """فحص حالة النظام"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }


# ==================== Reports API ====================

@app.get("/api/reports/daily")
async def get_daily_report(report_date: date = None):
    """الحصول على التقرير اليومي"""
    if report_date is None:
        report_date = date.today()

    generator = ReportGenerator()
    report = await generator.generate_daily_report(report_date)

    return {
        "date": report_date.isoformat(),
        "report": report
    }


@app.get("/api/reports/weekly")
async def get_weekly_report():
    """الحصول على التقرير الأسبوعي"""
    generator = ReportGenerator()
    report = await generator.generate_weekly_report()

    return {
        "report": report
    }


@app.post("/api/reports/send")
async def send_report(report_type: str = "daily", phone: str = None):
    """إرسال تقرير عبر واتساب"""
    if phone is None:
        phone = settings.admin_phone

    generator = ReportGenerator()
    whatsapp = UltraMsgClient()

    if report_type == "daily":
        report = await generator.generate_daily_report()
    elif report_type == "weekly":
        report = await generator.generate_weekly_report()
    else:
        raise HTTPException(status_code=400, detail="نوع التقرير غير صحيح")

    # إرسال التقرير
    result = await whatsapp.send_message(phone, report["content"])

    return {
        "status": "sent",
        "phone": phone,
        "report_type": report_type,
        "result": result
    }


@app.post("/api/reports/send-to-group")
async def send_report_to_group():
    """إرسال التقرير اليومي للقروب (نص + PDF)"""
    try:
        await trigger_daily_report_now()
        return {
            "status": "sent",
            "recipient": settings.report_group_id,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== Data Sync API ====================

@app.post("/api/data/sync")
async def sync_data(source: str = "all"):
    """مزامنة البيانات من المصادر"""
    from .collectors.clarity import ClarityCollector
    from .collectors.callcenter import CallCenterCollector

    results = {}

    if source in ["all", "clarity"]:
        clarity = ClarityCollector()
        results["clarity"] = await clarity.collect()

    if source in ["all", "callcenter"]:
        callcenter = CallCenterCollector()
        results["callcenter"] = await callcenter.collect()

    return {
        "status": "synced",
        "timestamp": datetime.utcnow().isoformat(),
        "results": results
    }


# ==================== Run ====================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
