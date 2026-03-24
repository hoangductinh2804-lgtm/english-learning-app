import { useEffect, useMemo, useState } from "react";

function GrammarQuiz({ quiz = [] }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
  }, [quiz]);

  const score = useMemo(() => {
    if (!submitted || quiz.length === 0) {
      return 0;
    }

    return quiz.reduce((acc, question, index) => {
      return answers[index] === question.answer ? acc + 1 : acc;
    }, 0);
  }, [answers, quiz, submitted]);

  if (quiz.length === 0) {
    return null;
  }

  return (
    <section className="grammar-block">
      <h2>Grammar Quiz</h2>
      <div className="grammar-qa-list">
        {quiz.map((question, index) => {
          const selectedValue = answers[index];
          const isAnswerCorrect = submitted && selectedValue === question.answer;

          return (
            <article key={`${question.question}-${index}`} className="grammar-qa-item">
              <h3>
                {index + 1}. {question.question}
              </h3>

              <div className="option-list">
                {question.options.map((option) => {
                  const inputId = `quiz-${index}-${option}`;
                  const isSelected = selectedValue === option;
                  const isCorrectOption = option === question.answer;
                  const showCorrect = submitted && isCorrectOption;
                  const showWrong = submitted && isSelected && !isCorrectOption;

                  return (
                    <label
                      key={inputId}
                      htmlFor={inputId}
                      className={`option ${showCorrect ? "correct" : ""} ${showWrong ? "wrong" : ""}`}
                    >
                      <input
                        id={inputId}
                        type="radio"
                        name={`quiz-${index}`}
                        checked={isSelected}
                        onChange={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [index]: option,
                          }))
                        }
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>

              {submitted && question.explanation ? (
                <p className="explanation-text">
                  {isAnswerCorrect ? "Correct. " : "Review: "}
                  {question.explanation}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="grammar-actions">
        <button onClick={() => setSubmitted(true)}>Submit Quiz</button>
      </div>

      {submitted ? (
        <p className="score-text">
          Quiz result: {score}/{quiz.length}
        </p>
      ) : null}
    </section>
  );
}

export default GrammarQuiz;