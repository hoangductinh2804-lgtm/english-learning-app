import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProgressByCategory, loadCategoryCatalog } from "../lib/learning";

export default function CategoryPage({ mode }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      setIsLoading(true);
      const next = await loadCategoryCatalog();
      if (mounted) {
        setCategories(next);
        setIsLoading(false);
      }
    }

    bootstrap();
    return () => {
      mounted = false;
    };
  }, []);

  const labels =
    mode === "listening"
      ? { title: "Luyen nghe theo chu de", random: "Nghe ngau nhien" }
      : { title: "Flashcard Categories", random: "On ngau nhien" };

  const progressMap = useMemo(() => {
    const entries = getProgressByCategory(categories);
    return Object.fromEntries(entries.map((entry) => [entry.slug, entry]));
  }, [categories]);

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let next = !normalized
      ? categories
      : categories.filter((item) => item.title.toLowerCase().includes(normalized));

    if (filter === "learned") {
      next = next.filter((item) => (progressMap[item.slug]?.remembered || 0) > 0);
    }

    if (filter === "new") {
      next = next.filter((item) => (progressMap[item.slug]?.remembered || 0) === 0);
    }

    if (sortBy === "recent") {
      next = [...next].sort((a, b) => (b.words?.length || 0) - (a.words?.length || 0));
    }

    return next;
  }, [categories, filter, progressMap, query, sortBy]);

  function openRandomCategory() {
    if (visible.length === 0) return;
    const randomIndex = Math.floor(Math.random() * visible.length);
    navigate(`/study/${visible[randomIndex].slug}`);
  }

  return (
    <main className="page page-category">
      <header className="category-header">
        <Link className="back-link" to="/">
          ←
        </Link>
        <h1>{labels.title}</h1>
      </header>

      <section className="category-controls">
        <label className="search-box">
          <span>⌕</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tim kiem chu de..."
            value={query}
          />
        </label>

        <div className="chips-row">
          {[
            { id: "all", label: "Tat ca" },
            { id: "learned", label: "Da hoc" },
            { id: "new", label: "Chua hoc" },
          ].map((item) => (
            <button
              className={`chip ${filter === item.id ? "active" : ""}`}
              key={item.id}
              onClick={() => setFilter(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
          <button
            className="sort-button"
            onClick={() => setSortBy((current) => (current === "name" ? "recent" : "name"))}
            type="button"
          >
            ☰ {sortBy === "name" ? "Moi nhat" : "A-Z"}
          </button>
        </div>

        <button className="random-btn" onClick={openRandomCategory} type="button">
          {labels.random}
        </button>
      </section>

      {isLoading ? <p className="status-text">Dang tai du lieu...</p> : null}

      <section className="category-grid">
        {visible.map((item) => {
          const progress = progressMap[item.slug] || { remembered: 0, total: 0, percent: 0 };
          const total =
            progress.total || (mode === "listening" ? item.listeningTotal : item.flashcardsTotal);

          return (
            <Link className="category-card" key={item.slug} to={`/study/${item.slug}`}>
              <span className="category-icon">{item.icon}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <div className="category-progress">
                <small>{progress.percent}%</small>
                <div className="progress-track mini">
                  <div className="progress-value" style={{ width: `${progress.percent}%` }} />
                </div>
              </div>
              <strong>
                Da nho: {progress.remembered}/{total}
              </strong>
            </Link>
          );
        })}
      </section>
    </main>
  );
}