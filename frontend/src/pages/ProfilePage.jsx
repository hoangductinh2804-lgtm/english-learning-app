import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "../api/client";
import { useAuth } from "../context/AuthContext";

const LEVELS = ["beginner", "intermediate", "advanced"];
const GOAL_OPTIONS = [5, 10, 15, 20, 30, 45, 60, 90, 120];
const LEVEL_LABELS = {
  beginner: "🌱 Beginner",
  intermediate: "⚡ Intermediate",
  advanced: "🏆 Advanced",
};

function ProfilePage() {
  const navigate = useNavigate();
  const { token, user, loginSuccess, logout } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [level, setLevel] = useState(user?.level || "beginner");
  const [dailyGoal, setDailyGoal] = useState(user?.dailyGoal ?? 20);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const payload = { fullName, level, dailyGoal: Number(dailyGoal) };

      if (newPassword) {
        if (newPassword.length < 6) {
          setError("New password must be at least 6 characters.");
          setSubmitting(false);
          return;
        }
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      const data = await updateProfile(token, payload);
      loginSuccess(token, data.user);
      setSuccess("Profile updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <main className="auth-page profile-page">
      <section className="profile-card">
        <div className="profile-card-header">
          <h1>⚙️ Profile Settings</h1>
          <p>Manage your account and learning preferences.</p>
        </div>

        <div className="profile-card-body">
          <div className="profile-info">
            <p>📧 <strong>Email:</strong> {user?.email}</p>
            <p>⭐ <strong>Points:</strong> {user?.points ?? 0} &nbsp;|&nbsp; 🔥 <strong>Streak:</strong> {user?.streak ?? 0} days</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Your full name"
                required
                minLength={2}
                maxLength={100}
              />
            </label>

            <label>
              Level
              <select value={level} onChange={(event) => setLevel(event.target.value)}>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {LEVEL_LABELS[l]}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Daily Goal (minutes)
              <select
                value={dailyGoal}
                onChange={(event) => setDailyGoal(Number(event.target.value))}
              >
                {GOAL_OPTIONS.map((mins) => (
                  <option key={mins} value={mins}>
                    {mins} minutes
                  </option>
                ))}
              </select>
            </label>

            <fieldset className="password-fieldset">
              <legend>Change Password (optional)</legend>
              <label>
                Current Password
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder="Current password"
                  autoComplete="current-password"
                />
              </label>
              <label>
                New Password
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                />
              </label>
            </fieldset>

            {error ? <p className="error-text">{error}</p> : null}
            {success ? <p className="success-text">{success}</p> : null}

            <button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save Changes →"}
            </button>
          </form>

          <div className="profile-footer">
            <Link to="/dashboard">← Dashboard</Link>
            <button type="button" className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
