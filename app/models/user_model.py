from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship

from app.db.base import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    createdate = Column(DateTime, default=datetime.utcnow)
    updatedate = Column(DateTime, default=datetime.utcnow,onupdate=datetime.utcnow())


    # Add the relationship to tasks
    tasks = relationship("Task", back_populates="owner")  # Assuming Task has a corresponding "owner" relationship
    notes = relationship("Note", back_populates="user")
    secrets = relationship("Secret", back_populates="owner")
    # Relationship with the notes table