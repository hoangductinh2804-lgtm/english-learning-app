import { useState } from "react";
import { readingArticles } from "../../data/featureContent";

export default function ReadingPracticePage() {
  const [articleIndex, setArticleIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const article = readingArticles[articleIndex];
  const score = article.questions.reduce((sum, question, idx) => {
    if (answers[idx] === question.answer) return sum + 1;
    return sum;
  }, 0);

  return (
    <main className="page feature-page">
      <h1 className="feature-title">Luyen Doc</h1>
      <div className="lesson-tabs">
        {readingArticles.map((item, idx) => (
          <button
            key={item.id}
            className={articleIndex === idx ? "active" : ""}
            onClick={() => {
              setArticleIndex(idx);
              setAnswers({});
            }}
            type="button"
          >
            Bai {idx + 1}
          </button>
        ))}
      </div>

      <section className="content-card">
        <h2>{article.title}</h2>
        <p className="level-badge">Level: {article.level}</p>
        <p className="article-body">{article.content}</p>
      </section>

      <section className="content-card">
        <h3>Doc hieu</h3>
        {article.questions.map((question, idx) => (
          <article className="quiz-item" key={question.prompt}>
            <p>{question.prompt}</p>
            <div className="quiz-options">
              {question.options.map((opt, optIdx) => (
                <button
                  key={opt}
                  className={answers[idx] === optIdx ? "active" : ""}
                  onClick={() => setAnswers((prev) => ({ ...prev, [idx]: optIdx }))}
                  type="button"
                >
                  {opt}
                </button>
              ))}
            </div>
          </article>
        ))}
        <p className="score-text">
          Diem doc hieu: {score}/{article.questions.length}
        </p>
      </section>

      <section className="content-card">
        <h3>Glossary</h3>
        <div className="vocab-list">
          {article.vocabulary.map((item) => (
            <article className="vocab-item" key={item.word}>
              <p className="vocab-head">
                <strong>{item.word}</strong>
                <span>{item.ipa}</span>
              </p>
              <p className="vocab-meaning">{item.meaning}</p>
              <p className="vocab-example">{item.example}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
