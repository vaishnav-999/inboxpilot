from pydantic import BaseModel
from typing import Dict, List


class EmailItem(BaseModel):
    message_id: str
    sender: str
    subject: str
    date: str
    snippet: str
    category: str
    priority_score: int


class EmailResponse(BaseModel):
    total_emails: int
    average_priority_score: float
    category_summary: Dict[str, int]
    emails: List[EmailItem]