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

    # WhatsApp Group for Reports
    report_group_id: str = ""

    # Google Analytics 4
    ga4_property_id: str = ""
    google_credentials_path: str = "credentials/google-service-account.json"

    # Firebase
    firebase_database_url: str = ""

    # App Settings
    report_time: str = "11:00"
    debug: bool = True

    # API Base URLs
    ultramsg_base_url: str = "https://api.ultramsg.com"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
