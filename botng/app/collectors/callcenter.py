from datetime import datetime, date
from typing import Dict, Any, Optional, List
import httpx

from ..database import SessionLocal, CallCenterData
from ..config import settings


class CallCenterCollector:
    """جامع بيانات الكول سنتر

    يدعم عدة أنظمة:
    - Genesys Cloud
    - Asterisk/FreePBX
    - 3CX
    - Avaya
    - إدخال يدوي

    ملاحظة: يتطلب تحديد النظام المستخدم لتفعيل التكامل المناسب
    """

    def __init__(self, system_type: str = "manual"):
        self.db = SessionLocal()
        self.system_type = system_type

    async def collect(self, report_date: date = None) -> Dict[str, Any]:
        """جمع البيانات من نظام الكول سنتر"""

        if self.system_type == "manual":
            return {
                "status": "manual_required",
                "message": "يتطلب إدخال يدوي للبيانات",
                "instructions": "استخدم /api/data/callcenter/import"
            }

        # هنا يمكن إضافة تكاملات مع أنظمة مختلفة
        # مثال: Genesys Cloud API
        if self.system_type == "genesys":
            return await self._collect_from_genesys(report_date)

        # مثال: 3CX API
        if self.system_type == "3cx":
            return await self._collect_from_3cx(report_date)

        return {"status": "unsupported", "message": f"النظام {self.system_type} غير مدعوم حالياً"}

    async def import_data(self, data: Dict[str, Any], report_date: date = None) -> Dict[str, Any]:
        """استيراد بيانات الكول سنتر"""

        if report_date is None:
            report_date = date.today()

        try:
            existing = self.db.query(CallCenterData).filter(
                CallCenterData.date == datetime.combine(report_date, datetime.min.time())
            ).first()

            if existing:
                existing.total_calls = data.get("total_calls", 0)
                existing.answered_calls = data.get("answered_calls", 0)
                existing.missed_calls = data.get("missed_calls", 0)
                existing.avg_wait_time = data.get("avg_wait_time", 0)
                existing.avg_call_duration = data.get("avg_call_duration", 0)
                existing.agent_stats = data.get("agent_stats", {})
                existing.raw_data = data
            else:
                record = CallCenterData(
                    date=datetime.combine(report_date, datetime.min.time()),
                    total_calls=data.get("total_calls", 0),
                    answered_calls=data.get("answered_calls", 0),
                    missed_calls=data.get("missed_calls", 0),
                    avg_wait_time=data.get("avg_wait_time", 0),
                    avg_call_duration=data.get("avg_call_duration", 0),
                    agent_stats=data.get("agent_stats", {}),
                    raw_data=data
                )
                self.db.add(record)

            self.db.commit()

            return {
                "status": "success",
                "date": report_date.isoformat(),
                "data": data
            }

        except Exception as e:
            self.db.rollback()
            return {
                "status": "error",
                "message": str(e)
            }

    async def import_agent_stats(self, agents: List[Dict[str, Any]], report_date: date = None) -> Dict[str, Any]:
        """استيراد إحصائيات الموظفين"""

        if report_date is None:
            report_date = date.today()

        # حساب الإجماليات
        total_calls = sum(a.get("calls", 0) for a in agents)
        answered_calls = sum(a.get("answered", 0) for a in agents)
        missed_calls = sum(a.get("missed", 0) for a in agents)

        # حساب المتوسطات
        if agents:
            avg_wait = sum(a.get("avg_wait_time", 0) for a in agents) / len(agents)
            avg_duration = sum(a.get("avg_duration", 0) for a in agents) / len(agents)
        else:
            avg_wait = 0
            avg_duration = 0

        data = {
            "total_calls": total_calls,
            "answered_calls": answered_calls,
            "missed_calls": missed_calls,
            "avg_wait_time": avg_wait,
            "avg_call_duration": avg_duration,
            "agent_stats": agents
        }

        return await self.import_data(data, report_date)

    async def _collect_from_genesys(self, report_date: date) -> Dict[str, Any]:
        """جمع البيانات من Genesys Cloud"""
        # يتطلب تكوين:
        # - GENESYS_CLIENT_ID
        # - GENESYS_CLIENT_SECRET
        # - GENESYS_REGION
        return {"status": "not_configured", "message": "Genesys غير مُعد"}

    async def _collect_from_3cx(self, report_date: date) -> Dict[str, Any]:
        """جمع البيانات من 3CX"""
        # يتطلب تكوين:
        # - 3CX_API_URL
        # - 3CX_API_KEY
        return {"status": "not_configured", "message": "3CX غير مُعد"}

    def get_latest(self) -> Optional[Dict[str, Any]]:
        """جلب أحدث البيانات"""
        record = self.db.query(CallCenterData).order_by(CallCenterData.date.desc()).first()

        if record:
            return {
                "date": record.date.isoformat(),
                "total_calls": record.total_calls,
                "answered_calls": record.answered_calls,
                "missed_calls": record.missed_calls,
                "avg_wait_time": record.avg_wait_time,
                "avg_call_duration": record.avg_call_duration,
                "agent_stats": record.agent_stats
            }
        return None

    def get_answer_rate(self, report_date: date = None) -> float:
        """حساب نسبة الرد"""
        if report_date is None:
            data = self.get_latest()
        else:
            record = self.db.query(CallCenterData).filter(
                CallCenterData.date == datetime.combine(report_date, datetime.min.time())
            ).first()
            data = record.__dict__ if record else None

        if data and data.get("total_calls", 0) > 0:
            return (data.get("answered_calls", 0) / data.get("total_calls", 1)) * 100
        return 0

    def __del__(self):
        self.db.close()
