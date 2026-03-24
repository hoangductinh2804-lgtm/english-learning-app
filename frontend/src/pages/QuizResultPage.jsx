import { Link, Navigate, useLocation } from "react-router-dom";

function formatAnswer(answer) {
  if (Array.isArray(answer)) {
    return answer.join(" ");
  }
  return String(answer || "-");
}

function QuizResultPage() {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return <Navigate to="/exercises" replace />;
  }

  return (
    <main className="quiz-result-page">
      <section className="vocabulary-header">
        <h1>Quiz Result</h1>
        <p>
          You got {result.correctCount}/{result.total} correct ({result.scorePercent}%).
        </p>
        <p>Points earned: {result.pointsEarned ?? 0}</p>
        <div className="header-links">
          <Link to="/exercises">Try again</Link>
          <Link to="/dashboard">Back to dashboard</Link>
        </div>
      </section>

      <section className="result-summary-grid">
        <article>
          <h2>Total</h2>
          <p>{result.total}</p>
        </article>
        <article>
          <h2>Correct</h2>
          <p>{result.correctCount}</p>
        </article>
        <article>
          <h2>Wrong</h2>
          <p>{result.wrongCount}</p>
        </article>
        <article>
          <h2>Score</h2>
          <p>{result.scorePercent}%</p>
        </article>
      </section>

      <section className="exercise-block">
        <h2>Answer Review</h2>
        <div className="result-list">
          {result.resultItems.map((item, index) => (
            <article
              key={`${item.questionId}-${index}`}
              className={`result-item ${item.isCorrect ? "ok" : "not-ok"}`}
            >
              <h3>
                {index + 1}. {item.prompt}
              </h3>
              <p>
                <strong>Your answer:</strong> {formatAnswer(item.userAnswer)}
              </p>
              <p>
                <strong>Correct answer:</strong> {formatAnswer(item.correctAnswer)}
              </p>
              {item.explanation ? <p className="explanation-text">{item.explanation}</p> : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default QuizResultPage;