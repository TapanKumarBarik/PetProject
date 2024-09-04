import os

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    ODBC_CONNECTION_STRING: str="DRIVER={SQL Server Native Client 11.0};Server=.\SQLEXPRESS;Database=TAPAN;Trusted_Connection=yes;"
    class Config:
        env_file = ".env"

settings = Settings()
connection_string=settings.ODBC_CONNECTION_STRING
