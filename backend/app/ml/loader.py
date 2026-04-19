import spacy
import tiktoken

enc = None
nlp = None

def get_enc():
    global enc

    if enc is None:
        enc = tiktoken.get_encoding("cl100k_base")
    return enc

def get_nlp():
    global nlp
    if nlp is None:
        nlp = spacy.load("en_core_web_sm")
    return nlp

def get_model():
    get_enc()
    get_nlp()
