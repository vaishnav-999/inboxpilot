function CategorySummary({ category_summary }) {
  return (
    <div className="category-summary">
      <h2>Category Summary</h2>
      <div className="category-pills">
        {Object.entries(category_summary).map(([categoryName, count]) => (
          <span key={categoryName}>
            {categoryName}: {count}
          </span>
        ))}
      </div>
    </div>
  );
}

export default CategorySummary;
