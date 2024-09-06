from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class Secret(Base):
    __tablename__ = 'secrets'

    id = Column(Integer, primary_key=True, index=True)
    secrect_key = Column(String, nullable=False)
    key_details = Column(String)
    password = Column(String)
    password_visible = Column(Boolean, default=False)
    owner_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_date = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False)

    owner = relationship("User", back_populates="secrets")
