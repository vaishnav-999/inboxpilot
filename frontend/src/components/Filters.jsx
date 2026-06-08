function Filters({
  limit,
  category,
  minScore,
  setLimit,
  setCategory,
  setMinScore,
  onApply,
  onReset,
}) {
  return (
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

      <button className="apply-btn" onClick={onApply}>
        Apply Filters
      </button>

      <button className="reset-btn" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default Filters;
