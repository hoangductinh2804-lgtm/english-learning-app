import { useState } from "react";
import { voiceScenarios } from "../../data/featureContent";

export default function VoiceToVoicePage() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenario = voiceScenarios[scenarioIndex];

  function speakPrompt() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(scenario.prompt);
    utterance.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return (
    <main className="page feature-page">
      <h1 className="feature-title">Voice to Voice</h1>
      <div className="lesson-tabs">
        {voiceScenarios.map((item, idx) => (
          <button
            key={item.title}
            className={scenarioIndex === idx ? "active" : ""}
            onClick={() => setScenarioIndex(idx)}
            type="button"
          >
            Scenario {idx + 1}
          </button>
        ))}
      </div>

      <section className="content-card">
        <h2>{scenario.title}</h2>
        <p className="article-body">{scenario.prompt}</p>
        <button className="primary-btn" onClick={speakPrompt} type="button">
          Nghe de bai
        </button>
        <h3>Mau cau goi y</h3>
        <ul className="script-list">
          {scenario.usefulPhrases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
