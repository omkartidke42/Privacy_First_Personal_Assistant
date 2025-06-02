from fastapi import FastAPI, Depends, HTTPException 
# FastAPI - main class to create FastApi app
# Depends - used to declare dependencies
# HTTPException - used to rendering errors
from sqlalchemy.orm import Session
# Session : used to interact with database
from app.api.auth import authenticate_user, create_access_token, get_current_user, get_db
# authenticate_user: A function to verify username/password.
# create_access_token: Generates a JWT token for authenticated users.
# get_current_user: A dependency to get the user from the token.
# get_db: A dependency that provides a database session.
# from app.schemas.user import User
# import user model where table is created
from fastapi.security import OAuth2PasswordRequestForm
# Provides an input form schema for receiving username/password from a login form.
# Required by OAuth2 standards.
from app.utils import get_password_hash
# used for hashing passsword
from app.database import Base, engine
# Imports database metadata and engine.
from app.schemas.loginInput import LoginInput
from app.schemas.RegisterInput import RegisterInput
from app.services.email.routes import router as email_router
from fastapi.middleware.cors import CORSMiddleware
from app.models.user import User 



Base.metadata.create_all(bind=engine)
# create_all(): Automatically creates all tables defined in Base (in your case, the User table) if they don't already exist.
#engine and base is defined in database.py file
app = FastAPI()


app.include_router(email_router, prefix="/email", tags=["email"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  # allow all headers
)
@app.post("/register")
def register_user(credentials: RegisterInput, db: Session = Depends(get_db)):
    print("API Hit")

    user = db.query(User).filter(User.username == credentials.username).first()
    if user:
        raise HTTPException(status_code=400, detail="Username already exists")

    new_user = User(
        username=credentials.username,
        email=credentials.email,
        hashed_password=get_password_hash(credentials.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"msg": "User created"}



@app.post("/token")
def login(credentials: LoginInput, db: Session = Depends(get_db)):
    user = authenticate_user(db, credentials.email, credentials.password)
    # Verifies credentials using the custom authenticate_user function.
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/protected")
def protected_route(current_user: RegisterInput = Depends(get_current_user)):
    return {"message": f"Hello, {current_user.username}! This is a protected route."}

@app.get("/")
def read_root():
    return {"message": "FastAPI with SQLite is running"}