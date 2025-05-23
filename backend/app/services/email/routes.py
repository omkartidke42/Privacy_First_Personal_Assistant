# backend/app/email/routes.py

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.services.email.email_service import fetch_recent_emails

router = APIRouter()

class EmailLogin(BaseModel):
    email: str
    password: str

@router.post("/emails")
def get_emails(credentials: EmailLogin):
    emails = fetch_recent_emails(credentials.email, credentials.password)
    if "error" in emails:
        raise HTTPException(status_code=500, detail=emails["error"])
    return {"emails": emails}

# yyvd azdp vxtu rigj
