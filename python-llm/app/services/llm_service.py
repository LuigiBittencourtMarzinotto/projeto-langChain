import os
from langchain_openai import OpenAI


class LLMService:
    def __init__(self):
        # Aqui assumimos que há uma variável de ambiente HF_TOKEN configurada.
        self.llm = OpenAI(
            temperature=0.5,
            top_p=0.7,
            api_key=os.getenv("HF_TOKEN"),  # type: ignore
            base_url="https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct/v1",
        )

    def summarize_text(self, text: str, lang: str) -> str:
        prompt = f"Você receberá um texto. Faça um resumo do conteúdo e, ao final, informe que o cliente solicitou a tradução para a língua {lang}. Texto: {text}"
        response = self.llm.invoke(prompt)
        return response
    
    def translator_text(self, text: str, lang: str) -> str:
        prompt = f"Traduzir o seguinte texto para {lang} e forneça apenas o texto traduzido: {text}"
        response = self.llm.invoke(prompt)
        return response
