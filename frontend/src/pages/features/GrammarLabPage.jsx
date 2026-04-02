import { useState } from "react";
import { grammarLessons } from "../../data/featureContent";

export default function GrammarLabPage() {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [picked, setPicked] = useState(null);

  const lesson = grammarLessons[lessonIndex];
  const isCorrect = picked === lesson.exercise.answer;

  return (
    <main className="page feature-page">
      <h1 className="feature-title">Ngu Phap</h1>
      <div className="lesson-tabs">
        {grammarLessons.map((item, idx) => (
          <button
            key={item.id}
            className={lessonIndex === idx ? "active" : ""}
            onClick={() => {
              setLessonIndex(idx);
              setPicked(null);
            }}
            type="button"
          >
            {item.title}
          </button>
        ))}
      </div>

      <section className="content-card">
        <h2>{lesson.title}</h2>
        <ul className="script-list">
          {lesson.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <h3>Vi du</h3>
        <ul className="script-list">
          {lesson.examples.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="content-card">
        <h3>{lesson.exercise.prompt}</h3>
        <div className="quiz-options vertical">
          {lesson.exercise.options.map((opt, idx) => (
            <button
              key={opt}
              className={picked === idx ? "active" : ""}
              onClick={() => setPicked(idx)}
              type="button"
            >
              {opt}
            </button>
          ))}
        </div>
        {picked !== null ? (
          <p className="score-text">{isCorrect ? "Chinh xac" : "Chua dung, thu lai"}</p>
        ) : null}
      </section>
    </main>
  );
}
