from datetime import datetime
from app.db.session import get_db
from app.schemas.secret_schema import SecretCreate, SecretUpdate
from app.models.secret_model import Secret

def row_to_secret(row):
    return Secret(
        id=row[0],
        secrect_key=row[1],
        key_details=row[2],
        password=row[3],
        password_visible=row[4],
        owner_id=row[5],
        created_date=row[6],
        updated_date=row[7],
        is_deleted=row[8]
    )

def get_secret_by_id(secret_id: str):
    with get_db() as cursor:
        cursor.execute("SELECT id, secrect_key, key_details, password, password_visible, owner_id, created_date, updated_date, is_deleted FROM secrets WHERE id = ? AND is_deleted = 0",
                       (secret_id,))
        row = cursor.fetchone()
        if row:
            return row_to_secret(row)
        return None

def get_secrets(user_id: str, skip: int = 0, limit: int = 10):
    with get_db() as cursor:
        cursor.execute(
            "SELECT id, secrect_key, key_details, password, password_visible, owner_id, created_date, updated_date, is_deleted FROM secrets WHERE owner_id = ? AND is_deleted = 0 ORDER BY created_date DESC OFFSET ? ROWS FETCH NEXT ? ROWS ONLY",
            (user_id, skip, limit))
        rows = cursor.fetchall()
        return [row_to_secret(row) for row in rows]

def create_secret(secret: SecretCreate, user_id: str):
    created_date = datetime.utcnow()
    updated_date = datetime.utcnow()

    with get_db() as cursor:
        try:
            cursor.execute("""  
                INSERT INTO secrets (secrect_key, key_details, password, password_visible, owner_id, created_date, updated_date)  
                VALUES (?, ?, ?, ?,  ?, ?, ?)  
            """, (secret.secrect_key, secret.key_details, secret.password, secret.password_visible,  user_id, created_date, updated_date))
            cursor.connection.commit()

            cursor.execute("SELECT @@IDENTITY AS id")  # Get the last inserted ID
            secret_id = cursor.fetchone()[0]
        except Exception as e:
            cursor.connection.rollback()
            raise e

    return Secret(
        id=secret_id,
        secrect_key=secret.secrect_key,
        key_details=secret.key_details,
        password=secret.password,
        password_visible=secret.password_visible,
        owner_id=user_id,
        created_date=created_date,
        updated_date=updated_date,
        is_deleted=False
    )

def update_secret(secret_id: str, secret: SecretUpdate):
    updated_date = datetime.utcnow()

    with get_db() as cursor:
        cursor.execute("""  
            UPDATE secrets  
            SET secrect_key = ?, key_details = ?, password = ?, password_visible = ?,  updated_date = ?  
            WHERE id = ? AND is_deleted = 0  
        """, (secret.secrect_key, secret.key_details, secret.password, secret.password_visible,  updated_date, secret_id))
        cursor.connection.commit()

    return get_secret_by_id(secret_id)

def delete_secret(secret_id: str):
    with get_db() as cursor:
        cursor.execute("""  
            UPDATE secrets  
            SET is_deleted = 1  
            WHERE id = ?  
        """, (secret_id,))
        cursor.connection.commit()
