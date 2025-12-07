from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    database_url: str = "postgresql://user:password@localhost:5432/botng"

    # OpenAI
    openai_api_key: str = ""
    openai_model: str = "gpt-4-turbo-preview"

    # Ultra Message (WhatsApp)
    ultramsg_instance_id: str = ""
    ultramsg_token: str = ""

    # WhatsApp Group for Reports (معطل حالياً - الإرسال لرقم الأدمن فقط)
    report_group_id: str = ""  # قروب تطوير و جودة قولدن هوست

    # Google Analytics 4
    ga4_property_id: str = ""
    google_credentials_path: str = "credentials/google-service-account.json"

    # Firebase
    firebase_database_url: str = ""

    # App Settings
    report_time: str = "11:00"  # وقت التقرير اليومي - 11 صباحاً بتوقيت الرياض
    admin_phone: str = "966563652525"  # رقم واتساب الأدمن
    debug: bool = True

    # Crash Alerts - أرقام خاصة لتنبيهات الـ Crashes (مفصولة بفاصلة)
    crash_alert_recipients: str = "966532263391,966563652525"

    # API Base URLs
    ultramsg_base_url: str = "https://api.ultramsg.com"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
