# app/crud/note_crud.py  
from datetime import datetime
from app.db.session import get_db
from app.schemas.note_schema import NoteCreate, NoteUpdate
from app.models.note_model import Note


def row_to_note(row):
    return Note(
        id=row[0],
        title=row[1],
        content=row[2],
        owner_id=row[3],
        created_at=row[4],
        updated_at=row[5]
    )


def get_note_by_id(note_id: int):
    with get_db() as cursor:
        cursor.execute("SELECT id, title, content, owner_id, created_at, updated_at FROM notes WHERE id = ?",
                       (note_id,))
        row = cursor.fetchone()
        if row:
            return row_to_note(row)
        return None


def get_notes(user_id: int, skip: int = 0, limit: int = 10):
    with get_db() as cursor:
        cursor.execute(
            "SELECT id, title, content, owner_id, created_at, updated_at FROM notes WHERE owner_id = ? ORDER BY id OFFSET ? ROWS FETCH NEXT ? ROWS ONLY",
            (user_id, skip, limit))
        rows = cursor.fetchall()
        return [row_to_note(row) for row in rows]


def create_note(note: NoteCreate, user_id: int):
    created_at = datetime.utcnow()
    updated_at = datetime.utcnow()

    with get_db() as cursor:
        try:
            cursor.execute("""  
                INSERT INTO notes (title, content, owner_id, created_at, updated_at)  
                VALUES (?, ?, ?, ?, ?)  
            """, (note.title, note.content, user_id, created_at, updated_at))
            cursor.connection.commit()

            cursor.execute("SELECT @@IDENTITY AS id")  # Get the last inserted ID
            note_id = cursor.fetchone()[0]
        except Exception as e:
            cursor.connection.rollback()
            raise e

    return Note(
        id=note_id,
        title=note.title,
        content=note.content,
        owner_id=user_id,
        created_at=created_at,
        updated_at=updated_at
    )


def update_note(note_id: int, note: NoteUpdate):
    updated_at = datetime.utcnow()

    with get_db() as cursor:
        cursor.execute("""  
            UPDATE notes  
            SET title = ?, content = ?, updated_at = ?  
            WHERE id = ?  
        """, (note.title, note.content, updated_at, note_id))
        cursor.connection.commit()

    return get_note_by_id(note_id)


def delete_note(note_id: int):
    with get_db() as cursor:
        cursor.execute("DELETE FROM notes WHERE id = ?", (note_id,))
        cursor.connection.commit()