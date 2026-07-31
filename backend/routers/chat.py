from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from database import get_db
from models.chat import ChatRequest
from services.chat_service import chat_service

router = APIRouter(prefix="/chat",tags=["Chat"])
@router.post("")
def chat(request: ChatRequest, db: Session = Depends(get_db)):
    return chat_service.chat(db=db,message=request.message,session_id=request.session_id)