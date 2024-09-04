from fastapi import FastAPI
from app.api.v1.endpoints import users, tasks, notes, auth
from app.db.base import Base

# Create all tables in the database

app = FastAPI()

# Include routes
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
app.include_router(notes.router, prefix="/notes", tags=["notes"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
