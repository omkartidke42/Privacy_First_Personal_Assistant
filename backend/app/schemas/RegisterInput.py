# from sqlalchemy import Column, Integer, String
# from app.database import Base
# from pydantic import BaseModel


# class User(BaseModel):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, unique=True, index=True, nullable=False)
#     email = Column(String, unique=True, index=True, nullable=False)
#     hashed_password = Column(String, nullable=False)

# schemas/user.py
# from pydantic import BaseModel

# class User(BaseModel):
#     # id: int
#     username: str
#     email: str
#     passsword:str

#     class Config:
#         from_attributes = True  # Pydantic v2 equivalent of orm_mode

# app/schemas/RegisterInput.py

from pydantic import BaseModel, EmailStr

class RegisterInput(BaseModel):
    username: str
    email: EmailStr
    password: str
