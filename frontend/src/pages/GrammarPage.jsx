import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getGrammarLessonByTense,
  getGrammarLessons,
  getGrammarQuizByTense,
} from "../api/client";
import GrammarExercise from "../components/GrammarExercise";
import GrammarQuiz from "../components/GrammarQuiz";

function GrammarPage() {
  const [lessons, setLessons] = useState([]);
  const [selectedTense, setSelectedTense] = useState("");
  const [lesson, setLesson] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLessons() {
      setLoading(true);
      setError("");

      try {
        const response = await getGrammarLessons();
        const nextLessons = response.lessons || [];
        setLessons(nextLessons);

        if (nextLessons.length > 0) {
          setSelectedTense(nextLessons[0].tense);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLessons();
  }, []);

  useEffect(() => {
    if (!selectedTense) {
      return;
    }

    async function fetchLessonDetail() {
      setLoading(true);
      setError("");

      try {
        const [lessonResponse, quizResponse] = await Promise.all([
          getGrammarLessonByTense(selectedTense),
          getGrammarQuizByTense(selectedTense),
        ]);
        setLesson(lessonResponse.lesson || null);
        setQuiz(quizResponse.quiz || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLessonDetail();
  }, [selectedTense]);

  const structuredRows = useMemo(() => {
    if (!lesson?.structure) {
      return [];
    }

    return [
      { label: "Affirmative", value: lesson.structure.affirmative },
      { label: "Negative", value: lesson.structure.negative },
      { label: "Question", value: lesson.structure.question },
    ].filter((row) => row.value);
  }, [lesson]);

  return (
    <main className="grammar-page">
      <section className="vocabulary-header">
        <h1>Grammar Learning</h1>
        <p>Hoc thi co ban, lam bai tap va quiz trong cung mot trang.</p>
        <div className="header-links">
          <Link to="/dashboard">Back to dashboard</Link>
          <Link to="/vocabulary">Go to vocabulary</Link>
        </div>
      </section>

      {error ? <p className="error-text">{error}</p> : null}
      {loading ? <p className="loading">Loading grammar lessons...</p> : null}

      <section className="grammar-block">
        <h2>Select Tense</h2>
        <div className="tense-list">
          {lessons.map((item) => (
            <button
              key={item.tense}
              className={selectedTense === item.tense ? "active" : ""}
              onClick={() => setSelectedTense(item.tense)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </section>

      {lesson ? (
        <>
          <section className="grammar-block">
            <h2>{lesson.title}</h2>
            <p>{lesson.summary}</p>

            {lesson.rules?.length ? (
              <ul className="rule-list">
                {lesson.rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            ) : null}

            {structuredRows.length ? (
              <div className="structure-grid">
                {structuredRows.map((row) => (
                  <article key={row.label}>
                    <h3>{row.label}</h3>
                    <p>{row.value}</p>
                  </article>
                ))}
              </div>
            ) : null}

            {lesson.examples?.length ? (
              <div className="example-list">
                {lesson.examples.map((example, index) => (
                  <article key={`${example.sentence}-${index}`}>
                    <p className="example-sentence">{example.sentence}</p>
                    <p>{example.translation}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </section>

          <GrammarExercise exercises={lesson.exercises || []} />
          <GrammarQuiz quiz={quiz} />
        </>
      ) : null}
    </main>
  );
}

export default GrammarPage;