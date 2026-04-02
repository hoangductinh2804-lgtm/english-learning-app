import { useState } from "react";
import { voiceScenarios } from "../../data/featureContent";

export default function VoiceToVoicePage() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [practiced, setPracticed] = useState({});
  const scenario = voiceScenarios[scenarioIndex];

  function speakPrompt() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(scenario.prompt);
    utterance.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function speakPhrase(phrase) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function markPracticed(phrase) {
    setPracticed(prev => ({
      ...prev,
      [phrase]: !prev[phrase]
    }));
  }

  return (
    <main className="page feature-page">
      <h1 className="feature-title">🗣 Voice Practice</h1>
      <p className="feature-intro">Tap noi va thanh mat sau trong cac tinh huong thuc te</p>

      <div className="lesson-tabs">
        {voiceScenarios.map((item, idx) => (
          <button
            key={item.title}
            className={scenarioIndex === idx ? "active" : ""}
            onClick={() => {
              setScenarioIndex(idx);
              setPracticed({});
            }}
            type="button"
          >
            Tinh Huong {idx + 1}
          </button>
        ))}
      </div>

      <section className="content-card voice-scenario">
        <div className="scenario-header">
          <h2>📍 {scenario.title}</h2>
        </div>

        <div className="scenario-prompt-box">
          <h3>Tinh Huong:</h3>
          <p className="article-body">{scenario.prompt}</p>
          <button className="primary-btn" onClick={speakPrompt} type="button">
            ▶ Nghe de bai
          </button>
        </div>

        <div className="phrases-practice">
          <h3>📜 Cau mau va Mau Dap Loi:</h3>
          <div className="phrase-practice-list">
            {scenario.usefulPhrases.map((phrase, idx) => (
              <div 
                key={phrase} 
                className={`phrase-practice-item ${practiced[phrase] ? "practiced" : ""}`}
              >
                <div className="phrase-number">{idx + 1}</div>
                <div className="phrase-content">
                  <p className="phrase-text">{phrase}</p>
                  <div className="phrase-actions">
                    <button 
                      className="phrase-btn speak"
                      onClick={() => speakPhrase(phrase)} 
                      type="button"
                      title="Nghe phat am"
                    >
                      ▶ Nghe
                    </button>
                    <button 
                      className={`phrase-btn practice ${practiced[phrase] ? "done" : ""}`}
                      onClick={() => markPracticed(phrase)}
                      type="button"
                      title="Danh dau da tap"
                    >
                      {practiced[phrase] ? "✓ Da tap" : "Tap noi"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="vocabulary-section">
          <h3>📚 Tu Vung Trong Tinh Huong:</h3>
          <div className="vocab-chip-grid">
            {scenario.vocabulary.map((word, idx) => (
              <button 
                key={word} 
                className="vocab-chip-btn" 
                onClick={() => speakPhrase(word)} 
                type="button"
                title={`Nghe: ${word}`}
              >
                <span className="chip-number">{idx + 1}</span>
                <span>{word}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="voice-tips">
          <h3>💡 Huong Dan Noi Tot Hơn:</h3>
          <div className="tips-list">
            <div className="tip-item">
              <span className="tip-icon">1.</span>
              <p>Tap phat am trước, sau đó nói tự nhiên</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">2.</span>
              <p>Ghi âm giọng nói của bạn để so sánh</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">3.</span>
              <p>Nói chậm trước, sau đó tăng tốc độ</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">4.</span>
              <p>Chú ý trọng âm và intonation</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">5.</span>
              <p>Tap 5-10 lần với mỗi câu</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">6.</span>
              <p>Nói to và rõ ràng, không nhỏ giọng</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
