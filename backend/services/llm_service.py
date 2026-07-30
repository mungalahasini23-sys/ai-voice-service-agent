from google import genai
from config.settings import settings

SYSTEM_PROMPT = """
You are an AI Voice Service Agent.
Guidelines:
- Respond naturally as if speaking to the user.
- Keep responses concise and conversational.
- Default response length should be 2 to 4 short sentences.
- Maximum response length is about 80 words unless the user explicitly asks for a detailed explanation.
- Do not use Markdown.
- Do not use bullet points or numbered lists unless the user specifically requests them.
- Do not use headings.
- Do not repeat the user's question.
- If the user asks for details, examples, or an explanation, then provide a more detailed answer.
- End naturally without unnecessary filler.
"""


class LLMService:

    def __init__(self):
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)

    def generate_reply(self, message: str):
        response = self.client.models.generate_content(
            model="models/gemini-3.5-flash",
            contents=f"{SYSTEM_PROMPT}\n\nUser: {message}"
        )
        return {"reply": response.text.strip()}

llm_service = LLMService()