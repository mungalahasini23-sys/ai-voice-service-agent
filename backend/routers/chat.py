from fastapi import APIRouter
from models.chat import ChatRequest
from services.chat_service import chat_service

router = APIRouter(prefix="/chat",tags=["Chat"])
@router.post("")
def chat(request: ChatRequest):
    return chat_service.chat(request.message)