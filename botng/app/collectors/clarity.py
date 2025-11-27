from datetime import datetime, date
from typing import Dict, Any, Optional
import httpx

from ..database import SessionLocal, ClarityData
from ..config import settings


class ClarityCollector:
    """جامع بيانات Microsoft Clarity

    ملاحظة: Clarity ليس لديه API رسمي للسحب المباشر.
    الخيارات المتاحة:
    1. تصدير يدوي من لوحة التحكم
    2. استخدام Clarity Insights API (محدود)
    3. Web scraping (غير موصى به)
    4. تكامل مع Google Analytics إذا مربوط

    هذا الكلاس يدعم:
    - إدخال البيانات يدوياً
    - استيراد من ملف CSV
    - API إذا توفر مستقبلاً
    """

    def __init__(self):
        self.db = SessionLocal()

    async def collect(self, report_date: date = None) -> Dict[str, Any]:
        """جمع البيانات - يتطلب إدخال يدوي حالياً"""
        return {
            "status": "manual_required",
            "message": "Clarity يتطلب إدخال يدوي للبيانات",
            "instructions": "استخدم /api/data/clarity/import لإدخال البيانات"
        }

    async def import_data(self, data: Dict[str, Any], report_date: date = None) -> Dict[str, Any]:
        """استيراد بيانات Clarity"""

        if report_date is None:
            report_date = date.today()

        try:
            # التحقق من وجود سجل سابق
            existing = self.db.query(ClarityData).filter(
                ClarityData.date == datetime.combine(report_date, datetime.min.time())
            ).first()

            if existing:
                # تحديث السجل
                existing.visitors = data.get("visitors", 0)
                existing.sessions = data.get("sessions", 0)
                existing.page_views = data.get("page_views", 0)
                existing.avg_session_duration = data.get("avg_session_duration", 0)
                existing.bounce_rate = data.get("bounce_rate", 0)
                existing.top_pages = data.get("top_pages", [])
                existing.raw_data = data
            else:
                # إنشاء سجل جديد
                record = ClarityData(
                    date=datetime.combine(report_date, datetime.min.time()),
                    visitors=data.get("visitors", 0),
                    sessions=data.get("sessions", 0),
                    page_views=data.get("page_views", 0),
                    avg_session_duration=data.get("avg_session_duration", 0),
                    bounce_rate=data.get("bounce_rate", 0),
                    top_pages=data.get("top_pages", []),
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

    async def import_from_csv(self, csv_content: str) -> Dict[str, Any]:
        """استيراد بيانات من ملف CSV"""
        import csv
        from io import StringIO

        results = []
        reader = csv.DictReader(StringIO(csv_content))

        for row in reader:
            try:
                report_date = datetime.strptime(row.get("date", ""), "%Y-%m-%d").date()
                data = {
                    "visitors": int(row.get("visitors", 0)),
                    "sessions": int(row.get("sessions", 0)),
                    "page_views": int(row.get("page_views", 0)),
                    "avg_session_duration": float(row.get("avg_session_duration", 0)),
                    "bounce_rate": float(row.get("bounce_rate", 0))
                }
                result = await self.import_data(data, report_date)
                results.append(result)
            except Exception as e:
                results.append({"status": "error", "row": row, "message": str(e)})

        return {
            "status": "completed",
            "imported": len([r for r in results if r.get("status") == "success"]),
            "errors": len([r for r in results if r.get("status") == "error"]),
            "results": results
        }

    def get_latest(self) -> Optional[Dict[str, Any]]:
        """جلب أحدث البيانات"""
        record = self.db.query(ClarityData).order_by(ClarityData.date.desc()).first()

        if record:
            return {
                "date": record.date.isoformat(),
                "visitors": record.visitors,
                "sessions": record.sessions,
                "page_views": record.page_views,
                "avg_session_duration": record.avg_session_duration,
                "bounce_rate": record.bounce_rate,
                "top_pages": record.top_pages
            }
        return None

    def __del__(self):
        self.db.close()
