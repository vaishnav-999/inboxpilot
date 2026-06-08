function EmailCard({ email }) {
  return (
    <div className="email-card">
      <div className="email-header">
        <h3>{email.subject}</h3>
        <span>{email.priority_score}</span>
      </div>

      <p className="sender">{email.sender}</p>
      <p>{email.snippet}</p>

      <div className="email-footer">
        <span>{email.category}</span>
        <small>{email.date}</small>
      </div>
    </div>
  );
}

export default EmailCard;
