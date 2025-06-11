import React from 'react';

function FilterSection({ activeFilter, setActiveFilter }) {
  const filters = ['all', 'Web Development', 'Mobile Apps', 'UI/UX Design', 'Data Science', 'Machine Learning'];

  return (
    <section className="filter-section">
      <div className="container">
        <h2>My Projects</h2>
        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'all' ? 'All' : filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FilterSection;