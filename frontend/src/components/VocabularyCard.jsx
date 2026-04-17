function VocabularyCard({ item, progress }) {
  const STATUS_COLORS = {
    mastered: "var(--c-green)",
    learning: "var(--c-amber)",
    new: "var(--c-text-muted)",
  };

  const status = progress?.status || "new";

  return (
    <article className="vocabulary-card">
      <header>
        <h3>{item.word}</h3>
        <span className="tag tag--level">{item.level}</span>
      </header>
      <p className="meaning">{item.meaning}</p>
      <p className="meta">📂 {item.topic}</p>
      {item.example ? <p className="example">💬 {item.example}</p> : null}

      <footer>
        <span className="status-badge" style={{ color: STATUS_COLORS[status] ?? STATUS_COLORS.new }}>
          ● {status}
        </span>
        <span className="score-info">
          ✅ {progress?.correctCount || 0} &nbsp; ❌ {progress?.incorrectCount || 0}
        </span>
      </footer>
    </article>
  );
}

export default VocabularyCard;
