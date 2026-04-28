from pydantic import BaseModel

class ChatRequest(BaseModel):
    pdf_id:str
    question:str
    


class ChatResponse(BaseModel):
    pass
