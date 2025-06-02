# schemas.py
from pydantic import BaseModel

class LoginInput(BaseModel):
    email: str
    password: str

class RegisterInput(BaseModel):
    username: str
    email: str
    password: str