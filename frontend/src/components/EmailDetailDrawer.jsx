import { useEffect } from "react";

function EmailDetailDrawer({ email, loading, error, onClose }) {
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.body.classList.add("drawer-open");

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("drawer-open");
    };
  }, [onClose]);

  const categoryClass = String(email?.category || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="drawer-overlay" onMouseDown={onClose}>
      <aside
        className="email-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Email details"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="drawer-topbar">
          <div>
            <p className="section-kicker">Email details</p>
            <span>Full message</span>
          </div>
          <button
            className="drawer-close"
            type="button"
            onClick={onClose}
            aria-label="Close email details"
          >
            &times;
          </button>
        </div>

        {loading && (
          <div className="drawer-state" role="status">
            <div className="state-icon loading-ring"></div>
            <h2>Loading email</h2>
            <p>Getting the full message details.</p>
          </div>
        )}

        {!loading && error && (
          <div className="drawer-state error-state" role="alert">
            <div className="state-icon">!</div>
            <h2>Could not load this email</h2>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && email && (
          <div className="drawer-content">
            <div className="drawer-heading">
              <h2 id="email-detail-title">{email.subject}</h2>
              <div className="drawer-badges">
                <span
                  className={`category-badge category-${categoryClass}`}
                >
                  {String(email.category).replaceAll("_", " ")}
                </span>
                <span className="drawer-priority">
                  Priority {email.priority_score}
                </span>
              </div>
            </div>

            <dl className="email-metadata">
              <div>
                <dt>From</dt>
                <dd>{email.sender}</dd>
              </div>
              <div>
                <dt>To</dt>
                <dd>{email.recipient}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{email.date}</dd>
              </div>
            </dl>

            {email.snippet && (
              <div className="drawer-snippet">
                <span>Summary</span>
                <p>{email.snippet}</p>
              </div>
            )}

            <div className="drawer-body">
              <span>Message</span>
              <p>{email.body || "No message body available."}</p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export default EmailDetailDrawer;
