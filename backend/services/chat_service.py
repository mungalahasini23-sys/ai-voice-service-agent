from services.llm_service import llm_service

class ChatService:
    def chat(self,message:str):
        return llm_service.generate_reply(message)
chat_service = ChatService()