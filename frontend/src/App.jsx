import { useEffect, useState } from "react";
import CategorySummary from "./components/CategorySummary";
import EmailCard from "./components/EmailCard";
import Filters from "./components/Filters";
import SummaryCards from "./components/SummaryCards";
import { getEmails } from "./services/emailApi";
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

      const data = await getEmails({ limit, category, minScore });
      setEmailData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getEmails({ limit: 10, category: "", minScore: "" })
      .then(setEmailData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
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

      <Filters
        limit={limit}
        category={category}
        minScore={minScore}
        setLimit={setLimit}
        setCategory={setCategory}
        setMinScore={setMinScore}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {loading && <p className="small-status">Updating emails...</p>}
      {error && <p className="error-text">{error}</p>}

      {emailData && (
        <>
          <SummaryCards emailData={emailData} />

          <CategorySummary category_summary={emailData.category_summary} />

          <h2>Emails</h2>

          {emailData.emails.length === 0 ? (
            <p>No emails found for selected filters.</p>
          ) : (
            <div className="email-list">
              {emailData.emails.map((email) => (
                <EmailCard email={email} key={email.message_id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
