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
    ultramsg_phone: str = ""

    # App Settings
    admin_phone: str = ""
    report_time: str = "08:00"
    debug: bool = True

    # API Base URLs
    ultramsg_base_url: str = "https://api.ultramsg.com"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
