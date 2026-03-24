function FillInBlankQuestion({ question, value, onChange }) {
  return (
    <article className="exercise-card">
      <h3>{question.prompt}</h3>
      <label>
        Your answer
        <input
          type="text"
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Type your answer"
        />
      </label>
    </article>
  );
}

export default FillInBlankQuestion;