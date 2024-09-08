import os

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from passlib.context import CryptContext
from app.core.security import create_access_token
from app.schemas.token_schema import Token
from app.crud.user_crud import get_user_by_email
router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Load environment variables from .env file
load_dotenv()

# Retrieve and print environment variables
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))


@router.post("/token", response_model=Token)
def login_for_access_token( form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user_by_email( form_data.username)
    if not user or not pwd_context.verify(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
