import { useEffect, useMemo, useState } from "react";

function GrammarExercise({ exercises = [] }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
  }, [exercises]);

  const score = useMemo(() => {
    if (!submitted || exercises.length === 0) {
      return 0;
    }

    return exercises.reduce((acc, exercise, index) => {
      return answers[index] === exercise.answer ? acc + 1 : acc;
    }, 0);
  }, [answers, exercises, submitted]);

  function handleChoose(index, option) {
    setAnswers((prev) => ({ ...prev, [index]: option }));
  }

  if (exercises.length === 0) {
    return null;
  }

  return (
    <section className="grammar-block">
      <h2>Grammar Exercises</h2>
      <div className="grammar-qa-list">
        {exercises.map((exercise, index) => (
          <article key={`${exercise.question}-${index}`} className="grammar-qa-item">
            <h3>
              {index + 1}. {exercise.question}
            </h3>

            <div className="option-list">
              {exercise.options.map((option) => {
                const inputId = `exercise-${index}-${option}`;
                const isSelected = answers[index] === option;
                const isCorrect = option === exercise.answer;
                const showCorrect = submitted && isCorrect;
                const showWrong = submitted && isSelected && !isCorrect;

                return (
                  <label
                    key={inputId}
                    htmlFor={inputId}
                    className={`option ${showCorrect ? "correct" : ""} ${showWrong ? "wrong" : ""}`}
                  >
                    <input
                      id={inputId}
                      type="radio"
                      name={`exercise-${index}`}
                      checked={isSelected}
                      onChange={() => handleChoose(index, option)}
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <div className="grammar-actions">
        <button onClick={() => setSubmitted(true)}>Submit Exercises</button>
      </div>

      {submitted ? (
        <p className="score-text">
          Score: {score}/{exercises.length}
        </p>
      ) : null}
    </section>
  );
}

export default GrammarExercise;