from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SecretBase(BaseModel):
    secrect_key: str
    key_details: Optional[str] = None
    password: Optional[str] = None
    password_visible: Optional[bool] = False

class SecretCreate(SecretBase):
    pass

class SecretUpdate(SecretBase):
    pass

class SecretOut(SecretBase):
    id: int
    owner_id: int
    created_date: datetime
    updated_date: datetime
    is_deleted: bool

    class Config:
        orm_mode = True

class Secret(SecretOut):
    pass
