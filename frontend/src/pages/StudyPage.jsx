import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  findWordsBySlug,
  getLearningStore,
  loadCategoryCatalog,
  toggleLiked,
  toggleRemembered,
} from "../lib/learning";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function StudyPage() {
  const { slug } = useParams();
  const [categories, setCategories] = useState([]);
  const [index, setIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [store, setStore] = useState(() => getLearningStore());

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      const next = await loadCategoryCatalog();
      if (mounted) {
        setCategories(next);
      }
    }

    bootstrap();
    return () => {
      mounted = false;
    };
  }, []);

  const words = useMemo(() => findWordsBySlug(categories, slug), [categories, slug]);

  const currentWord = words[index] || null;
  const category = useMemo(() => categories.find((item) => item.slug === slug), [categories, slug]);
  const total = Math.max(words.length, 1);
  const progress = Math.round(((index + 1) / total) * 100);
  const currentId = currentWord?._id;
  const isRemembered = currentId ? !!store.remembered[currentId] : false;
  const isLiked = currentId ? !!store.liked[currentId] : false;
  const imageSrc =
    currentWord?.image ||
    currentWord?.fallbackImage ||
    (currentWord?.word ? `/images/vocabulary-cards/${slugify(currentWord.word)}.svg` : category?.cover || "");

  useEffect(() => {
    setIndex(0);
    setShowMeaning(false);
  }, [slug, words.length]);

  function nextCard() {
    setIndex((prev) => (prev + 1 >= total ? prev : prev + 1));
    setShowMeaning(false);
  }

  function prevCard() {
    setIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
    setShowMeaning(false);
  }

  function rememberCurrent() {
    if (!currentId) return;
    const next = toggleRemembered(currentId);
    setStore(next);
  }

  function likeCurrent() {
    if (!currentId) return;
    const next = toggleLiked(currentId);
    setStore(next);
  }

  function speakCurrent() {
    if (!currentWord?.word || typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return (
    <main className="page study-page">
      <header className="study-header">
        <Link className="back-link" to="/flashcards">
          ←
        </Link>
        <h1>{category?.title || "Cuộc sống hằng ngày"}</h1>
        <div className="header-icons">
          {isLiked ? "❤" : "♡"} {isRemembered ? "✓" : "○"}
        </div>
      </header>

      <div className="study-progress-row">
        <div className="progress-track">
          <div className="progress-value" style={{ width: `${progress}%` }} />
        </div>
        <span>
          {index + 1}/{total}
        </span>
      </div>

      <article
        className={`flashcard-screen ${showMeaning ? "is-flipped" : ""}`}
        onClick={() => setShowMeaning((current) => !current)}
      >
        <button
          className="like-btn"
          onClick={(event) => {
            event.stopPropagation();
            likeCurrent();
          }}
          type="button"
          aria-label="Like card"
        >
          {isLiked ? "❤" : "♡"}
        </button>
        <div className="flashcard-3d">
          <div className="flashcard-face flashcard-front">
            {imageSrc ? (
              <img
                alt={currentWord?.word || "flashcard"}
                className="flashcard-image"
                src={imageSrc}
                onError={(event) => {
                  if (currentWord?.fallbackImage && event.currentTarget.src !== currentWord.fallbackImage) {
                    event.currentTarget.src = currentWord.fallbackImage;
                    return;
                  }

                  if (category?.cover && event.currentTarget.src !== category.cover) {
                    event.currentTarget.src = category.cover;
                  }
                }}
              />
            ) : null}
            <h2>{currentWord?.word || "No word"}</h2>
            <p className="word-ipa">{currentWord?.ipa || ""}</p>
            <p className="word-meaning hint">Chạm để lật thẻ</p>
          </div>

          <div className="flashcard-face flashcard-back">
            <h3>{currentWord?.word || "No word"}</h3>
            <p className="word-meaning">{currentWord?.meaning || ""}</p>
          </div>
        </div>

        <button
          className="speak-btn"
          onClick={(event) => {
            event.stopPropagation();
            speakCurrent();
          }}
          type="button"
          aria-label="Speak word"
        >
          🔊
        </button>
      </article>

      <div className="study-controls">
        <button onClick={prevCard} type="button">
          ◀ Trước
        </button>
        <button className="remember" onClick={rememberCurrent} type="button">
          {isRemembered ? "✓ Đã nhớ" : "Đã học"}
        </button>
        <button onClick={nextCard} type="button">
          Tiếp theo ▶
        </button>
      </div>

      <button className="voice-btn" onClick={speakCurrent} type="button">
        🎙 Luyện nói
      </button>
    </main>
  );
}