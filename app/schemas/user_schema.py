from datetime import datetime

from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    username: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token:str
    token_type:str
