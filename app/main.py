from fastapi import FastAPI
from app.api.v1.endpoints import users, tasks, notes, auth
from app.db.base import Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # List of allowed origins (e.g., ["http://localhost", "https://example.com"])
    allow_credentials=True,
    allow_methods=["*"],  # List of allowed methods (e.g., ["GET", "POST"])
    allow_headers=["*"],  # List of allowed headers (e.g., ["Authorization", "Content-Type"])
)

# Include routes
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
app.include_router(notes.router, prefix="/notes", tags=["notes"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
