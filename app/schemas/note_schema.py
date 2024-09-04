from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NoteBase(BaseModel):
    title: str
    content: str

class NoteCreate(NoteBase):
    pass

class NoteUpdate(NoteBase):
    pass

class NoteOut(NoteBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class Note(NoteOut):
    pass