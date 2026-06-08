function EmailCard({ email, onClick }) {
  const score = Number(email.priority_score);
  const priorityLevel = score >= 80 ? "high" : score >= 50 ? "medium" : "low";
  const categoryClass = String(email.category)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  return (
    <div
      className="email-card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      aria-label={`Open email: ${email.subject}`}
    >
      <div className="email-header">
        <div className="email-title">
          <span className={`priority-indicator ${priorityLevel}`}></span>
          <div>
            <h3>{email.subject}</h3>
            <p className="sender">From {email.sender}</p>
          </div>
        </div>
        <span className={`score-badge ${priorityLevel}`}>
          <small>Priority</small>
          {email.priority_score}
        </span>
      </div>

      <p className="email-snippet">{email.snippet}</p>

      <div className="email-footer">
        <span className={`category-badge category-${categoryClass}`}>
          {String(email.category).replaceAll("_", " ")}
        </span>
        <time>{email.date}</time>
      </div>
    </div>
  );
}

export default EmailCard;
