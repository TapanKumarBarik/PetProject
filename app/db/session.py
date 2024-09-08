import os

import pyodbc
from contextlib import contextmanager

from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

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