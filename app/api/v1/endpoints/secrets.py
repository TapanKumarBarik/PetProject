from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.crud import secret_crud
from app.schemas import secret_schema
from app.dependencies import get_current_user
from app.models.user_model import User

router = APIRouter()

@router.post("/", response_model=secret_schema.Secret)
def create_secret(
        secret: secret_schema.SecretCreate,
        current_user: User = Depends(get_current_user),
):
    return secret_crud.create_secret(secret=secret, user_id=current_user.id)

@router.get("/", response_model=List[secret_schema.Secret])
def read_secrets(
        skip: int = 0, limit: int = 10,
        current_user: User = Depends(get_current_user),
):
    return secret_crud.get_secrets(user_id=current_user.id, skip=skip, limit=limit)

@router.get("/{secret_id}", response_model=secret_schema.Secret)
def read_secret(
        secret_id: str,
        current_user: User = Depends(get_current_user),
):
    db_secret = secret_crud.get_secret_by_id(secret_id=secret_id)
    if db_secret is None or db_secret.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Secret not found")
    return db_secret

@router.put("/{secret_id}", response_model=secret_schema.Secret)
def update_secret(
        secret_id: str, secret: secret_schema.SecretUpdate,
        current_user: User = Depends(get_current_user),
):
    db_secret = secret_crud.update_secret(secret_id=secret_id, secret=secret)
    if db_secret is None or db_secret.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Secret not found")
    return db_secret

@router.delete("/{secret_id}", response_model=secret_schema.Secret)
def delete_secret(
        secret_id: str,
        current_user: User = Depends(get_current_user),
):
    db_secret = secret_crud.delete_secret(secret_id=secret_id)
    if db_secret is None or db_secret.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Secret not found")
    return db_secret
