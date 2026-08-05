from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "TechPath API"
    debug: bool = True
    database_url: str = "sqlite:///./techpath.db"
    secret_key: str = "change-me-in-prod"
    access_token_expire_minutes: int = 60 * 24 * 7

    # AI（LangChain + DeepSeek）
    ai_api_key: str = ""
    ai_model: str = "deepseek-chat"
    ai_base_url: str = "https://api.deepseek.com"
    ai_daily_limit: int = 20
    ai_mock: bool = True  # 开发期无 Key 时走 mock


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()