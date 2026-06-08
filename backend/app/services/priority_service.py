CATEGORY_BASE_SCORES = {
    "suspicious": 100,
    "security": 90,
    "job_application": 85,
    "education": 55,
    "receipt": 50,
    "promotion": 20,
    "general": 40
}


IMPORTANT_KEYWORDS = [
    "interview",
    "selected",
    "shortlisted",
    "assessment",
    "deadline",
    "cancelled",
    "rescheduled",
    "urgent",
    "action required",
    "password reset",
    "verification",
    "otp"
]


LOW_PRIORITY_KEYWORDS = [
    "sale",
    "discount",
    "offer",
    "newsletter",
    "shop now",
    "travelers",
    "follow",
    "youtube channel"
]


def calculate_priority_score(sender, subject, snippet, category):
    text = f"{sender} {subject} {snippet}".lower()

    score = CATEGORY_BASE_SCORES.get(category, 40)

    for keyword in IMPORTANT_KEYWORDS:
        if keyword in text:
            score += 10

    for keyword in LOW_PRIORITY_KEYWORDS:
        if keyword in text:
            score -= 10

    if score > 100:
        score = 100

    if score < 0:
        score = 0

    return score