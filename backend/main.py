from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from auth import authenticate_user, create_access_token, get_current_user, get_db
from models import User
from fastapi.security import OAuth2PasswordRequestForm
from utils import get_password_hash
from database import Base, engine
from schemas import LoginInput


Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post("/register")
def register_user(username: str, email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if user:
        raise HTTPException(status_code=400, detail="Username already exists")
    new_user = User(
        username=username,
        email=email,
        hashed_password=get_password_hash(password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"msg": "User created"}


@app.post("/token")
def login(credentials: LoginInput, db: Session = Depends(get_db)):
    user = authenticate_user(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/protected")
def protected_route(current_user: User = Depends(get_current_user)):
    return {"message": f"Hello, {current_user.username}! This is a protected route."}

@app.get("/")
def read_root():
    return {"message": "FastAPI with SQLite is running"}