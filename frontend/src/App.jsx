import { useEffect, useRef, useState } from "react";
import CategorySummary from "./components/CategorySummary";
import EmailCard from "./components/EmailCard";
import EmailDetailDrawer from "./components/EmailDetailDrawer";
import Filters from "./components/Filters";
import SummaryCards from "./components/SummaryCards";
import { getEmailById, getEmails } from "./services/emailApi";
import "./App.css";

function App() {
  const [emailData, setEmailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const detailRequest = useRef(0);

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

  async function handleEmailClick(email) {
    const requestId = detailRequest.current + 1;
    detailRequest.current = requestId;
    setSelectedEmail(email);
    setDetailLoading(true);
    setDetailError("");

    try {
      const emailDetail = await getEmailById(email.message_id);

      if (detailRequest.current === requestId) {
        setSelectedEmail(emailDetail);
      }
    } catch (err) {
      if (detailRequest.current === requestId) {
        setDetailError(err.message);
      }
    } finally {
      if (detailRequest.current === requestId) {
        setDetailLoading(false);
      }
    }
  }

  function handleCloseDetail() {
    detailRequest.current += 1;
    setSelectedEmail(null);
    setDetailLoading(false);
    setDetailError("");
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">IP</div>
          <div>
            <strong>InboxPilot</strong>
            <span>Email intelligence</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <a className="nav-item active" href="#overview">
            <span className="nav-icon">01</span>
            Overview
          </a>
          <a className="nav-item" href="#emails">
            <span className="nav-icon">02</span>
            Smart Inbox
          </a>
          <a className="nav-item" href="#categories">
            <span className="nav-icon">03</span>
            Categories
          </a>
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot"></span>
          API connected
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header" id="overview">
          <div>
            <p className="eyebrow">Email intelligence dashboard</p>
            <h1>Good to see you.</h1>
            <p className="header-copy">
              Review priority messages and understand your inbox at a glance.
            </p>
          </div>

          <button
            className="refresh-btn"
            onClick={fetchEmails}
            disabled={loading}
          >
            <span className={loading ? "refresh-icon spinning" : "refresh-icon"}>
              ↻
            </span>
            {loading ? "Refreshing..." : "Refresh inbox"}
          </button>
        </header>

        <section className="filter-section" aria-labelledby="filter-title">
          <div className="section-heading compact">
            <div>
              <p className="section-kicker">Refine results</p>
              <h2 id="filter-title">Inbox filters</h2>
            </div>
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
        </section>

        {error && emailData && (
          <div className="inline-alert" role="alert">
            <strong>Could not update the inbox.</strong>
            <span>{error}</span>
          </div>
        )}

        {loading && !emailData && (
          <div className="state-card" role="status">
            <div className="state-icon loading-ring"></div>
            <h2>Analyzing your inbox</h2>
            <p>InboxPilot is collecting and prioritizing your emails.</p>
          </div>
        )}

        {error && !emailData && (
          <div className="state-card error-state" role="alert">
            <div className="state-icon">!</div>
            <h2>We could not load your inbox</h2>
            <p>{error}</p>
            <button className="apply-btn" onClick={fetchEmails}>
              Try again
            </button>
          </div>
        )}

        {emailData && (
          <>
            <SummaryCards emailData={emailData} />

            <CategorySummary category_summary={emailData.category_summary} />

            <section className="email-section" id="emails">
              <div className="section-heading">
                <div>
                  <p className="section-kicker">Prioritized for you</p>
                  <h2>Smart inbox</h2>
                </div>
                <span className="result-count">
                  {emailData.emails.length} results
                </span>
              </div>

              {emailData.emails.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">0</div>
                  <h3>No matching emails</h3>
                  <p>Try broadening your filters to see more messages.</p>
                </div>
              ) : (
                <div className="email-list">
                  {emailData.emails.map((email) => (
                    <EmailCard
                      email={email}
                      key={email.message_id}
                      onClick={() => handleEmailClick(email)}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {selectedEmail && (
        <EmailDetailDrawer
          email={selectedEmail}
          loading={detailLoading}
          error={detailError}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default App;
