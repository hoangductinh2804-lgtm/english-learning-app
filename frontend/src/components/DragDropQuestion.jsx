import { useEffect, useMemo, useState } from "react";

function DragDropQuestion({ question, value, onChange }) {
  const initialWords = useMemo(() => value || question.options || [], [value, question.options]);
  const [words, setWords] = useState(initialWords);
  const [draggingIndex, setDraggingIndex] = useState(null);

  useEffect(() => {
    setWords(value || question.options || []);
  }, [question.options, value]);

  function handleDragStart(index) {
    setDraggingIndex(index);
  }

  function handleDrop(dropIndex) {
    if (draggingIndex === null || draggingIndex === dropIndex) {
      return;
    }

    const clone = [...words];
    const [moved] = clone.splice(draggingIndex, 1);
    clone.splice(dropIndex, 0, moved);

    setWords(clone);
    onChange(clone);
    setDraggingIndex(null);
  }

  return (
    <article className="exercise-card">
      <h3>{question.prompt}</h3>
      <div className="drag-list">
        {words.map((word, index) => (
          <button
            key={`${word}-${index}`}
            type="button"
            className="drag-chip"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
            {word}
          </button>
        ))}
      </div>
      <p className="drag-help">Drag words to reorder into a correct sentence.</p>
    </article>
  );
}

export default DragDropQuestion;