from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from contextlib import asynccontextmanager
from datetime import datetime, date
import os
import asyncio

from .config import settings
from .database import init_db, get_db, SessionLocal
from .webhooks.whatsapp import router as whatsapp_router
from .dashboard.routes import router as dashboard_router
from .scheduler.jobs import start_scheduler, shutdown_scheduler, trigger_daily_report_now
from .reporters.smart_report import SmartReportGenerator
from .reporters.report_generator import ReportGenerator
from .integrations.ultramsg import UltraMsgClient
from .automations.triggers import AutomationScheduler

# Global automation scheduler instance
automation_scheduler = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    global automation_scheduler

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

    # Start Crash Monitoring (Real-time) - DISABLED
    # try:
    #     automation_scheduler = AutomationScheduler()
    #     asyncio.create_task(automation_scheduler.start())
    #     print("✅ Crash monitoring started (Real-time)")
    # except Exception as e:
    #     print(f"⚠️ Crash monitoring warning: {e}")
    print("⏸️ Crash monitoring DISABLED")

    print("✅ Botng is ready!")

    yield

    # Shutdown
    print("👋 Shutting down Botng...")

    # Stop crash monitoring
    if automation_scheduler:
        automation_scheduler.stop()

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

# Serve src folder (Golden Host, Sunday Board dashboards)
# Try multiple paths for different environments (local vs Docker)
possible_src_paths = [
    os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "src"),  # Local: botng/app -> botng -> project -> src
    os.path.join(os.path.dirname(os.path.dirname(__file__)), "src"),  # Docker: app/app -> app -> src
    "/app/src"  # Docker absolute fallback
]

src_dir = None
for path in possible_src_paths:
    if os.path.exists(path):
        src_dir = path
        break

if src_dir:
    app.mount("/src", StaticFiles(directory=src_dir, html=True), name="src")
    print(f"✅ Serving src folder: {src_dir}")
else:
    print(f"⚠️ src folder not found in: {possible_src_paths}")


# ==================== المسارات الرئيسية ====================

@app.get("/")
async def root():
    """الصفحة الرئيسية - Level Up Portal"""
    # Find src/index.html in possible paths
    for base_path in possible_src_paths:
        src_index = os.path.join(base_path, "index.html")
        if os.path.exists(src_index):
            with open(src_index, "r", encoding="utf-8") as f:
                return HTMLResponse(content=f.read())
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url="/botng")


# ==================== Golden Host Routes ====================

@app.get("/golden-host")
async def golden_host_landing():
    """صفحة اختيار Golden Host - redirect للحفاظ على الروابط النسبية"""
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url="/src/golden-host/landing.html")


@app.get("/golden-host/dashboard")
async def golden_host_dashboard():
    """لوحة تحكم Golden Host"""
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url="/src/golden-host/dashboard.html")


@app.get("/golden-host/library")
async def golden_host_library():
    """المكتبة الرقمية - Golden Host"""
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url="/src/golden-host/index.html")


# ==================== Sunday Board Routes ====================

@app.get("/sunday-board")
async def sunday_board():
    """Sunday Board Pro - إدارة المشاريع المتقدم"""
    # Try to serve the professional board-pro.html
    for base_path in possible_src_paths:
        pro_path = os.path.join(base_path, "sunday-board", "board-pro.html")
        if os.path.exists(pro_path):
            with open(pro_path, "r", encoding="utf-8") as f:
                return HTMLResponse(content=f.read())
    # Fallback redirect
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url="/src/sunday-board/board-pro.html")


# ==================== Monday.com Proxy (CORS Fix) ====================

MONDAY_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ5ODI0MTQ1NywiYWFpIjoxMSwidWlkIjo2NjU3MTg3OCwiaWFkIjoiMjAyNS0wNC0xMFQxMjowMTowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU0ODI1MzEsInJnbiI6ImV1YzEifQ.i9ZMOxFuUPb2XySVeUsZbE6p9vGy2REefTmwSekf24I"

@app.get("/api/monday/boards")
async def get_monday_boards():
    """Proxy for Monday.com API - All boards including archive"""
    import httpx

    # Query for ALL boards (active + archived)
    query = """
    {
        boards(limit: 100, order_by: created_at, state: all) {
            id
            name
            description
            state
            board_kind
            created_at
            updated_at
            groups {
                id
                title
                color
                position
                archived
            }
            items_page(limit: 500) {
                items {
                    id
                    name
                    state
                    created_at
                    updated_at
                    group {
                        id
                        title
                    }
                    column_values {
                        id
                        text
                        value
                        type
                        column {
                            title
                        }
                    }
                    subitems {
                        id
                        name
                        state
                        created_at
                        updated_at
                        column_values {
                            id
                            text
                            type
                            column {
                                title
                            }
                        }
                    }
                }
            }
        }
        users {
            id
            name
            email
            photo_thumb
            title
            created_at
        }
    }
    """

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                "https://api.monday.com/v2",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": MONDAY_TOKEN,
                    "API-Version": "2024-01"
                },
                json={"query": query}
            )

            data = response.json()

            if "errors" in data:
                return {"success": False, "errors": data["errors"]}

            return {"success": True, "data": data.get("data", {})}

    except Exception as e:
        return {"success": False, "error": str(e)}


@app.get("/api/monday/analytics")
async def get_monday_analytics():
    """Get analytics data - activity logs for productivity analysis"""
    import httpx
    from datetime import datetime, timedelta

    # Get activity from last 90 days
    query = """
    {
        boards(limit: 100, state: all) {
            id
            name
            state
            activity_logs(limit: 1000) {
                id
                event
                data
                created_at
                user_id
            }
            items_page(limit: 500) {
                items {
                    id
                    name
                    state
                    created_at
                    updated_at
                    column_values {
                        id
                        text
                        type
                        column {
                            title
                        }
                    }
                }
            }
        }
        users {
            id
            name
            email
            photo_thumb
        }
    }
    """

    try:
        async with httpx.AsyncClient(timeout=90.0) as client:
            response = await client.post(
                "https://api.monday.com/v2",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": MONDAY_TOKEN,
                    "API-Version": "2024-01"
                },
                json={"query": query}
            )

            data = response.json()

            if "errors" in data:
                return {"success": False, "errors": data["errors"]}

            # Process analytics
            raw_data = data.get("data", {})
            boards = raw_data.get("boards", [])
            users = raw_data.get("users", [])

            # Calculate productivity metrics
            analytics = {
                "total_boards": len(boards),
                "active_boards": len([b for b in boards if b.get("state") == "active"]),
                "archived_boards": len([b for b in boards if b.get("state") == "archived"]),
                "total_tasks": 0,
                "completed_tasks": 0,
                "in_progress_tasks": 0,
                "pending_tasks": 0,
                "overdue_tasks": 0,
                "users": [],
                "boards_summary": [],
                "productivity_by_user": {}
            }

            user_tasks = {u["id"]: {"name": u["name"], "email": u.get("email", ""), "photo": u.get("photo_thumb", ""), "total": 0, "completed": 0, "in_progress": 0} for u in users}

            for board in boards:
                board_stats = {
                    "id": board["id"],
                    "name": board["name"],
                    "state": board.get("state", "active"),
                    "total_tasks": 0,
                    "completed": 0,
                    "in_progress": 0,
                    "pending": 0
                }

                items = board.get("items_page", {}).get("items", [])
                for item in items:
                    analytics["total_tasks"] += 1
                    board_stats["total_tasks"] += 1

                    # Check status
                    status_col = next((c for c in item.get("column_values", []) if c.get("type") == "status" or "status" in c.get("id", "").lower()), None)
                    status_text = (status_col.get("text", "") if status_col else "").lower()

                    if "done" in status_text or "complete" in status_text or "منجز" in status_text:
                        analytics["completed_tasks"] += 1
                        board_stats["completed"] += 1
                    elif "working" in status_text or "progress" in status_text or "جاري" in status_text:
                        analytics["in_progress_tasks"] += 1
                        board_stats["in_progress"] += 1
                    else:
                        analytics["pending_tasks"] += 1
                        board_stats["pending"] += 1

                    # Check person
                    person_col = next((c for c in item.get("column_values", []) if c.get("type") == "people" or "person" in c.get("id", "").lower()), None)
                    if person_col and person_col.get("value"):
                        try:
                            import json
                            person_data = json.loads(person_col["value"]) if isinstance(person_col["value"], str) else person_col["value"]
                            if person_data and "personsAndTeams" in person_data:
                                for p in person_data["personsAndTeams"]:
                                    uid = str(p.get("id", ""))
                                    if uid in user_tasks:
                                        user_tasks[uid]["total"] += 1
                                        if "done" in status_text or "complete" in status_text:
                                            user_tasks[uid]["completed"] += 1
                                        elif "working" in status_text or "progress" in status_text:
                                            user_tasks[uid]["in_progress"] += 1
                        except:
                            pass

                analytics["boards_summary"].append(board_stats)

            # Calculate productivity percentage for each user
            for uid, udata in user_tasks.items():
                if udata["total"] > 0:
                    udata["productivity"] = round((udata["completed"] / udata["total"]) * 100, 1)
                else:
                    udata["productivity"] = 0
                analytics["users"].append(udata)

            # Sort users by productivity
            analytics["users"].sort(key=lambda x: x["productivity"], reverse=True)

            # Overall productivity
            if analytics["total_tasks"] > 0:
                analytics["overall_productivity"] = round((analytics["completed_tasks"] / analytics["total_tasks"]) * 100, 1)
            else:
                analytics["overall_productivity"] = 0

            return {"success": True, "data": raw_data, "analytics": analytics}

    except Exception as e:
        return {"success": False, "error": str(e)}


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
    try:
        from .scheduler.jobs import scheduler
    except:
        scheduler = None

    # حالة التكاملات
    integrations = {
        "ultramsg": {
            "name": "UltraMsg (WhatsApp)",
            "configured": bool(settings.ultramsg_instance_id and settings.ultramsg_token) if settings.ultramsg_instance_id else False,
            "details": f"Instance: {settings.ultramsg_instance_id[:10]}..." if settings.ultramsg_instance_id else "غير مُعد"
        },
        "openai": {
            "name": "OpenAI (GPT)",
            "configured": bool(settings.openai_api_key) if hasattr(settings, 'openai_api_key') else False,
            "details": f"Model: {settings.openai_model}" if hasattr(settings, 'openai_api_key') and settings.openai_api_key else "غير مُعد"
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
        if scheduler:
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

    # جلب قائمة القروبات من UltraMsg
    groups_list = []
    try:
        import httpx
        response = httpx.get(
            f"https://api.ultramsg.com/{settings.ultramsg_instance_id}/groups",
            params={"token": settings.ultramsg_token},
            verify=False,
            timeout=10
        )
        if response.status_code == 200:
            groups_data = response.json()
            groups_list = [{"id": g["id"], "name": g["name"]} for g in groups_data if g.get("isGroup")]
    except:
        pass

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
            .settings-form {{ display: flex; flex-direction: column; gap: 15px; }}
            .form-group {{ display: flex; flex-direction: column; gap: 8px; }}
            .form-group label {{ color: rgba(255,255,255,0.8); font-weight: 500; }}
            .time-input, .text-input, .select-input {{
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 8px;
                padding: 12px 15px;
                color: #fff;
                font-family: 'Tajawal', sans-serif;
                font-size: 1em;
                outline: none;
                transition: border-color 0.3s;
            }}
            .time-input:focus, .text-input:focus, .select-input:focus {{
                border-color: #00d4ff;
            }}
            .select-input option {{ background: #1a1a2e; color: #fff; }}
            .save-btn {{
                background: linear-gradient(90deg, #00ff88, #00d4ff);
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                color: #1a1a2e;
                font-weight: 700;
                cursor: pointer;
                font-family: 'Tajawal', sans-serif;
                font-size: 1em;
                transition: transform 0.2s, box-shadow 0.2s;
                align-self: flex-start;
            }}
            .save-btn:hover {{ transform: scale(1.05); box-shadow: 0 5px 20px rgba(0,255,136,0.3); }}

            /* Automation Flow Styles */
            .automation-flow {{
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 10px;
                padding: 20px 0;
            }}
            .flow-step {{
                background: rgba(255,255,255,0.08);
                border-radius: 15px;
                padding: 20px;
                text-align: center;
                min-width: 140px;
                flex: 1;
                border: 2px solid transparent;
                transition: all 0.3s;
            }}
            .flow-step:hover {{
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }}
            .flow-step.source {{ border-color: #4ecdc4; }}
            .flow-step.process {{ border-color: #45b7d1; }}
            .flow-step.generate {{ border-color: #96ceb4; }}
            .flow-step.schedule {{ border-color: #ffd93d; }}
            .flow-step.send {{ border-color: #6bcb77; }}
            .step-icon {{ font-size: 2.5em; margin-bottom: 10px; }}
            .step-title {{ font-weight: 700; color: #fff; margin-bottom: 10px; font-size: 1.1em; }}
            .step-items {{ display: flex; flex-direction: column; gap: 5px; }}
            .step-items .item {{
                font-size: 0.8em;
                padding: 4px 8px;
                border-radius: 10px;
                background: rgba(255,255,255,0.1);
            }}
            .step-items .item.active {{ background: rgba(0,255,136,0.2); color: #00ff88; }}
            .step-items .item.inactive {{ background: rgba(255,100,100,0.2); color: #ff6464; }}
            .flow-arrow {{
                font-size: 2em;
                color: #00d4ff;
                font-weight: bold;
                animation: pulse 1.5s infinite;
            }}
            @keyframes pulse {{
                0%, 100% {{ opacity: 1; transform: scale(1); }}
                50% {{ opacity: 0.5; transform: scale(1.2); }}
            }}
            @media (max-width: 768px) {{
                .automation-flow {{ flex-direction: column; }}
                .flow-arrow {{ transform: rotate(90deg); }}
            }}
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
                <div class="settings-form">
                    <div class="form-group">
                        <label>⏰ وقت الإرسال اليومي</label>
                        <input type="time" id="report_time" value="{report_settings["time"]}" class="time-input">
                    </div>
                    <div class="form-group">
                        <label>📱 المستلم</label>
                        <select id="recipient_type" class="select-input" onchange="toggleRecipientInput()">
                            <option value="phone" {"selected" if not settings.report_group_id else ""}>رقم شخصي</option>
                            <option value="group" {"selected" if settings.report_group_id else ""}>قروب واتساب</option>
                        </select>
                    </div>
                    <div class="form-group" id="phone-input-group" style="{"display:none" if settings.report_group_id else ""}">
                        <label>📞 رقم الواتساب</label>
                        <input type="text" id="phone_recipient" value="{settings.admin_phone}" class="text-input" placeholder="966XXXXXXXXX">
                    </div>
                    <div class="form-group" id="group-input-group" style="{"" if settings.report_group_id else "display:none"}">
                        <label>👥 اختر القروب</label>
                        <select id="group_recipient" class="select-input">
                            <option value="">-- اختر قروب --</option>
                            {"".join(f'<option value="{g["id"]}" {"selected" if g["id"] == settings.report_group_id else ""}>{g["name"]}</option>' for g in groups_list)}
                        </select>
                    </div>
                    <button class="save-btn" onclick="saveSettings()">💾 حفظ الإعدادات</button>
                    <span id="save-status" style="margin-right: 15px; display: none;"></span>
                </div>
            </div>

            <div class="section">
                <h2>🗺️ خريطة عملية الأتمتة</h2>
                <div class="automation-flow">
                    <div class="flow-step source">
                        <div class="step-icon">📊</div>
                        <div class="step-title">مصادر البيانات</div>
                        <div class="step-items">
                            <span class="item {"active" if settings.ga4_property_id else "inactive"}">Google Analytics</span>
                            <span class="item active">Microsoft Clarity</span>
                            <span class="item {"active" if settings.firebase_database_url else "inactive"}">Firebase</span>
                        </div>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step process">
                        <div class="step-icon">⚙️</div>
                        <div class="step-title">معالجة البيانات</div>
                        <div class="step-items">
                            <span class="item active">جمع الإحصائيات</span>
                            <span class="item active">تحليل السلوك</span>
                            <span class="item active">مقارنة الفترات</span>
                        </div>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step generate">
                        <div class="step-icon">📝</div>
                        <div class="step-title">إنشاء التقرير</div>
                        <div class="step-items">
                            <span class="item active">تقرير نصي</span>
                            <span class="item active">ملف PDF</span>
                            <span class="item active">رسوم بيانية</span>
                        </div>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step schedule">
                        <div class="step-icon">⏰</div>
                        <div class="step-title">الجدولة</div>
                        <div class="step-items">
                            <span class="item active">يومياً: {report_settings["time"]}</span>
                            <span class="item active">توقيت الرياض</span>
                        </div>
                    </div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-step send">
                        <div class="step-icon">📱</div>
                        <div class="step-title">الإرسال</div>
                        <div class="step-items">
                            <span class="item {"active" if settings.ultramsg_instance_id else "inactive"}">WhatsApp API</span>
                            <span class="item active">{report_settings["recipient_type"]}</span>
                        </div>
                    </div>
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
        <script>
            function toggleRecipientInput() {{
                const type = document.getElementById('recipient_type').value;
                document.getElementById('phone-input-group').style.display = type === 'phone' ? '' : 'none';
                document.getElementById('group-input-group').style.display = type === 'group' ? '' : 'none';
            }}

            async function saveSettings() {{
                const time = document.getElementById('report_time').value;
                const recipientType = document.getElementById('recipient_type').value;
                let recipient = '';

                if (recipientType === 'phone') {{
                    recipient = document.getElementById('phone_recipient').value;
                }} else {{
                    recipient = document.getElementById('group_recipient').value;
                }}

                if (!recipient) {{
                    alert('الرجاء اختيار المستلم');
                    return;
                }}

                const status = document.getElementById('save-status');
                status.style.display = 'inline';
                status.style.color = '#ffd700';
                status.textContent = '⏳ جاري الحفظ...';

                try {{
                    const response = await fetch('/api/settings/update', {{
                        method: 'POST',
                        headers: {{ 'Content-Type': 'application/json' }},
                        body: JSON.stringify({{
                            report_time: time,
                            recipient_type: recipientType,
                            recipient: recipient
                        }})
                    }});

                    const result = await response.json();

                    if (result.status === 'success') {{
                        status.style.color = '#00ff88';
                        status.textContent = '✅ تم الحفظ وتحديث الجدولة!';
                    }} else {{
                        status.style.color = '#ff6464';
                        status.textContent = '❌ ' + (result.message || 'فشل الحفظ');
                    }}
                }} catch (e) {{
                    status.style.color = '#ff6464';
                    status.textContent = '❌ خطأ في الاتصال';
                }}

                setTimeout(() => {{ status.style.display = 'none'; }}, 5000);
            }}
        </script>
    </body>
    </html>
    """
    return html


@app.post("/api/settings/update")
async def update_settings(data: dict):
    """تحديث إعدادات التقارير"""
    import json

    try:
        report_time = data.get("report_time", "11:00")
        recipient_type = data.get("recipient_type", "phone")
        recipient = data.get("recipient", "")

        # حفظ الإعدادات في ملف JSON
        settings_file = os.path.join(os.path.dirname(__file__), "runtime_settings.json")

        new_settings = {
            "report_time": report_time,
            "recipient_type": recipient_type,
            "recipient": recipient,
            "report_group_id": recipient if recipient_type == "group" else "",
            "admin_phone": recipient if recipient_type == "phone" else settings.admin_phone,
            "updated_at": datetime.utcnow().isoformat()
        }

        with open(settings_file, "w", encoding="utf-8") as f:
            json.dump(new_settings, f, ensure_ascii=False, indent=2)

        # تحديث الجدولة فوراً
        from .scheduler.jobs import scheduler, send_daily_report
        from apscheduler.triggers.cron import CronTrigger

        hour, minute = report_time.split(":")
        utc_hour = int(hour) - 3  # Riyadh is UTC+3
        if utc_hour < 0:
            utc_hour += 24

        # إعادة جدولة التقرير اليومي
        scheduler.reschedule_job(
            "daily_report",
            trigger=CronTrigger(hour=utc_hour, minute=int(minute))
        )

        return {
            "status": "success",
            "message": "تم حفظ الإعدادات وتحديث الجدولة",
            "settings": new_settings
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


@app.get("/api/settings")
async def get_settings():
    """جلب الإعدادات الحالية"""
    import json

    settings_file = os.path.join(os.path.dirname(__file__), "runtime_settings.json")

    if os.path.exists(settings_file):
        with open(settings_file, "r", encoding="utf-8") as f:
            return json.load(f)

    return {
        "report_time": settings.report_time,
        "recipient_type": "group" if settings.report_group_id else "phone",
        "recipient": settings.report_group_id or settings.admin_phone
    }


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


@app.get("/api/reports/checkout-funnel")
async def get_checkout_funnel():
    """
    تحليل Funnel الحجوزات - نسبة الإكمال من صفحة الدفع

    Returns:
    - checkout_started: عدد المستخدمين اللي وصلوا صفحة الدفع
    - completed: عدد اللي أكملوا الحجز
    - abandoned: عدد اللي ما أكملوا
    - conversion_rate: نسبة الإكمال %
    - abandonment_rate: نسبة التخلي %
    """
    from .collectors.google_analytics import GoogleAnalyticsCollector

    ga = GoogleAnalyticsCollector()
    funnel_data = await ga.get_checkout_funnel_comparison()

    return funnel_data


@app.get("/api/reports/bookings")
async def get_bookings_report():
    """
    جلب بيانات الحجوزات من Firebase

    المسار في Firebase: goldenhost/bookings/YYYY-MM-DD
    """
    from .collectors.firebase_collector import FirebaseCollector

    firebase = FirebaseCollector()

    # بيانات أمس وأول أمس
    comparison = await firebase.get_bookings_comparison()

    # بيانات الشهر
    monthly = await firebase.get_monthly_bookings()

    return {
        "daily": comparison,
        "monthly": monthly
    }


@app.post("/api/reports/bookings/send")
async def send_bookings_report(phone: str = None):
    """
    إرسال تقرير الحجوزات المنفصل عبر واتساب

    المسار في Firebase: goldenhost/bookings/YYYY-MM-DD
    الحقول المطلوبة:
    - checkout_started: عدد اللي وصلوا صفحة الدفع
    - completed: عدد اللي أكملوا الحجز
    """
    from .collectors.firebase_collector import FirebaseCollector

    if phone is None:
        phone = settings.admin_phone

    firebase = FirebaseCollector()
    whatsapp = UltraMsgClient()

    # جلب البيانات
    comparison = await firebase.get_bookings_comparison()
    monthly = await firebase.get_monthly_bookings()

    yesterday = comparison.get("yesterday", {})
    day_before = comparison.get("day_before", {})

    # التحقق من وجود بيانات
    if not yesterday.get("has_data"):
        return {
            "status": "no_data",
            "message": "لا توجد بيانات حجوزات لأمس في Firebase",
            "expected_path": f"goldenhost/bookings/{(date.today() - timedelta(days=1)).isoformat()}",
            "expected_fields": {
                "checkout_started": "عدد اللي وصلوا صفحة الدفع",
                "completed": "عدد اللي أكملوا الحجز"
            }
        }

    # حساب التغيير
    rate_change = comparison.get("rate_change", 0)
    change_icon = "📈" if rate_change >= 0 else "📉"
    change_sign = "+" if rate_change >= 0 else ""

    # إنشاء التقرير
    report_date = date.today() - timedelta(days=1)
    days_ar = ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد']
    months_ar = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']

    day_name = days_ar[report_date.weekday()]
    month_name = months_ar[report_date.month - 1]

    # قسم الشهر
    monthly_section = ""
    if monthly.get("has_data"):
        monthly_section = f"""

*📅 إحصائيات الشهر:*
وصلوا الدفع: *{monthly['total_checkout_started']:,}*
أكملوا: *{monthly['total_completed']:,}*
نسبة الشهر: *{monthly['monthly_conversion_rate']}%*"""

    message = f"""*📊 تقرير الحجوزات - Golden Host*
{day_name} {report_date.day} {month_name} {report_date.year}
━━━━━━━━━━━━━━━━━━━━

*👤 وصلوا صفحة الدفع:* {yesterday['checkout_started']:,}
*✅ أكملوا الحجز:* {yesterday['completed']:,}
*❌ لم يكملوا:* {yesterday['abandoned']:,}

━━━━━━━━━━━━━━━━━━━━

*📈 نسبة الإكمال:* {yesterday['conversion_rate']}%
*📉 نسبة التخلي:* {yesterday['abandonment_rate']}%

*مقارنة بأول أمس:*
{change_icon} {change_sign}{rate_change}% {"تحسن ✅" if rate_change >= 0 else "تراجع ⚠️"}
{monthly_section}

━━━━━━━━━━━━━━━━━━━━
_شركة ليفل أب القابضة | Botng_"""

    # إرسال التقرير
    result = await whatsapp.send_message(phone, message)

    return {
        "status": "sent",
        "phone": phone,
        "data": {
            "yesterday": yesterday,
            "day_before": day_before,
            "monthly": monthly
        },
        "result": result
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


@app.post("/api/crashes/send-activation")
async def send_crash_activation_message():
    """إرسال رسالة تفعيل نظام مراقبة Crashes للأرقام الخاصة"""
    whatsapp = UltraMsgClient()

    message = """✅ *تم تفعيل نظام مراقبة Crashes - Golden Host*

━━━━━━━━━━━━━━━

*كيف يعمل النظام:*
• مراقبة لحظية للتطبيق 24/7
• فحص كل دقيقة للكشف عن أي crash
• تنبيه فوري على هذا الرقم

*متى يجيك تنبيه:*
• أول ما يصير crash جديد في التطبيق
• يوضح الشاشة اللي صار فيها المشكلة
• يوضح المنصة (iOS/Android) والإصدار

━━━━━━━━━━━━━━━

*📱 مثال على التنبيه:*

🚨 *تنبيه Crashes - سري*

🚨 *Crash جديد الآن!*

*🆕 Crashes جديدة:*
🍎 PaymentScreen (1x) v2.1.0
🤖 CheckoutScreen (2x) v2.0.8

الإجمالي: *3* crashes

━━━━━━━━━━━━━━━

⏰ """ + datetime.now().strftime('%Y-%m-%d') + """
_شركة ليفل أب القابضة | Botng_"""

    recipients = settings.crash_alert_recipients.split(",")
    results = []

    for recipient in recipients:
        recipient = recipient.strip()
        if recipient:
            result = await whatsapp.send_message(recipient, message)
            results.append({"phone": recipient, "result": result})

    return {
        "status": "sent",
        "recipients": recipients,
        "results": results,
        "timestamp": datetime.utcnow().isoformat()
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


# ==================== Test Report API ====================

@app.post("/api/reports/send-test")
async def send_test_report_to_private():
    """إرسال تقرير تجريبي للأرقام الخاصة"""
    from .reporters.smart_report import SmartReportGenerator
    from .scheduler.jobs import upload_pdf_and_get_url

    whatsapp = UltraMsgClient()
    generator = SmartReportGenerator()

    # الأرقام الخاصة
    recipients = settings.crash_alert_recipients.split(",")
    results = []

    try:
        # إنشاء التقرير
        report = await generator.generate_daily_report()

        for recipient in recipients:
            recipient = recipient.strip()
            if not recipient:
                continue

            # إرسال النص
            text_result = await whatsapp.send_message(recipient, report["text"])
            results.append({"phone": recipient, "type": "text", "result": text_result})

            # إرسال PDF
            pdf_path = report.get("pdf_path")
            if pdf_path and os.path.exists(pdf_path):
                pdf_url = await upload_pdf_and_get_url(pdf_path)
                if pdf_url:
                    pdf_result = await whatsapp.send_document(
                        recipient, pdf_url,
                        f"Golden_Host_Report_{datetime.utcnow().strftime('%Y%m%d')}.pdf"
                    )
                    results.append({"phone": recipient, "type": "pdf", "result": pdf_result})

            # إرسال تحليل AI
            ai_analysis = report.get("ai_analysis")
            if ai_analysis:
                ai_message = f"""*🤖 تحليل الذكاء الاصطناعي*
━━━━━━━━━━━━━━━━━━━━

{ai_analysis}

_تم التحليل بواسطة Botng AI_"""
                ai_result = await whatsapp.send_message(recipient, ai_message)
                results.append({"phone": recipient, "type": "ai", "result": ai_result})

        # تنظيف PDF
        if report.get("pdf_path") and os.path.exists(report["pdf_path"]):
            os.remove(report["pdf_path"])

        return {
            "status": "sent",
            "recipients": recipients,
            "report_date": report.get("date"),
            "data_sources": report.get("data_sources"),
            "results": results,
            "timestamp": datetime.utcnow().isoformat()
        }

    except Exception as e:
        import traceback
        return {
            "status": "error",
            "error": str(e),
            "traceback": traceback.format_exc()
        }


@app.post("/api/reports/send-test/{phone}")
async def send_test_report_to_phone(phone: str):
    """إرسال تقرير تجريبي لرقم محدد - نص + PDF"""
    from .reporters.smart_report import SmartReportGenerator
    from .scheduler.jobs import upload_pdf_and_get_url
    from datetime import timedelta

    whatsapp = UltraMsgClient()
    generator = SmartReportGenerator()

    try:
        # إنشاء التقرير
        report = await generator.generate_daily_report()
        report_date = date.today() - timedelta(days=1)

        # إرسال النص
        text_result = await whatsapp.send_message(phone, report["text"])

        # إرسال PDF لنفس الرقم
        pdf_result = None
        pdf_path = report.get("pdf_path")
        if pdf_path and os.path.exists(pdf_path):
            pdf_url = await upload_pdf_and_get_url(pdf_path)
            if pdf_url:
                pdf_result = await whatsapp.send_document(
                    phone, pdf_url,
                    f"Golden_Host_Report_{report_date.strftime('%Y%m%d')}.pdf"
                )

        # تنظيف PDF
        if pdf_path and os.path.exists(pdf_path):
            os.remove(pdf_path)

        return {
            "status": "sent",
            "phone": phone,
            "report_date": report.get("date"),
            "data_sources": report.get("data_sources"),
            "text_result": text_result,
            "pdf_result": pdf_result,
            "timestamp": datetime.utcnow().isoformat()
        }

    except Exception as e:
        import traceback
        return {
            "status": "error",
            "error": str(e),
            "traceback": traceback.format_exc()
        }


# ==================== Golden Host Dashboard ====================

@app.get("/goldenhost", response_class=HTMLResponse)
async def goldenhost_dashboard():
    """صفحة داشبورد Golden Host"""
    from fastapi.templating import Jinja2Templates
    templates_dir = os.path.join(os.path.dirname(__file__), "templates")
    templates = Jinja2Templates(directory=templates_dir)
    from starlette.requests import Request
    # Return HTML file directly
    with open(os.path.join(templates_dir, "goldenhost.html"), "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())


@app.get("/api/goldenhost/reports")
async def get_goldenhost_reports():
    """جلب آخر البلاغات"""
    from .collectors.firebase_collector import FirebaseCollector
    try:
        firebase = FirebaseCollector()
        reports = await firebase.get_reports(10)
        return reports
    except Exception as e:
        return []


@app.get("/api/goldenhost/refunds")
async def get_goldenhost_refunds():
    """جلب آخر الاستردادات"""
    from .collectors.firebase_collector import FirebaseCollector
    try:
        firebase = FirebaseCollector()
        refunds = await firebase.get_refunds(10)
        return refunds
    except Exception as e:
        return []


@app.get("/api/goldenhost/employees")
async def get_goldenhost_employees():
    """جلب أداء الموظفين"""
    from .collectors.firebase_collector import FirebaseCollector
    try:
        firebase = FirebaseCollector()
        employees = await firebase.get_employee_performance()
        return employees if employees else []
    except Exception as e:
        return []


@app.get("/api/goldenhost/stats")
async def get_goldenhost_stats():
    """جلب إحصائيات Golden Host"""
    from .collectors.firebase_collector import FirebaseCollector
    from .collectors.google_analytics import GoogleAnalyticsCollector
    try:
        firebase = FirebaseCollector()
        today = date.today()
        daily_data = await firebase.get_daily_summary(today)

        # GA data
        ga_data = {}
        try:
            ga = GoogleAnalyticsCollector()
            ga_result = await ga.collect_daily_report()
            if ga_result.get('status') == 'success':
                ga_data = ga_result['data']
        except:
            pass

        return {
            "status": "success",
            "golden_host": daily_data.get('golden_host', {}),
            "analytics": ga_data
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}


# ==================== Run ====================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
