import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getConversations } from "../api/client";

const DIFFICULTY_TABS = [
  { key: "easy", label: "Dễ" },
  { key: "medium", label: "Vừa" },
  { key: "hard", label: "Khó" },
];

function ConversationPracticePage() {
  const [conversations, setConversations] = useState([]);
  const [activeDifficulty, setActiveDifficulty] = useState("easy");
  const [selectedConv, setSelectedConv] = useState(null);
  const [showTranslations, setShowTranslations] = useState({});
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const utteranceRef = useRef(null);

  useEffect(() => {
    async function fetchConversations() {
      setLoading(true);
      setError("");
      try {
        const data = await getConversations();
        setConversations(data.conversations || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchConversations();
  }, []);

  const filtered = conversations.filter((c) => c.difficulty === activeDifficulty);

  function handleTabChange(key) {
    setActiveDifficulty(key);
    setSelectedConv(null);
    setStarted(false);
  }

  function handleSelectConv(conv) {
    setSelectedConv(conv);
    setStarted(false);
    setShowTranslations({});
  }

  function toggleTranslation(id) {
    setShowTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function speakLine(text) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-US";
      utteranceRef.current = utter;
      window.speechSynthesis.speak(utter);
    }
  }

  function playAll() {
    if (!selectedConv || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    let i = 0;
    function speakNext() {
      if (i >= selectedConv.dialogues.length) return;
      const utter = new SpeechSynthesisUtterance(selectedConv.dialogues[i].text);
      utter.lang = "en-US";
      i++;
      utter.onend = () => {
        setTimeout(speakNext, 400);
      };
      window.speechSynthesis.speak(utter);
    }
    speakNext();
  }

  function stopAll() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  return (
    <main className="app-page">
      <div className="page-container">
        <header className="page-header">
          <Link to="/dashboard" className="back-btn">← Trang chủ</Link>
          <h1 className="page-title">Hội thoại</h1>
        </header>

        {/* Difficulty Tabs */}
        <div className="difficulty-tabs">
          {DIFFICULTY_TABS.map((tab) => (
            <button
              key={tab.key}
              className={`diff-tab${activeDifficulty === tab.key ? " diff-tab--active" : ""}`}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && <p className="error-text">{error}</p>}
        {loading ? (
          <p className="loading">Đang tải hội thoại...</p>
        ) : (
          <div className="conv-layout">
            {/* Conversation List */}
            <div className="conv-list">
              {filtered.length === 0 ? (
                <p className="empty-state">Không có hội thoại ở mức này.</p>
              ) : (
                filtered.map((conv) => (
                  <button
                    key={conv.id}
                    className={`conv-item${selectedConv?.id === conv.id ? " conv-item--active" : ""}`}
                    onClick={() => handleSelectConv(conv)}
                  >
                    <span className="conv-icon">💬</span>
                    <div>
                      <strong>{conv.title}</strong>
                      <small>{conv.dialogues.length} dòng</small>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Dialogue View */}
            {selectedConv && (
              <div className="dialogue-view">
                <div className="dialogue-header">
                  <h2>{selectedConv.title}</h2>
                  <p>{selectedConv.description}</p>
                  {!started ? (
                    <button className="start-listening-btn" onClick={() => { setStarted(true); playAll(); }}>
                      ▶ Bắt đầu nghe
                    </button>
                  ) : (
                    <button className="stop-listening-btn" onClick={stopAll}>
                      ⏹ Dừng
                    </button>
                  )}
                </div>

                <ul className="dialogue-list">
                  {selectedConv.dialogues.map((line) => (
                    <li key={line.id} className="dialogue-line">
                      <div className="dialogue-line-header">
                        <span className="speaker-avatar">{line.speaker[0]}</span>
                        <strong className="speaker-name">{line.speaker}</strong>
                        <button className="line-speak-btn" onClick={() => speakLine(line.text)} title="Phát âm">
                          🔊
                        </button>
                        <button
                          className="translate-btn"
                          onClick={() => toggleTranslation(line.id)}
                          title="Dịch"
                        >
                          🌐
                        </button>
                      </div>
                      <p className="dialogue-text">{line.text}</p>
                      {showTranslations[line.id] && (
                        <p className="dialogue-translation">{line.translation}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default ConversationPracticePage;
