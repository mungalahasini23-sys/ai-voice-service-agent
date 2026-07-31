import uuid
from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.sql import func
from database import Base

class Conversation(Base):

    __tablename__ = "conversations"
    id = Column(Integer,primary_key=True,index=True)
    session_id = Column(String,unique=True,default=lambda: str(uuid.uuid4()))
    started_at = Column(DateTime(timezone=True),server_default=func.now())
    ended_at = Column(DateTime(timezone=True),nullable=True)
    status = Column(String,default="ACTIVE")