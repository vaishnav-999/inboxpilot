const EMAILS_URL = "http://127.0.0.1:8000/emails";

export async function getEmails({ limit, category, minScore }) {
  const params = new URLSearchParams();
  params.append("limit", limit);

  if (category) {
    params.append("category", category);
  }

  if (minScore !== "") {
    params.append("min_score", minScore);
  }

  const response = await fetch(`${EMAILS_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch emails");
  }

  return response.json();
}

export async function getEmailById(messageId) {
  const response = await fetch(
    `${EMAILS_URL}/${encodeURIComponent(messageId)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch email details");
  }

  return response.json();
}
