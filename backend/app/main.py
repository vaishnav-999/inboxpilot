from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from app.services.gmail_service import get_processed_emails, get_email_by_id
from app.schemas.email_schema import EmailResponse, EmailDetailResponse

app = FastAPI(
    title="InboxPilot API",
    description="AI-powered email classification and priority scoring backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
@app.get("/emails/{message_id}", response_model=EmailDetailResponse)
def get_email_detail(message_id: str):
    data = get_email_by_id(message_id)
    return data
