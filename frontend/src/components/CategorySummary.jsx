function CategorySummary({ category_summary }) {
  return (
    <section className="category-summary" id="categories">
      <div className="section-heading compact">
        <div>
          <p className="section-kicker">Inbox distribution</p>
          <h2>Category summary</h2>
        </div>
      </div>
      <div className="category-pills">
        {Object.entries(category_summary).map(([categoryName, count]) => (
          <span key={categoryName}>
            <span className="category-name">
              {categoryName.replaceAll("_", " ")}
            </span>
            <strong>{count}</strong>
          </span>
        ))}
      </div>
    </section>
  );
}

export default CategorySummary;
