import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LEARNING_MODES = [
  { key: "flashcards", label: "Bộ thẻ", icon: "🃏", path: "/flashcards", color: "#DDA0DD" },
  { key: "listening", label: "Luyện Nghe", icon: "🎧", path: "/listening", color: "#87CEEB" },
  { key: "reading", label: "Luyện Đọc", icon: "📖", path: "/vocabulary", color: "#98D98E" },
  { key: "grammar", label: "Ngữ Pháp", icon: "📝", path: "/grammar", color: "#FFD700" },
  { key: "matching", label: "Ghép Thẻ", icon: "🧩", path: "/exercises", color: "#FFB6C1" },
  { key: "tools", label: "Công cụ", icon: "🔧", path: "/advanced", color: "#F4A460" },
  { key: "phonetics", label: "Ngữ âm", icon: "🔤", path: "/advanced", color: "#7B68EE" },
  { key: "voice", label: "Voice to Voice", icon: "🎤", path: "/advanced", color: "#20B2AA" },
];

function CircularProgress({ value, max, size = 80 }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#e8e0f5"
          strokeWidth={10}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#7B68EE"
          strokeWidth={10}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="circular-progress-label">
        {value}/{max}
        <small>min</small>
      </span>
    </div>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const streak = user?.streak ?? 0;
  const dailyMinutes = 0;
  const dailyGoal = user?.dailyGoal ?? 20;

  return (
    <main className="dashboard-page dashboard-page--new">
      <div className="dashboard-layout">
        <header className="dashboard-header">
          <div className="dashboard-greeting">
            <div className="avatar">{(user?.fullName || "L")[0].toUpperCase()}</div>
            <div>
              <p className="greeting-sub">Xin chào 👋</p>
              <h2 className="greeting-name">{user?.fullName || "Learner"}</h2>
            </div>
          </div>
          <button className="icon-btn logout-btn" onClick={handleLogout} title="Đăng xuất">
            🚪
          </button>
        </header>

        <section className="daily-card">
          <div className="daily-card-left">
            <div className="streak-badge">
              <span>🔥</span>
              <span>{streak}-day streak</span>
            </div>
            <h3>Mục tiêu hôm nay</h3>
            <p className="daily-desc">Học {dailyGoal} phút mỗi ngày để duy trì streak của bạn!</p>
            <button className="start-btn" onClick={() => navigate("/flashcards")}>
              Bắt đầu →
            </button>
          </div>
          <div className="daily-card-right">
            <CircularProgress value={dailyMinutes} max={dailyGoal} size={90} />
          </div>
        </section>

        <section className="stats-row">
          <article className="stat-chip">
            <span className="stat-icon">📚</span>
            <div>
              <strong>{user?.points ?? 0}</strong>
              <small>Điểm</small>
            </div>
          </article>
          <article className="stat-chip">
            <span className="stat-icon">🏆</span>
            <div>
              <strong>{user?.level || "A1"}</strong>
              <small>Cấp độ</small>
            </div>
          </article>
          <article className="stat-chip">
            <span className="stat-icon">✅</span>
            <div>
              <strong>0</strong>
              <small>Hôm nay</small>
            </div>
          </article>
        </section>

        <section className="modes-section">
          <h3 className="modes-title">Chọn hình thức học</h3>
          <div className="modes-grid">
            {LEARNING_MODES.map((mode) => (
              <button
                key={mode.key}
                className="mode-card"
                style={{ "--mode-color": mode.color }}
                onClick={() => navigate(mode.path)}
              >
                <span className="mode-icon">{mode.icon}</span>
                <span className="mode-label">{mode.label}</span>
              </button>
            ))}
          </div>
        </section>

        <nav className="dashboard-nav">
          <button className="nav-link-btn" onClick={() => navigate("/gamification")}>🎮 Bảng xếp hạng</button>
          <button className="nav-link-btn" onClick={() => navigate("/exercises")}>📋 Bài tập</button>
          <button className="nav-link-btn" onClick={() => navigate("/conversation")}>💬 Hội thoại</button>
        </nav>
      </div>
    </main>
  );
}

export default DashboardPage;
