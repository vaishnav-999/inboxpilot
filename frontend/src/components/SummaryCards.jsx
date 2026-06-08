function SummaryCards({ emailData }) {
  return (
    <div className="summary">
      <div className="summary-card">
        <div className="summary-icon blue">IN</div>
        <div>
          <h3>Total emails</h3>
          <p>{emailData.total_emails}</p>
          <span>Messages analyzed</span>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon violet">AV</div>
        <div>
          <h3>Average score</h3>
          <p>{emailData.average_priority_score}</p>
          <span>Overall priority</span>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon green">CT</div>
        <div>
          <h3>Categories</h3>
          <p>{Object.keys(emailData.category_summary).length}</p>
          <span>Inbox groups</span>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
