

from models.schemas import ChatRequest


def chat(req: ChatRequest):
    print(req)