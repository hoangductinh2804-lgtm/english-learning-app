function VocabularyCard({ item, progress }) {
  return (
    <article className="vocabulary-card">
      <header>
        <h3>{item.word}</h3>
        <span className="tag">{item.level}</span>
      </header>
      <p className="meaning">{item.meaning}</p>
      <p className="meta">Topic: {item.topic}</p>
      {item.pronunciation ? <p className="meta">Pronunciation: {item.pronunciation}</p> : null}
      {item.example ? <p className="example">Example: {item.example}</p> : null}

      <footer>
        <span>Status: {progress?.status || "new"}</span>
        <span>
          Correct: {progress?.correctCount || 0} | Incorrect: {progress?.incorrectCount || 0}
        </span>
      </footer>
    </article>
  );
}

export default VocabularyCard;
