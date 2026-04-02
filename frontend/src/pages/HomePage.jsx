import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { quickPractice } from "../data/studyData";
import { getProgressByCategory, loadCategoryCatalog } from "../lib/learning";

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

    return {
      remembered,
      total,
      today,
      percent: goal === 0 ? 0 : Math.round((today / goal) * 100),
    };
  }, [categories]);

  return (
    <main className="page page-home">
      <header className="home-header">
        <div className="profile-dot">Y</div>
        <div>
          <h1>Hi, You</h1>
          <span className="streak-pill">0-day streak</span>
        </div>
        <button className="icon-button" type="button" aria-label="Settings">
          ⚙
        </button>
      </header>

      <section className="goal-card">
        <div className="goal-ring">
          <span>{stats.percent}%</span>
        </div>
        <div className="goal-content">
          <div className="goal-row">
            <h2>Muc tieu/ngay</h2>
            <button className="icon-button small" type="button" aria-label="Edit goal">
              ✎
            </button>
          </div>
          <p>
            {stats.today} / 20 words
          </p>
          <div className="progress-track">
            <div className="progress-value" style={{ width: `${stats.percent}%` }} />
          </div>
          <Link className="start-link" to="/flashcards">
            ▶ Bat dau
          </Link>
        </div>
      </section>

      <section>
        <h3 className="section-title">Luyen nhanh</h3>
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
        <h3 className="section-title">Hoc tap hom nay</h3>
        <div className="today-grid">
          <article>
            <div className="badge">◔</div>
            <p>
              Da nho {stats.remembered}/{stats.total} tu
            </p>
          </article>
          <article>
            <div className="badge">A</div>
            <p>{categories.length} chu de san sang</p>
          </article>
        </div>
      </section>
    </main>
  );
}