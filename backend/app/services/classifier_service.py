CATEGORY_KEYWORDS = {
    "suspicious": [
        "view my recent images",
        "photosly",
        "you won",
        "lottery",
        "prize",
        "claim now",
        "urgent action required"
    ],

    "security": [
        "otp",
        "verification",
        "verify",
        "password",
        "reset",
        "login",
        "sign-in",
        "authentication",
        "security alert",
        "account recovery",
        "mfa",
        "2fa",
        "mpin"
    ],

    "job_application": [
        "interview",
        "application",
        "applied",
        "assessment",
        "shortlisted",
        "selected",
        "recruiter",
        "hiring",
        "job",
        "career",
        "internship",
        "resume",
        "offer letter"
    ],

    "education": [
        "course",
        "class",
        "workshop",
        "masterclass",
        "assignment",
        "lecture",
        "session",
        "batch",
        "devops",
        "dsa",
        "linked list",
        "geeksforgeeks",
        "udemy",
        "certification",
        "instructor"
    ],

    "receipt": [
        "invoice",
        "receipt",
        "payment",
        "paid",
        "transaction",
        "order",
        "purchase",
        "bill",
        "subscription"
    ],

    "promotion": [
        "sale",
        "discount",
        "offer",
        "deal",
        "newsletter",
        "subscribe",
        "unsubscribe",
        "promo",
        "limited time",
        "shop now",
        "canva",
        "tripadvisor",
        "quora",
        "travelers"
    ]
}


CATEGORY_PRIORITY_SCORES = {
    "suspicious": 95,
    "security": 90,
    "job_application": 85,
    "receipt": 75,
    "education": 65,
    "general": 40,
    "promotion": 30
}


def classify_email(sender, subject, snippet):
    text = f"{sender} {subject} {snippet}".lower()

    category = "general"

    for category_name, keywords in CATEGORY_KEYWORDS.items():
        if any(keyword in text for keyword in keywords):
            category = category_name
            break

    priority_score = CATEGORY_PRIORITY_SCORES.get(category, 40)

    return {
        "category": category,
        "priority_score": priority_score
    }