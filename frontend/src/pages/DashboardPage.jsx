import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <h1>Dashboard</h1>
        <p>Xin chao, {user?.fullName || "Learner"}!</p>

        <div className="stats-grid">
          <article>
            <h2>Email</h2>
            <p>{user?.email}</p>
          </article>
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
            <p>{user?.streak ?? 0} days</p>
          </article>
        </div>

        <button onClick={() => navigate("/vocabulary")}>Go to Vocabulary</button>
        <button onClick={() => navigate("/grammar")}>Go to Grammar</button>
        <button onClick={() => navigate("/exercises")}>Go to Exercises</button>
        <button onClick={() => navigate("/gamification")}>Go to Gamification</button>
        <button onClick={() => navigate("/advanced")}>Go to Advanced Features</button>
        <button onClick={handleLogout}>Logout</button>
      </section>
    </main>
  );
}

export default DashboardPage;
