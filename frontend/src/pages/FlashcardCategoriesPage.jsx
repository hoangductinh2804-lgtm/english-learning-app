import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFlashcardCategories } from "../api/client";

function FlashcardCategoriesPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      setError("");
      try {
        const data = await getFlashcardCategories();
        setCategories(data.categories || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <main className="app-page">
      <div className="page-container">
        <header className="page-header">
          <Link to="/dashboard" className="back-btn">← Trang chủ</Link>
          <h1 className="page-title">Bộ thẻ từ vựng</h1>
          <p className="page-sub">Chọn chủ đề bạn muốn học</p>
        </header>

        {error && <p className="error-text">{error}</p>}
        {loading ? (
          <div className="loading-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="category-card category-card--skeleton" />
            ))}
          </div>
        ) : (
          <div className="category-grid">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="category-card"
                style={{ "--cat-color": cat.color }}
                onClick={() => navigate(`/flashcards/${cat.id}`)}
              >
                <div className="category-card-top">
                  <span className="category-icon">{cat.icon}</span>
                  <span className="category-difficulty">{cat.difficulty}</span>
                </div>
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-desc">{cat.description}</p>
                <div className="category-footer">
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" style={{ width: "0%" }} />
                  </div>
                  <span className="category-words">0 / {cat.totalWords} từ</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default FlashcardCategoriesPage;
