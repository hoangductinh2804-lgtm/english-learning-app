import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { listeningLessons } from "../../data/featureContent";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const topicImages = {
  "Daily Life": "/images/topics/daily-life.svg",
  "Food & Drink": "/images/topics/food-drink.svg",
  "Jobs & Occupations": "/images/topics/jobs-occupations.svg",
  Travel: "/images/topics/daily-life.svg",
  Shopping: "/images/topics/food-drink.svg",
  Education: "/images/topics/jobs-occupations.svg",
  Health: "/images/topics/jobs-occupations.svg",
  Family: "/images/topics/daily-life.svg",
};

function getTopicImage(topic) {
  return topicImages[topic] || "/images/topics/daily-life.svg";
}

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
      <h1 className="feature-title">Luyện nghe</h1>
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
            Nghe đoạn hội thoại
        </button>
        <ul className="script-list">
          {lesson.script.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="content-card">
        <h3>Câu hỏi nghe hiểu</h3>
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
          Điểm hiện tại: {score}/{lesson.questions.length}
        </p>
      </section>

      <section className="content-card">
        <h3>Từ vựng theo bài nghe</h3>
        <div className="vocab-list">
          {lesson.vocabulary.map((item) => {
            const imageSrc = item.image || `/images/vocabulary-cards/${slugify(item.word)}.svg` || getTopicImage(lesson.topic);
            return (
              <article className="vocab-item vocab-with-image" key={item.word}>
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt={item.word}
                    className="vocab-image"
                    onError={(event) => {
                      event.currentTarget.src = getTopicImage(lesson.topic);
                    }}
                  />
                )}
                <div className="vocab-content">
                  <p className="vocab-head">
                    <strong>{item.word}</strong>
                    <span>{item.ipa}</span>
                  </p>
                  <p className="vocab-meaning">{item.meaning}</p>
                  <p className="vocab-example">{item.example}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
