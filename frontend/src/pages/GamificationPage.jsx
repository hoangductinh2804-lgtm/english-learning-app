import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLeaderboard, getMyGamification } from "../api/client";
import { useAuth } from "../context/AuthContext";

function GamificationPage() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");

      try {
        const [myData, boardData] = await Promise.all([
          getMyGamification(token),
          getLeaderboard({ limit: 10 }),
        ]);

        setProfile(myData.profile || null);
        setAchievements(myData.achievements || []);
        setLeaderboard(boardData.leaderboard || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  return (
    <main className="gamification-page">
      <section className="vocabulary-header">
        <h1>Gamification Center</h1>
        <p>Theo doi diem, streak, badges va bang xep hang.</p>
        <div className="header-links">
          <Link to="/dashboard">Back to dashboard</Link>
          <Link to="/exercises">Go to exercises</Link>
        </div>
      </section>

      {error ? <p className="error-text">{error}</p> : null}
      {loading ? <p className="loading">Loading gamification data...</p> : null}

      {profile ? (
        <section className="result-summary-grid">
          <article>
            <h2>Points</h2>
            <p>{profile.points}</p>
          </article>
          <article>
            <h2>Streak</h2>
            <p>{profile.streak} days</p>
          </article>
          <article>
            <h2>Level</h2>
            <p>{profile.level}</p>
          </article>
          <article>
            <h2>Badges</h2>
            <p>{achievements.length}</p>
          </article>
        </section>
      ) : null}

      <section className="exercise-block">
        <h2>Achievements / Badges</h2>
        {achievements.length === 0 ? <p>No badge yet. Keep learning daily!</p> : null}
        <div className="badge-grid">
          {achievements.map((badge) => (
            <article key={badge.key} className="badge-card">
              <h3>{badge.title}</h3>
              <p>{badge.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="exercise-block">
        <h2>Leaderboard</h2>
        <div className="leaderboard-table-wrap">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Level</th>
                <th>Points</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((row) => (
                <tr key={row.id}>
                  <td>{row.rank}</td>
                  <td>{row.fullName}</td>
                  <td>{row.level}</td>
                  <td>{row.points}</td>
                  <td>{row.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default GamificationPage;