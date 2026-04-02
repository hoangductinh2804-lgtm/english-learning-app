import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { listeningLessons } from "../../data/featureContent";

export default function ListeningPracticePage() {
  const { slug } = useParams();
  const [lessonIndex, setLessonIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const activeLessons = useMemo(() => {
    if (!slug) return listeningLessons;

    if (slug === "daily-life") {
      return listeningLessons.filter((item) => item.topic === "Daily Life");
    }

    if (slug === "food-drink") {
      return listeningLessons.filter((item) => item.topic === "Food & Drink");
    }

    return listeningLessons;
  }, [slug]);

  const lesson = activeLessons[Math.min(lessonIndex, activeLessons.length - 1)] || listeningLessons[0];

  function speakLesson() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const script = lesson.script.join(" ");
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  const score = lesson.questions.reduce((sum, question, idx) => {
    if (selectedAnswers[idx] === question.answer) return sum + 1;
    return sum;
  }, 0);

  return (
    <main className="page feature-page">
      <h1 className="feature-title">Luyen Nghe</h1>
      <div className="lesson-tabs">
        {activeLessons.map((item, idx) => (
          <button
            key={item.id}
            className={lessonIndex === idx ? "active" : ""}
            onClick={() => {
              setLessonIndex(idx);
              setSelectedAnswers({});
            }}
            type="button"
          >
            {item.topic}
          </button>
        ))}
      </div>

      <section className="content-card">
        <h2>{lesson.title}</h2>
        <button className="primary-btn" onClick={speakLesson} type="button">
          Nghe doan hoi thoai
        </button>
        <ul className="script-list">
          {lesson.script.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="content-card">
        <h3>Cau hoi nghe hieu</h3>
        {lesson.questions.map((question, idx) => (
          <article className="quiz-item" key={question.prompt}>
            <p>{question.prompt}</p>
            <div className="quiz-options">
              {question.options.map((opt, optIdx) => (
                <button
                  key={opt}
                  className={selectedAnswers[idx] === optIdx ? "active" : ""}
                  onClick={() => setSelectedAnswers((prev) => ({ ...prev, [idx]: optIdx }))}
                  type="button"
                >
                  {opt}
                </button>
              ))}
            </div>
          </article>
        ))}
        <p className="score-text">
          Diem hien tai: {score}/{lesson.questions.length}
        </p>
      </section>
    </main>
  );
}
