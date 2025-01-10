import sys
from dotenv import load_dotenv

load_dotenv()
sys.path = sys.path + ["./app"]

from fastapi import FastAPI
from pydantic import BaseModel
from services.llm_service import LLMService
from fastapi.responses import JSONResponse

app = FastAPI()
llm_service = LLMService()

LANGUAGE_DICT = {
    "pt": "Português",
    "en": "Inglês",
    "es": "Espanhol",
}

class TextData(BaseModel):
    text: str
    lang: str


@app.post("/summarize")
async def summarize(data: TextData):
    text = data.text
    lang = data.lang
    summarize_text = llm_service.summarize_text(text, LANGUAGE_DICT[lang])
    return JSONResponse(content={"response": summarize_text})

@app.post("/translator")
async def translator(data: TextData):
    text = data.text
    lang = data.lang
    if lang not in LANGUAGE_DICT:
        raise ValueError(f"Language not supported")
    translated_text = llm_service.translator_text(text, LANGUAGE_DICT[lang])
    return JSONResponse(content={"response": translated_text})
