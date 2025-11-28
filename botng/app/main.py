from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
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


# ==================== Botng Dashboard ====================

@app.get("/botng", response_class=HTMLResponse)
async def botng_dashboard():
    """صفحة لوحة تحكم Botng - التكاملات والجدولة"""
    from .scheduler.jobs import scheduler

    # حالة التكاملات
    integrations = {
        "ultramsg": {
            "name": "UltraMsg (WhatsApp)",
            "configured": bool(settings.ultramsg_instance_id and settings.ultramsg_token),
            "details": f"Instance: {settings.ultramsg_instance_id[:10]}..." if settings.ultramsg_instance_id else "غير مُعد"
        },
        "openai": {
            "name": "OpenAI (GPT)",
            "configured": bool(settings.openai_api_key),
            "details": f"Model: {settings.openai_model}" if settings.openai_api_key else "غير مُعد"
        },
        "google_analytics": {
            "name": "Google Analytics 4",
            "configured": bool(settings.ga4_property_id),
            "details": f"Property: {settings.ga4_property_id}" if settings.ga4_property_id else "غير مُعد"
        },
        "clarity": {
            "name": "Microsoft Clarity",
            "configured": True,  # يعمل بإدخال يدوي
            "details": "إدخال يدوي - /api/data/clarity/import"
        },
        "firebase": {
            "name": "Firebase",
            "configured": bool(settings.firebase_database_url),
            "details": "متصل" if settings.firebase_database_url else "غير مُعد"
        }
    }

    # المهام المجدولة
    scheduled_jobs = []
    try:
        for job in scheduler.get_jobs():
            next_run = job.next_run_time
            scheduled_jobs.append({
                "id": job.id,
                "name": job.name,
                "next_run": next_run.strftime("%Y-%m-%d %H:%M:%S") if next_run else "غير محدد",
                "next_run_relative": _get_relative_time(next_run) if next_run else "غير محدد"
            })
    except:
        pass

    # إعدادات التقارير
    report_settings = {
        "time": settings.report_time,
        "recipient": settings.report_group_id if settings.report_group_id else settings.admin_phone,
        "recipient_type": "قروب" if settings.report_group_id else "رقم شخصي"
    }

    html = f"""
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Botng Dashboard | لوحة التحكم</title>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
            * {{ margin: 0; padding: 0; box-sizing: border-box; }}
            body {{
                font-family: 'Tajawal', sans-serif;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                min-height: 100vh;
                color: #fff;
                padding: 20px;
            }}
            .container {{ max-width: 1200px; margin: 0 auto; }}
            h1 {{
                text-align: center;
                margin-bottom: 30px;
                font-size: 2.5em;
                background: linear-gradient(90deg, #00d4ff, #00ff88);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }}
            .section {{
                background: rgba(255,255,255,0.05);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 25px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
            }}
            .section h2 {{
                margin-bottom: 20px;
                color: #00d4ff;
                display: flex;
                align-items: center;
                gap: 10px;
            }}
            .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }}
            .card {{
                background: rgba(255,255,255,0.08);
                border-radius: 12px;
                padding: 20px;
                border: 1px solid rgba(255,255,255,0.1);
                transition: transform 0.3s, box-shadow 0.3s;
            }}
            .card:hover {{
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }}
            .card h3 {{ margin-bottom: 10px; font-size: 1.1em; }}
            .status {{
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 0.9em;
            }}
            .status.active {{ background: rgba(0,255,136,0.2); color: #00ff88; }}
            .status.inactive {{ background: rgba(255,100,100,0.2); color: #ff6464; }}
            .details {{ color: rgba(255,255,255,0.6); font-size: 0.85em; margin-top: 8px; }}
            .job-card {{
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(255,255,255,0.05);
                padding: 15px 20px;
                border-radius: 10px;
                margin-bottom: 10px;
            }}
            .job-name {{ font-weight: 500; }}
            .job-time {{ color: #00d4ff; font-size: 0.9em; }}
            .settings-row {{
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }}
            .settings-row:last-child {{ border-bottom: none; }}
            .settings-label {{ color: rgba(255,255,255,0.7); }}
            .settings-value {{ font-weight: 500; color: #00ff88; }}
            .refresh-btn {{
                background: linear-gradient(90deg, #00d4ff, #00ff88);
                border: none;
                padding: 10px 25px;
                border-radius: 25px;
                color: #1a1a2e;
                font-weight: 700;
                cursor: pointer;
                font-family: 'Tajawal', sans-serif;
                transition: transform 0.2s;
            }}
            .refresh-btn:hover {{ transform: scale(1.05); }}
            .header {{ display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🤖 Botng Dashboard</h1>
                <button class="refresh-btn" onclick="location.reload()">🔄 تحديث</button>
            </div>

            <div class="section">
                <h2>🔌 التكاملات</h2>
                <div class="grid">
                    {"".join(f'''
                    <div class="card">
                        <h3>{v["name"]}</h3>
                        <span class="status {"active" if v["configured"] else "inactive"}">
                            {"✅ مفعّل" if v["configured"] else "❌ غير مفعّل"}
                        </span>
                        <p class="details">{v["details"]}</p>
                    </div>
                    ''' for k, v in integrations.items())}
                </div>
            </div>

            <div class="section">
                <h2>⏰ المهام المجدولة</h2>
                {"".join(f'''
                <div class="job-card">
                    <span class="job-name">📋 {job["name"]}</span>
                    <span class="job-time">⏱️ {job["next_run_relative"]}</span>
                </div>
                ''' for job in scheduled_jobs) if scheduled_jobs else '<p style="color: rgba(255,255,255,0.6);">لا توجد مهام مجدولة حالياً</p>'}
            </div>

            <div class="section">
                <h2>📊 إعدادات التقارير</h2>
                <div class="settings-row">
                    <span class="settings-label">وقت الإرسال اليومي</span>
                    <span class="settings-value">{report_settings["time"]} صباحاً</span>
                </div>
                <div class="settings-row">
                    <span class="settings-label">نوع المستلم</span>
                    <span class="settings-value">{report_settings["recipient_type"]}</span>
                </div>
                <div class="settings-row">
                    <span class="settings-label">المستلم</span>
                    <span class="settings-value">{report_settings["recipient"]}</span>
                </div>
            </div>

            <div class="section">
                <h2>🔗 روابط سريعة</h2>
                <div class="grid">
                    <a href="/docs" style="text-decoration:none;">
                        <div class="card">
                            <h3>📚 API Documentation</h3>
                            <p class="details">توثيق الـ API التفاعلي</p>
                        </div>
                    </a>
                    <a href="/api/reports/send-now" style="text-decoration:none;" onclick="fetch('/api/reports/send-now', {{method:'POST'}}).then(r=>r.json()).then(d=>alert('تم الإرسال!')); return false;">
                        <div class="card">
                            <h3>📤 إرسال تقرير الآن</h3>
                            <p class="details">إرسال التقرير اليومي فوراً</p>
                        </div>
                    </a>
                    <a href="/api/health" style="text-decoration:none;">
                        <div class="card">
                            <h3>💚 Health Check</h3>
                            <p class="details">فحص حالة النظام</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    return html


def _get_relative_time(dt):
    """تحويل الوقت لصيغة نسبية"""
    if not dt:
        return "غير محدد"

    from datetime import timezone
    now = datetime.now(dt.tzinfo) if dt.tzinfo else datetime.now()
    diff = dt - now

    total_seconds = diff.total_seconds()
    if total_seconds < 0:
        return "انتهى"

    hours = int(total_seconds // 3600)
    minutes = int((total_seconds % 3600) // 60)

    if hours > 24:
        days = hours // 24
        return f"بعد {days} يوم"
    elif hours > 0:
        return f"بعد {hours} ساعة و {minutes} دقيقة"
    else:
        return f"بعد {minutes} دقيقة"


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
