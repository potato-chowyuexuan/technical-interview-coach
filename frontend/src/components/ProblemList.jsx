export default function ProblemList({ problems, selectedId, onSelect }) {
  if (!problems.length) {
    return (
      <aside className="sidebar">
        <div className="sidebar-header">Problems</div>
        <div style={{ padding: 16, color: '#57606a', fontSize: 13 }}>
          Loading problems…
        </div>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">Problems ({problems.length})</div>
      <ul className="problem-list">
        {problems.map(p => (
          <li
            key={p.id}
            className={`problem-item${selectedId === p.id ? ' active' : ''}`}
            onClick={() => onSelect(p.id)}
          >
            <div className="problem-item-title">{p.title}</div>
            <div className="problem-item-meta">
              <span className={`difficulty-badge difficulty-${p.difficulty}`}>
                {p.difficulty}
              </span>
              <span className="category-tag">{p.category}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
