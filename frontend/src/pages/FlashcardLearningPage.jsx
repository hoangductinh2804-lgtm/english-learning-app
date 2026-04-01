import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFlashcardsByCategory } from "../api/client";

function FlashcardLearningPage() {
  const { categoryId } = useParams();
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCards() {
      setLoading(true);
      setError("");
      try {
        const data = await getFlashcardsByCategory(categoryId);
        setCards(data.cards || []);
        setCategory(data.category || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (categoryId) fetchCards();
  }, [categoryId]);

  const currentCard = cards[currentIndex];
  const total = cards.length;

  function handlePrev() {
    setFlipped(false);
    setCurrentIndex((i) => Math.max(0, i - 1));
  }

  function handleNext() {
    setFlipped(false);
    setCurrentIndex((i) => Math.min(total - 1, i + 1));
  }

  function handleFlip() {
    setFlipped((f) => !f);
  }

  function toggleFavorite(id) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function speak(text) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-US";
      window.speechSynthesis.speak(utter);
    }
  }

  if (loading) {
    return (
      <main className="app-page">
        <div className="page-container">
          <p className="loading">Đang tải thẻ...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="app-page">
        <div className="page-container">
          <p className="error-text">{error}</p>
          <Link to="/flashcards" className="back-btn">← Quay lại</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="app-page">
      <div className="page-container">
        <header className="page-header">
          <Link to="/flashcards" className="back-btn">← {category?.name || "Bộ thẻ"}</Link>
          <span className="card-counter">{total > 0 ? `${currentIndex + 1}/${total}` : "0/0"}</span>
        </header>

        {total === 0 ? (
          <p className="empty-state">Không có thẻ nào trong chủ đề này.</p>
        ) : (
          <>
            {/* Progress bar */}
            <div className="card-progress-wrap">
              <div
                className="card-progress-fill"
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              />
            </div>

            {/* Flashcard */}
            <div className={`flashcard-wrapper${flipped ? " flipped" : ""}`} onClick={handleFlip}>
              <div className="flashcard-inner">
                <div className="flashcard-face flashcard-front">
                  <div className="card-actions">
                    <button
                      className={`fav-btn${favorites.has(currentCard.id) ? " fav-btn--active" : ""}`}
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(currentCard.id); }}
                    >
                      {favorites.has(currentCard.id) ? "❤️" : "🤍"}
                    </button>
                    <button
                      className="speak-btn"
                      onClick={(e) => { e.stopPropagation(); speak(currentCard.word); }}
                    >
                      🔊
                    </button>
                  </div>
                  <h2 className="card-word">{currentCard.word}</h2>
                  <p className="card-ipa">{currentCard.ipa}</p>
                  <p className="card-pos">{currentCard.partOfSpeech}</p>
                  <span className="flip-hint">Nhấn để xem nghĩa</span>
                </div>
                <div className="flashcard-face flashcard-back">
                  <h2 className="card-meaning">{currentCard.meaning}</h2>
                  <p className="card-example">"{currentCard.example}"</p>
                  <span className="flip-hint">Nhấn để xem từ</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="card-nav">
              <button
                className="card-nav-btn card-nav-btn--prev"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                ← Trước
              </button>
              <button
                className="card-nav-btn card-nav-btn--known"
                onClick={handleNext}
              >
                ✓ Đã nhớ
              </button>
              <button
                className="card-nav-btn card-nav-btn--next"
                onClick={handleNext}
                disabled={currentIndex === total - 1}
              >
                Tiếp theo →
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default FlashcardLearningPage;
