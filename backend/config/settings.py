from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")
    GEMINI_API_KEY: str
    GEMINI_MODEL: str
    MONGODB_URL: str
    DATABASE_NAME: str

settings = Settings()