function MultipleChoiceQuestion({ question, value, onChange }) {
  return (
    <article className="exercise-card">
      <h3>{question.prompt}</h3>
      <div className="option-list">
        {question.options.map((option) => {
          const inputId = `${question._id}-${option}`;
          const isSelected = value === option;

          return (
            <label key={inputId} htmlFor={inputId} className="option">
              <input
                id={inputId}
                type="radio"
                name={`mc-${question._id}`}
                checked={isSelected}
                onChange={() => onChange(option)}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </article>
  );
}

export default MultipleChoiceQuestion;