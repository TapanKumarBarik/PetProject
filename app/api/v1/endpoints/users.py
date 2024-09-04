from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext

from app.core.security import create_access_token
from app.schemas.user_schema import UserCreate, UserOut, Token
from app.crud.user_crud import create_user, get_user_by_email



router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


SECRET_KEY = "1111-1111-1111-1111"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30



@router.post("/register", response_model=UserOut)
def register_user(user: UserCreate):
    db_user = get_user_by_email( email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    ## need to do get email by user name
    return create_user( user)

@router.post("/login", response_model=Token)
def login_for_access_token( form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user_by_email( form_data.username)  # Changed to get by email
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
