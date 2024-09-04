from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from app.crud.user_crud import get_user_by_id
from app.db.session import get_db
from app.models.user_model import User
from app.schemas.token_schema import TokenData

SECRET_KEY = "1111-1111-1111-1111"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/token")


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM], options={"verify_exp": False})
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        token_data = TokenData(user_id=user_id)
    except Exception as e:
        print(e)
        raise credentials_exception
    user = get_user_by_id(token_data.user_id)
    if user is None:
        raise credentials_exception
    return user