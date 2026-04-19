function VocabularyCard({ item, progress }) {
  return (
    <article className="vocabulary-card">
      {item.image || item.fallbackImage ? (
        <div className="vocabulary-card-media">
          <img
            src={item.image || item.fallbackImage}
            alt={item.word}
            loading="lazy"
            onError={(event) => {
              if (item.fallbackImage && event.currentTarget.src !== item.fallbackImage) {
                event.currentTarget.src = item.fallbackImage;
                return;
              }

              event.currentTarget.src = "/images/topics/daily-life.svg";
            }}
          />
        </div>
      ) : null}

      <header>
        <h3 title={item.word}>{item.word}</h3>
        <span className="tag">{item.level}</span>
      </header>
      <p className="meaning">{item.meaning}</p>
      <p className="meta">Chủ đề: {item.topic}</p>
      {item.pronunciation ? <p className="meta">Pronunciation: {item.pronunciation}</p> : null}
      {item.example ? <p className="example">Ví dụ: {item.example}</p> : null}

      <footer>
        <span>Trạng thái: {progress?.status || "new"}</span>
        <span>
          Đúng: {progress?.correctCount || 0} | Sai: {progress?.incorrectCount || 0}
        </span>
      </footer>
    </article>
  );
}

export default VocabularyCard;
