from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Boolean, Float, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from .config import settings

# Create engine
engine = create_engine(settings.database_url, echo=settings.debug)

# Session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base
Base = declarative_base()


# ==================== Models ====================

class Report(Base):
    """تقارير تم إنشاؤها"""
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    report_type = Column(String(50))  # daily, weekly, custom
    report_date = Column(DateTime, default=datetime.utcnow)
    content = Column(Text)
    data_snapshot = Column(JSON)  # البيانات الخام
    ai_analysis = Column(Text)  # تحليل OpenAI
    sent_to = Column(String(20))  # رقم الواتساب
    sent_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class ClarityData(Base):
    """بيانات Clarity"""
    __tablename__ = "clarity_data"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime)
    visitors = Column(Integer, default=0)
    sessions = Column(Integer, default=0)
    page_views = Column(Integer, default=0)
    avg_session_duration = Column(Float, default=0)
    bounce_rate = Column(Float, default=0)
    top_pages = Column(JSON)
    raw_data = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)


class CallCenterData(Base):
    """بيانات الكول سنتر"""
    __tablename__ = "callcenter_data"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime)
    total_calls = Column(Integer, default=0)
    answered_calls = Column(Integer, default=0)
    missed_calls = Column(Integer, default=0)
    avg_wait_time = Column(Float, default=0)  # بالثواني
    avg_call_duration = Column(Float, default=0)
    agent_stats = Column(JSON)  # إحصائيات كل موظف
    raw_data = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)


class WhatsAppMessage(Base):
    """سجل رسائل واتساب"""
    __tablename__ = "whatsapp_messages"

    id = Column(Integer, primary_key=True, index=True)
    direction = Column(String(10))  # incoming, outgoing
    phone = Column(String(20))
    message = Column(Text)
    message_type = Column(String(20))  # text, command, report
    processed = Column(Boolean, default=False)
    response = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class ScheduledJob(Base):
    """المهام المجدولة"""
    __tablename__ = "scheduled_jobs"

    id = Column(Integer, primary_key=True, index=True)
    job_name = Column(String(100))
    job_type = Column(String(50))  # daily_report, weekly_report, data_sync
    schedule = Column(String(50))  # cron expression or time
    is_active = Column(Boolean, default=True)
    last_run = Column(DateTime, nullable=True)
    next_run = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


# ==================== Database Functions ====================

def get_db():
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initialize database tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully")
