import requests

from app.core.config import LLM_URL

def call_llm(prompt: str):
    url = f"{LLM_URL}/api/generate"

    payload = {
        "model": "tinyllama",
        "prompt": prompt,
        "stream": False
    }

    res = requests.post(url, json=payload)
    print("Calling LLM...")
    return res.json()