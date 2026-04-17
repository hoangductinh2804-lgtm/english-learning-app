import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PROGRESS_RING_RADIUS = 40;

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
  const circumference = 2 * Math.PI * PROGRESS_RING_RADIUS;

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <div className="dashboard-card-header">
          <h1>📊 Dashboard</h1>
          <p className="welcome-text">
            Welcome back, <strong>{user?.fullName || "Learner"}</strong>! Keep it up 🎉
          </p>
        </div>

        <div className="dashboard-card-body">
          <div className="daily-goal-section">
            <div className="progress-ring-wrap">
              <svg className="progress-ring" viewBox="0 0 100 100" aria-label={`${progressPercent}% of daily goal`}>
                <circle className="progress-ring-track" cx="50" cy="50" r={PROGRESS_RING_RADIUS} fill="none" strokeWidth="9" />
                <circle
                  className="progress-ring-fill"
                  cx="50" cy="50" r={PROGRESS_RING_RADIUS} fill="none" strokeWidth="9"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progressPercent / 100)}
                />
              </svg>
              <div className="progress-ring-label">
                <span className="progress-ring-percent">{progressPercent}%</span>
                <span className="progress-ring-sub">{todayMinutes}/{dailyGoal}m</span>
              </div>
            </div>
            <div>
              <h2>Today&#39;s Goal</h2>
              <p className="daily-goal-text">
                {progressPercent >= 100
                  ? "🎉 Daily goal reached! Amazing work!"
                  : `${dailyGoal - todayMinutes} minutes remaining today`}
              </p>
            </div>
          </div>

          <div className="stats-grid">
            <article>
              <h2>Level</h2>
              <p>{user?.level ?? "—"}</p>
            </article>
            <article>
              <h2>Points</h2>
              <p>{user?.points ?? 0}</p>
            </article>
            <article>
              <h2>Streak</h2>
              <p>{user?.streak ?? 0} 🔥</p>
            </article>
            <article>
              <h2>Badges</h2>
              <p>{user?.achievements?.length ?? 0} 🏅</p>
            </article>
          </div>

          <div className="dashboard-nav">
            <button onClick={() => navigate("/vocabulary")}>📚 Vocabulary</button>
            <button onClick={() => navigate("/exercises")}>🎯 Exercises</button>
            <button onClick={() => navigate("/advanced")}>🎙️ Advanced</button>
            <button onClick={() => navigate("/gamification")}>🏆 Leaderboard</button>
            <button onClick={() => navigate("/profile")}>⚙️ Profile</button>
          </div>

          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
