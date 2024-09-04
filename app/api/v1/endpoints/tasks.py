from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud import task_crud
from app.schemas import task_schema
from app.dependencies import get_current_user
from app.models.user_model import User

router = APIRouter()


@router.post("/", response_model=task_schema.Task)
def create_task(task: task_schema.TaskCreate, current_user: User = Depends(get_current_user)):
    return task_crud.create_task(task=task, user_id=current_user.id)


@router.get("/", response_model=List[task_schema.Task])
def read_tasks(skip: int = 0, limit: int = 10, current_user: User = Depends(get_current_user)):
    print(current_user)
    tasks = task_crud.get_tasks(skip=skip, limit=limit)
    return tasks


@router.get("/{task_id}", response_model=task_schema.Task)
def read_task(task_id: int, current_user: User = Depends(get_current_user)):
    db_task = task_crud.get_task(task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task


@router.delete("/{task_id}", response_model=task_schema.Task)
def delete_task(task_id: int, current_user: User = Depends(get_current_user)):
    db_task = task_crud.get_task(task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    task_crud.delete_task(task_id=task_id)
    return {"message": "Task not found"}


@router.put("/{task_id}", response_model=task_schema.Task)
def update_task(task_id: int, task: task_schema.TaskCreate, current_user: User = Depends(get_current_user)):
    db_task = task_crud.update_task(task_id=task_id, task=task)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task