from fastapi import FastAPI, Query
from app.services.gmail_service import get_processed_emails
from app.schemas.email_schema import EmailResponse

app = FastAPI(
    title="InboxPilot API",
    description="AI-powered email classification and priority scoring backend",
    version="1.0.0"
)


@app.get("/")
def home():
    return {"message": "InboxPilot backend is running"}


@app.get("/emails", response_model=EmailResponse)
def get_emails(
    limit: int = Query(default=10, ge=1, le=50),
    category: str | None = None,
    min_score: int | None = Query(default=None, ge=0, le=100)
):
    data = get_processed_emails(
        limit=limit,
        category=category,
        min_score=min_score
    )
    return data