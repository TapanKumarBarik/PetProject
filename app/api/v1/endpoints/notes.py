# app/api/v1/endpoints/notes.py  
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.crud import note_crud
from app.schemas import note_schema
from app.dependencies import get_current_user
from app.models.user_model import User

router = APIRouter()


@router.post("/", response_model=note_schema.Note)
def create_note(
        note: note_schema.NoteCreate,
        current_user: User = Depends(get_current_user),
):
    return note_crud.create_note(note=note, user_id=current_user.id)


@router.get("/", response_model=List[note_schema.Note])
def read_notes(
        skip: int = 0, limit: int = 10,
        current_user: User = Depends(get_current_user),
):
    return note_crud.get_notes(user_id=current_user.id, skip=skip, limit=limit)


@router.get("/{note_id}", response_model=note_schema.Note)
def read_note(
        note_id: int,
        current_user: User = Depends(get_current_user),
):
    db_note = note_crud.get_note_by_id(note_id=note_id)
    if db_note is None or db_note.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Note not found")
    return db_note


@router.put("/{note_id}", response_model=note_schema.Note)
def update_note(
        note_id: int, note: note_schema.NoteUpdate,
        current_user: User = Depends(get_current_user),
):
    db_note = note_crud.update_note(note_id=note_id, note=note)
    if db_note is None or db_note.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Note not found")
    return db_note


@router.delete("/{note_id}", response_model=note_schema.Note)
def delete_note(
        note_id: int,
        current_user: User = Depends(get_current_user),
):
    db_note = note_crud.delete_note(note_id=note_id)
    if db_note is None or db_note.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Note not found")
    return db_note  