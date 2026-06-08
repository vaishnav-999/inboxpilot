import os
import base64
from email.utils import parsedate_to_datetime

from app.services.classifier_service import classify_email

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build


SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]


def get_gmail_service():
    creds = None

    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials.json",
                SCOPES
            )
            creds = flow.run_local_server(port=0)

        with open("token.json", "w") as token:
            token.write(creds.to_json())

    service = build("gmail", "v1", credentials=creds)
    return service


def get_processed_emails(limit=10, category=None, min_score=None):
    service = get_gmail_service()

    results = service.users().messages().list(
    userId="me",
    labelIds=["INBOX"],
    maxResults=limit
    ).execute()

    messages = results.get("messages", [])

    emails = []
    category_summary = {}
    total_score = 0

    for message in messages:
        msg = service.users().messages().get(
            userId="me",
            id=message["id"],
            format="full"
        ).execute()

        headers = msg["payload"].get("headers", [])

        subject = ""
        sender = ""
        date = ""

        for header in headers:
            if header["name"] == "Subject":
                subject = header["value"]
            elif header["name"] == "From":
                sender = header["value"]
            elif header["name"] == "Date":
                date = header["value"]

        snippet = msg.get("snippet", "")
        print("DEBUG:", sender, subject, snippet)
        classification = classify_email(sender,subject, snippet)

        email_data = {
            "message_id": message["id"],
            "sender": sender,
            "subject": subject,
            "date": date,
            "snippet": snippet,
            "category": classification["category"],
            "priority_score": classification["priority_score"],
        }

        emails.append(email_data)

        total_score += classification["priority_score"]

        email_category = classification["category"]
        category_summary[email_category] = category_summary.get(email_category, 0) + 1

def extract_email_body(payload):
    body = ""

    if "body" in payload and payload["body"].get("data"):
        body_data = payload["body"]["data"]
        body = base64.urlsafe_b64decode(body_data).decode("utf-8", errors="ignore")
        return body

    if "parts" in payload:
        for part in payload["parts"]:
            mime_type = part.get("mimeType", "")

            if mime_type == "text/plain":
                body_data = part.get("body", {}).get("data")

                if body_data:
                    body = base64.urlsafe_b64decode(body_data).decode(
                        "utf-8",
                        errors="ignore"
                    )
                    return body

            if "parts" in part:
                nested_body = extract_email_body(part)

                if nested_body:
                    return nested_body

    return body

def get_processed_emails(limit=10, category=None, min_score=None):
    service = get_gmail_service()

    results = service.users().messages().list(
        userId="me",
        labelIds=["INBOX"],
        maxResults=limit
    ).execute()

    messages = results.get("messages", [])

    emails = []

    for message in messages:
        msg = service.users().messages().get(
            userId="me",
            id=message["id"],
            format="full"
        ).execute()

        headers = msg["payload"].get("headers", [])

        subject = ""
        sender = ""
        date = ""

        for header in headers:
            if header["name"] == "Subject":
                subject = header["value"]
            elif header["name"] == "From":
                sender = header["value"]
            elif header["name"] == "Date":
                date = header["value"]

        snippet = msg.get("snippet", "")

        classification = classify_email(sender, subject, snippet)

        email_data = {
            "message_id": message["id"],
            "sender": sender,
            "subject": subject,
            "date": date,
            "snippet": snippet,
            "category": classification["category"],
            "priority_score": classification["priority_score"],
        }

        emails.append(email_data)

    emails.sort(key=lambda email: email["priority_score"], reverse=True)

    if category:
        emails = [
            email for email in emails
            if email["category"] == category
        ]

    if min_score is not None:
        emails = [
            email for email in emails
            if email["priority_score"] >= min_score
        ]

    category_summary = {}
    total_score = 0

    for email in emails:
        total_score += email["priority_score"]

        email_category = email["category"]
        category_summary[email_category] = category_summary.get(email_category, 0) + 1

    average_score = total_score / len(emails) if emails else 0

    return {
        "total_emails": len(emails),
        "average_priority_score": round(average_score, 2),
        "category_summary": category_summary,
        "emails": emails
    }
def get_email_by_id(message_id):
    service = get_gmail_service()

    msg = service.users().messages().get(
        userId="me",
        id=message_id,
        format="full"
    ).execute()

    headers = msg["payload"].get("headers", [])

    subject = ""
    sender = ""
    recipient = ""
    date = ""

    for header in headers:
        if header["name"] == "Subject":
            subject = header["value"]
        elif header["name"] == "From":
            sender = header["value"]
        elif header["name"] == "To":
            recipient = header["value"]
        elif header["name"] == "Date":
            date = header["value"]

    snippet = msg.get("snippet", "")
    body = extract_email_body(msg["payload"])

    classification = classify_email(sender, subject, snippet)

    return {
        "message_id": message_id,
        "sender": sender,
        "recipient": recipient,
        "subject": subject,
        "date": date,
        "snippet": snippet,
        "body": body,
        "category": classification["category"],
        "priority_score": classification["priority_score"],
    }