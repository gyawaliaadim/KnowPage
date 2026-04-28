import requests

def call_llm(prompt: str):
    url = "http://localhost:11434/api/generate"

    payload = {
        "model": "tinyllama",
        "prompt": prompt,
        "stream": False
    }

    res = requests.post(url, json=payload)
    print("Calling LLM...")
    return res.json()