import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { quickPractice } from "../data/studyData";
import { getCurrentStreakDays, getProgressByCategory, loadCategoryCatalog } from "../lib/learning";

export default function HomePage() {
  const [categories, setCategories] = useState([]);

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

  const stats = useMemo(() => {
    const rows = getProgressByCategory(categories);
    const remembered = rows.reduce((sum, item) => sum + item.remembered, 0);
    const total = rows.reduce((sum, item) => sum + item.total, 0);
    const goal = 20;
    const today = Math.min(remembered, goal);
    const streakDays = getCurrentStreakDays();

    return {
      remembered,
      total,
      today,
      streakDays,
      percent: goal === 0 ? 0 : Math.round((today / goal) * 100),
    };
  }, [categories]);

  return (
    <main className="page page-home">
      <header className="home-header">
        <div className="profile-dot">Y</div>
        <div className="home-greeting">
          <h1>
            Xin chào <span role="img" aria-label="vẫy tay">👋</span>
          </h1>
          <p>Học tiếng Anh mỗi ngày, tiến bộ từng bước nhỏ.</p>
        </div>
        <button className="icon-button" type="button" aria-label="Settings">
          ⚙
        </button>
      </header>

      <section className="goal-card hero-card">
        <div className="goal-ring hero-ring">
          <span>
            {stats.streakDays}
            <small>ngày</small>
          </span>
        </div>
        <div className="goal-content hero-content">
          <div className="goal-row">
            <h2>Streak học tập</h2>
            <button className="icon-button small" type="button" aria-label="Edit goal">
              ✎
            </button>
          </div>
          <p>{stats.streakDays} ngày học liên tiếp</p>
          <div className="progress-track">
            <div className="progress-value" style={{ width: `${stats.percent}%` }} />
          </div>
          <div className="hero-actions">
            <Link className="start-link" to="/flashcards">
              Bắt đầu ngay
            </Link>
            <Link className="secondary-link" to="/listening">
              Luyện nghe
            </Link>
          </div>
        </div>
      </section>

      <section className="stat-strip">
        <article>
          <span>📚</span>
          <p>{categories.length} chủ đề</p>
        </article>
        <article>
          <span>🧠</span>
          <p>{stats.remembered} từ đã nhớ</p>
        </article>
        <article>
          <span>🎯</span>
          <p>{stats.total} từ tổng</p>
        </article>
      </section>

      <section>
        <h3 className="section-title">Luyện nhanh</h3>
        <div className="quick-grid">
          {quickPractice.map((item) => (
            <Link className="quick-card" key={item.label} to={item.path}>
              <span className="quick-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="today-section">
        <h3 className="section-title">Học tập hôm nay</h3>
        <div className="today-grid">
          <article>
            <div className="badge">📈</div>
            <p>
              Đã nhớ {stats.remembered}/{stats.total} từ
            </p>
          </article>
          <article>
            <div className="badge">🚀</div>
            <p>{categories.length} chủ đề sẵn sàng</p>
          </article>
        </div>
      </section>
    </main>
  );
}
