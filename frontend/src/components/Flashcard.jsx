import { useEffect, useMemo, useState } from "react";

function Flashcard({ items, onReview }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const currentItem = useMemo(() => {
    if (!items.length) {
      return null;
    }

    return items[index];
  }, [items, index]);

  useEffect(() => {
    if (index > items.length - 1) {
      setIndex(0);
      setRevealed(false);
    }
  }, [index, items.length]);

  function goNext() {
    if (!items.length) {
      return;
    }

    setRevealed(false);
    setIndex((prev) => (prev + 1) % items.length);
  }

  if (!currentItem) {
    return (
      <section className="flashcard-shell">
        <h2>Flashcard</h2>
        <p>There is no vocabulary item to review.</p>
      </section>
    );
  }

  return (
    <section className="flashcard-shell">
      <h2>Flashcard</h2>
      <div className="flashcard">
        <p className="flashcard-word">{currentItem.word}</p>
        <p className="flashcard-hint">Topic: {currentItem.topic}</p>

        {revealed ? (
          <>
            <p className="flashcard-meaning">{currentItem.meaning}</p>
            {currentItem.example ? <p className="flashcard-example">{currentItem.example}</p> : null}
          </>
        ) : (
          <button type="button" onClick={() => setRevealed(true)}>
            Reveal answer
          </button>
        )}
      </div>

      <div className="flashcard-actions">
        <button
          type="button"
          onClick={async () => {
            await onReview(currentItem._id, false, "learning");
            goNext();
          }}
        >
          Again
        </button>
        <button
          type="button"
          onClick={async () => {
            await onReview(currentItem._id, true, "mastered");
            goNext();
          }}
        >
          I know this
        </button>
      </div>
    </section>
  );
}

export default Flashcard;
