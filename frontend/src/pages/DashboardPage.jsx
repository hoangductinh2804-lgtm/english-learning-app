import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const dailyGoal = user?.dailyGoal ?? 20;
  const todayMinutes = user?.todayMinutes ?? 0;
  const progressPercent = Math.min(100, Math.round((todayMinutes / dailyGoal) * 100));

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <h1>Dashboard</h1>
        <p className="welcome-text">
          Welcome back, <strong>{user?.fullName || "Learner"}</strong>!
        </p>

        <div className="daily-goal-section">
          <h2>Today&apos;s Goal</h2>
          <div className="progress-ring-wrap">
            <svg className="progress-ring" viewBox="0 0 120 120" aria-label={`${progressPercent}% of daily goal`}>
              <circle
                className="progress-ring-track"
                cx="60"
                cy="60"
                r="50"
                fill="none"
                strokeWidth="10"
              />
              <circle
                className="progress-ring-fill"
                cx="60"
                cy="60"
                r="50"
                fill="none"
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - progressPercent / 100)}`}
              />
            </svg>
            <div className="progress-ring-label">
              <span className="progress-ring-percent">{progressPercent}%</span>
              <span className="progress-ring-sub">{todayMinutes}/{dailyGoal} min</span>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <article>
            <h2>Level</h2>
            <p>{user?.level}</p>
          </article>
          <article>
            <h2>Points</h2>
            <p>{user?.points ?? 0}</p>
          </article>
          <article>
            <h2>Streak</h2>
            <p>{user?.streak ?? 0} days 🔥</p>
          </article>
          <article>
            <h2>Badges</h2>
            <p>{user?.achievements?.length ?? 0}</p>
          </article>
        </div>

        <div className="dashboard-nav">
          <button onClick={() => navigate("/vocabulary")}>📚 Vocabulary</button>
          <button onClick={() => navigate("/grammar")}>📝 Grammar</button>
          <button onClick={() => navigate("/exercises")}>🎯 Exercises</button>
          <button onClick={() => navigate("/gamification")}>🏆 Gamification</button>
          <button onClick={() => navigate("/advanced")}>🎙️ Advanced</button>
          <button onClick={() => navigate("/profile")}>⚙️ Profile</button>
        </div>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </section>
    </main>
  );
}

export default DashboardPage;
