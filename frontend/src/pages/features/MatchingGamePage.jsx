import { useMemo, useState } from "react";
import { matchingPairs } from "../../data/featureContent";

export default function MatchingGamePage() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matched, setMatched] = useState({});

  const rightWords = useMemo(() => {
    return [...matchingPairs].sort((a, b) => a.right.localeCompare(b.right));
  }, []);

  function chooseRight(rightValue) {
    if (!selectedLeft) return;
    const pair = matchingPairs.find((item) => item.left === selectedLeft);
    if (pair?.right === rightValue) {
      setMatched((prev) => ({ ...prev, [selectedLeft]: true }));
    }
    setSelectedLeft(null);
  }

  const score = Object.keys(matched).length;

  return (
    <main className="page feature-page">
      <h1 className="feature-title">Ghep The</h1>
      <section className="content-card">
        <p>Chon mot tu tieng Anh o cot trai, sau do chon nghia dung o cot phai.</p>
        <div className="matching-grid">
          <div>
            {matchingPairs.map((pair) => (
              <button
                key={pair.left}
                className={`match-chip ${selectedLeft === pair.left ? "active" : ""} ${
                  matched[pair.left] ? "done" : ""
                }`}
                onClick={() => setSelectedLeft(pair.left)}
                type="button"
              >
                {pair.left}
              </button>
            ))}
          </div>
          <div>
            {rightWords.map((pair) => (
              <button
                key={pair.right}
                className="match-chip"
                onClick={() => chooseRight(pair.right)}
                type="button"
              >
                {pair.right}
              </button>
            ))}
          </div>
        </div>
        <p className="score-text">
          Da ghep dung: {score}/{matchingPairs.length}
        </p>
      </section>
    </main>
  );
}
