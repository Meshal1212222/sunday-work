from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from datetime import datetime, date

from .config import settings
from .database import init_db, get_db, SessionLocal
from .webhooks.whatsapp import router as whatsapp_router
from .scheduler.jobs import start_scheduler, shutdown_scheduler
from .reporters.report_generator import ReportGenerator
from .integrations.ultramsg import UltraMsgClient


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    print("🚀 Starting Botng...")
    init_db()
    start_scheduler()
    print("✅ Botng is ready!")

    yield

    # Shutdown
    print("👋 Shutting down Botng...")
    shutdown_scheduler()


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
