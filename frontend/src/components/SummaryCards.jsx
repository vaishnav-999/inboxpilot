function SummaryCards({ emailData }) {
  return (
    <div className="summary">
      <div className="summary-card">
        <h3>Total Emails</h3>
        <p>{emailData.total_emails}</p>
      </div>

      <div className="summary-card">
        <h3>Average Score</h3>
        <p>{emailData.average_priority_score}</p>
      </div>

      <div className="summary-card">
        <h3>Categories</h3>
        <p>{Object.keys(emailData.category_summary).length}</p>
      </div>
    </div>
  );
}

export default SummaryCards;
