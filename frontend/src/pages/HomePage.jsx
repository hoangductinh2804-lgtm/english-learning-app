import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { learningTracks } from "../data/featureContent";
import { quickPractice } from "../data/studyData";
import { getCurrentStreakDays, getProgressByCategory, loadCategoryCatalog } from "../lib/learning";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [level, setLevel] = useState("newbie");

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

  const progressMap = useMemo(() => {
    const rows = getProgressByCategory(categories);
    return Object.fromEntries(rows.map((item) => [item.slug, item]));
  }, [categories]);

  const activeTrack = useMemo(
    () => learningTracks.find((item) => item.level === level) || learningTracks[0],
    [level]
  );

  const roadmap = useMemo(() => {
    if (!activeTrack) {
      return [];
    }

    return activeTrack.units.map((unit, index, list) => {
      const progress = progressMap[unit.topicSlug] || { percent: 0, remembered: 0, total: 0 };
      const previous = index === 0 ? { percent: 100 } : progressMap[list[index - 1].topicSlug] || { percent: 0 };
      const unlocked = index === 0 || previous.percent >= 30;
      const completed = progress.percent >= 85;
      return {
        ...unit,
        progress,
        unlocked,
        completed,
      };
    });
  }, [activeTrack, progressMap]);

  return (
    <main className="page page-home">
      <header className="home-header duo-home-header">
        <div className="profile-dot">E</div>
        <div className="home-greeting">
          <h1>Hanh trinh tieng Anh</h1>
          <p>Chon cap do va hoc theo chu de ban muon, dung nhip rieng cua ban.</p>
        </div>
        <div className="energy-pill">🔥 {stats.streakDays}</div>
      </header>

      <section className="goal-card hero-card duo-hero">
        <div className="goal-ring hero-ring duo-hero-ring">
          <span>{stats.percent}%</span>
        </div>
        <div className="goal-content hero-content duo-hero-content">
          <div className="goal-row">
            <h2>Muc tieu hom nay</h2>
          </div>
          <p>
            Da hoc {stats.today}/20 muc. Chuoi hoc lien tiep: {stats.streakDays} ngay.
          </p>
          <div className="progress-track">
            <div className="progress-value" style={{ width: `${stats.percent}%` }} />
          </div>
          <div className="hero-actions duo-hero-actions">
            <Link className="start-link" to="/flashcards">
              Tiep tuc hoc
            </Link>
            <Link className="secondary-link" to="/listening">
              Luyen nghe
            </Link>
          </div>
        </div>
      </section>

      <section className="stat-strip duo-stat-strip">
        <article>
          <span>🧭</span>
          <p>{categories.length} chu de</p>
        </article>
        <article>
          <span>🧠</span>
          <p>{stats.remembered} tu da nho</p>
        </article>
        <article>
          <span>🎯</span>
          <p>{stats.total} tu tong</p>
        </article>
      </section>

      <section className="duo-level-section">
        <h3 className="section-title">Chon cap do hoc</h3>
        <div className="duo-level-switcher">
          <button
            className={`duo-level-btn ${level === "newbie" ? "active" : ""}`}
            onClick={() => setLevel("newbie")}
            type="button"
          >
            Moi bat dau
          </button>
          <button
            className={`duo-level-btn ${level === "intermediate" ? "active" : ""}`}
            onClick={() => setLevel("intermediate")}
            type="button"
          >
            Dang tien bo
          </button>
          <button
            className={`duo-level-btn ${level === "advanced" ? "active" : ""}`}
            onClick={() => setLevel("advanced")}
            type="button"
          >
            Hoc lau nam
          </button>
        </div>
        <p className="duo-track-copy">
          <strong>{activeTrack?.title}</strong>: {activeTrack?.description}
        </p>
      </section>

      <section className="duo-path-section">
        <h3 className="section-title">Duong hoc theo chu de</h3>
        <div className="duo-path-list">
          {roadmap.map((unit, index) => (
            <article
              className={`duo-node ${index % 2 === 0 ? "left" : "right"} ${unit.unlocked ? "" : "locked"}`}
              key={unit.id}
            >
              <div className="duo-node-badge">{unit.completed ? "✓" : index + 1}</div>
              <div className="duo-node-card">
                <p className="duo-node-kicker">{unit.focus}</p>
                <h4>{unit.topic}</h4>
                <p>
                  Tien do: {unit.progress.percent}% ({unit.progress.remembered}/{unit.progress.total || "-"})
                </p>
                <div className="progress-track mini">
                  <div className="progress-value" style={{ width: `${unit.progress.percent}%` }} />
                </div>
                {unit.unlocked ? (
                  <Link className="duo-node-link" to={`/study/${unit.topicSlug}`}>
                    Hoc chu de +{unit.xp} XP
                  </Link>
                ) : (
                  <span className="duo-node-lock">Mo khoa sau khi hoan thanh bai truoc</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="duo-topics">
        <h3 className="section-title">Hoc theo so thich</h3>
        <div className="duo-topic-grid">
          {categories.slice(0, 8).map((item) => (
            <Link className="duo-topic-chip" key={item.slug} to={`/study/${item.slug}`}>
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
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
    </main>
  );
}
