import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [emailData, setEmailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState("");
  const [minScore, setMinScore] = useState("");

  async function fetchEmails() {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      params.append("limit", limit);

      if (category) {
        params.append("category", category);
      }

      if (minScore !== "") {
        params.append("min_score", minScore);
      }

      const response = await fetch(
        `http://127.0.0.1:8000/emails?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }

      const data = await response.json();
      setEmailData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmails();
  }, []);

  function handleApplyFilters() {
    fetchEmails();
  }

  function handleResetFilters() {
    setLimit(10);
    setCategory("");
    setMinScore("");
  }

  if (loading && !emailData) {
    return <h2 className="status-text">Loading emails...</h2>;
  }

  if (error && !emailData) {
    return <h2 className="status-text">Error: {error}</h2>;
  }

  return (
    <div className="app">
      <div className="page-header">
        <div>
          <h1>InboxPilot</h1>
          <p>AI-powered email priority dashboard</p>
        </div>

        <button className="refresh-btn" onClick={fetchEmails}>
          Refresh
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Limit</label>
          <select
            value={limit}
            onChange={(event) => setLimit(Number(event.target.value))}
          >
            <option value={5}>5 emails</option>
            <option value={10}>10 emails</option>
            <option value={20}>20 emails</option>
            <option value={30}>30 emails</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">All categories</option>
            <option value="suspicious">Suspicious</option>
            <option value="security">Security</option>
            <option value="job_application">Job Application</option>
            <option value="education">Education</option>
            <option value="receipt">Receipt</option>
            <option value="promotion">Promotion</option>
            <option value="general">General</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Minimum Score</label>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Example: 60"
            value={minScore}
            onChange={(event) => setMinScore(event.target.value)}
          />
        </div>

        <button className="apply-btn" onClick={handleApplyFilters}>
          Apply Filters
        </button>

        <button className="reset-btn" onClick={handleResetFilters}>
          Reset
        </button>
      </div>

      {loading && <p className="small-status">Updating emails...</p>}
      {error && <p className="error-text">{error}</p>}

      {emailData && (
        <>
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

          <div className="category-summary">
            <h2>Category Summary</h2>
            <div className="category-pills">
              {Object.entries(emailData.category_summary).map(
                ([categoryName, count]) => (
                  <span key={categoryName}>
                    {categoryName}: {count}
                  </span>
                )
              )}
            </div>
          </div>

          <h2>Emails</h2>

          {emailData.emails.length === 0 ? (
            <p>No emails found for selected filters.</p>
          ) : (
            <div className="email-list">
              {emailData.emails.map((email) => (
                <div className="email-card" key={email.message_id}>
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
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;