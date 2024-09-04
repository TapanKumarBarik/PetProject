import pyodbc
from contextlib import contextmanager

from app.core.config import settings

DATABASE_URL = settings.ODBC_CONNECTION_STRING

@contextmanager
def get_db():
    conn=pyodbc.connect(DATABASE_URL)
    cursor=conn.cursor()
    try:
        yield cursor
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        conn.close()