import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getQuestions, submitQuizAnswers } from "../api/client";
import DragDropQuestion from "../components/DragDropQuestion";
import FillInBlankQuestion from "../components/FillInBlankQuestion";
import MultipleChoiceQuestion from "../components/MultipleChoiceQuestion";
import { useAuth } from "../context/AuthContext";

function ExercisesPage() {
  const navigate = useNavigate();
  const { token, refreshUser } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      setError("");

      try {
        const response = await getQuestions();
        const nextQuestions = response.questions || [];
        setQuestions(nextQuestions);

        const initialAnswers = nextQuestions.reduce((acc, question) => {
          if (question.type === "drag_drop") {
            acc[question._id] = question.options || [];
          } else {
            acc[question._id] = "";
          }
          return acc;
        }, {});

        setAnswers(initialAnswers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  const groupedQuestions = useMemo(() => {
    return {
      multipleChoice: questions.filter((question) => question.type === "multiple_choice"),
      fillBlank: questions.filter((question) => question.type === "fill_blank"),
      dragDrop: questions.filter((question) => question.type === "drag_drop"),
    };
  }, [questions]);

  function updateAnswer(questionId, value) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        answers: questions.map((question) => ({
          questionId: question._id,
          answer: answers[question._id],
        })),
      };

      const result = await submitQuizAnswers(token, payload);
      await refreshUser();
      navigate("/quiz-result", { state: { result } });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="exercise-page">
      <section className="page-header">
        <h1>🎯 Exercises &amp; Tests</h1>
        <p>Practice with multiple choice, fill-in-the-blank and drag-drop questions.</p>
        <div className="page-header-links">
          <Link to="/dashboard">← Dashboard</Link>
        </div>
      </section>

      {error ? <p className="error-text">{error}</p> : null}
      {loading ? <p className="loading">Loading questions...</p> : null}

      {!loading ? (
        <>
          <section className="exercise-block">
            <h2>Multiple Choice</h2>
            {groupedQuestions.multipleChoice.map((question) => (
              <MultipleChoiceQuestion
                key={question._id}
                question={question}
                value={answers[question._id]}
                onChange={(value) => updateAnswer(question._id, value)}
              />
            ))}
          </section>

          <section className="exercise-block">
            <h2>Fill in the Blanks</h2>
            {groupedQuestions.fillBlank.map((question) => (
              <FillInBlankQuestion
                key={question._id}
                question={question}
                value={answers[question._id]}
                onChange={(value) => updateAnswer(question._id, value)}
              />
            ))}
          </section>

          <section className="exercise-block">
            <h2>Drag and Drop</h2>
            {groupedQuestions.dragDrop.map((question) => (
              <DragDropQuestion
                key={question._id}
                question={question}
                value={answers[question._id]}
                onChange={(value) => updateAnswer(question._id, value)}
              />
            ))}
          </section>

          <section className="exercise-submit">
            <button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit All Answers"}
            </button>
          </section>
        </>
      ) : null}
    </main>
  );
}

export default ExercisesPage;