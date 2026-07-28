class LLMService:
    def generate_reply(self,message: str):
        return { "reply": f"You said: {message}"}
llm_service = LLMService()