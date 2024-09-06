from typing import Optional

from pydantic import BaseModel
from datetime import datetime


class TaskBase(BaseModel):
    title: str
    description: str
    is_completed:bool=False
    completed_at: Optional[datetime]=None
class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: str
    description: str
    is_completed: bool

class TaskOut(BaseModel):
    id: int
    title: str
    description: str
    is_completed: bool
    owner_id: int
    created_at: datetime
    updated_at: datetime


class Task(TaskBase):
    id:int
    owner_id:int
    created_at:datetime
    updated_at:datetime
    class Config:
        orm_mode = True