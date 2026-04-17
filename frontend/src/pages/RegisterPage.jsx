import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/client";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("beginner");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const data = await register({ fullName, email, password, level });
      loginSuccess(data.token, data.user);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-card-header">
          <h1>🚀 Get Started</h1>
          <p>Create your account and start learning English today.</p>
        </div>

        <div className="auth-card-body">
          <form onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Your full name"
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="your@email.com"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Min. 6 characters"
                required
                minLength={6}
              />
            </label>

            <label>
              Your Level
              <select value={level} onChange={(event) => setLevel(event.target.value)}>
                <option value="beginner">🌱 Beginner</option>
                <option value="intermediate">⚡ Intermediate</option>
                <option value="advanced">🏆 Advanced</option>
              </select>
            </label>

            {error ? <p className="error-text">{error}</p> : null}

            <button type="submit" disabled={submitting}>
              {submitting ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p className="auth-footnote">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;
