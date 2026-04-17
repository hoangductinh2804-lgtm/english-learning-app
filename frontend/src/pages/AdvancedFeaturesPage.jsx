import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  correctWriting,
  getConversations,
  getListeningTracks,
  getSpeakingPrompts,
} from "../api/client";

const FEATURE_TABS = ["listening", "speaking", "writing", "conversation"];
const DIFFICULTY_TABS = ["easy", "medium", "hard"];

function AdvancedFeaturesPage() {
  const [activeTab, setActiveTab] = useState("listening");
  const [tracks, setTracks] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeDifficulty, setActiveDifficulty] = useState("easy");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [speechText, setSpeechText] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [essayText, setEssayText] = useState("");
  const [writingResult, setWritingResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [writingLoading, setWritingLoading] = useState(false);
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);

  const supportsSpeech = useMemo(() => {
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }, []);

  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => c.difficulty === activeDifficulty);
  }, [conversations, activeDifficulty]);

  useEffect(() => {
    async function fetchAdvancedData() {
      setLoading(true);
      setError("");

      try {
        const [listeningData, promptData, conversationData] = await Promise.all([
          getListeningTracks(),
          getSpeakingPrompts(),
          getConversations(),
        ]);

        setTracks(listeningData.tracks || []);
        const nextPrompts = promptData.prompts || [];
        setPrompts(nextPrompts);
        setSelectedPrompt(nextPrompts[0] || "");
        setConversations(conversationData.conversations || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAdvancedData();
  }, []);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  function startSpeaking() {
    if (!supportsSpeech) {
      setError("Web Speech API is not supported in this browser.");
      return;
    }

    setError("");

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionClass();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");
      setSpeechText(transcript);
    };

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setSpeaking(false);
    };

    recognition.onend = () => {
      setSpeaking(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setSpeaking(true);
  }

  function stopSpeaking() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setSpeaking(false);
    }
  }

  async function handleCorrectEssay() {
    setWritingLoading(true);
    setError("");

    try {
      const response = await correctWriting(essayText);
      setWritingResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setWritingLoading(false);
    }
  }

  return (
    <main className="advanced-page">
      <section className="page-header">
        <h1>🎙️ Advanced Skills</h1>
        <p>Practice Listening, Speaking, Writing and Conversation in one place.</p>
        <div className="page-header-links">
          <Link to="/dashboard">← Dashboard</Link>
          <Link to="/gamification">🏆 Leaderboard</Link>
        </div>
      </section>

      <div className="tab-row">
        {FEATURE_TABS.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "listening" && "🎧 "}
            {tab === "speaking"  && "🎤 "}
            {tab === "writing"   && "✍️ "}
            {tab === "conversation" && "💬 "}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {error ? <p className="error-text">{error}</p> : null}
      {loading ? <p className="loading">Loading advanced features...</p> : null}

      {!loading && activeTab === "listening" ? (
        <section className="exercise-block">
          <h2>Listening</h2>
          <div className="advanced-card-grid">
            {tracks.map((track) => (
              <article key={track.id} className="advanced-card">
                <h3>{track.title}</h3>
                <p>
                  <strong>Level:</strong> {track.level} | <strong>Duration:</strong> {track.duration}
                </p>
                <audio controls src={track.audioUrl} preload="none" />
                <details>
                  <summary>Transcript</summary>
                  <p>{track.transcript}</p>
                </details>
                <h4>Quick Questions</h4>
                <ul className="rule-list">
                  {track.questions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {!loading && activeTab === "speaking" ? (
        <section className="exercise-block">
          <h2>Speaking (Web Speech API)</h2>
          <label>
            Speaking prompt
            <select
              value={selectedPrompt}
              onChange={(event) => setSelectedPrompt(event.target.value)}
            >
              {prompts.map((prompt) => (
                <option key={prompt} value={prompt}>
                  {prompt}
                </option>
              ))}
            </select>
          </label>

          <p className="prompt-box">{selectedPrompt}</p>

          <div className="speech-actions">
            <button onClick={startSpeaking} disabled={speaking}>
              {speaking ? "Listening..." : "Start Speaking"}
            </button>
            <button onClick={stopSpeaking} disabled={!speaking}>
              Stop
            </button>
          </div>

          <label>
            Live transcript
            <textarea
              value={speechText}
              onChange={(event) => setSpeechText(event.target.value)}
              rows={8}
              placeholder="Your spoken text appears here..."
            />
          </label>
        </section>
      ) : null}

      {!loading && activeTab === "writing" ? (
        <section className="exercise-block">
          <h2>Writing (Essay Correction)</h2>
          <label>
            Write your paragraph
            <textarea
              value={essayText}
              onChange={(event) => setEssayText(event.target.value)}
              rows={10}
              placeholder="Write at least 2 sentences in English..."
            />
          </label>
          <div className="speech-actions">
            <button onClick={handleCorrectEssay} disabled={writingLoading}>
              {writingLoading ? "Correcting..." : "Check Writing"}
            </button>
          </div>

          {writingResult ? (
            <div className="writing-result-box">
              <p>
                <strong>Score:</strong> {writingResult.score}
              </p>
              <p>
                <strong>Word count:</strong> {writingResult.wordCount} | <strong>Sentences:</strong>{" "}
                {writingResult.sentenceCount}
              </p>
              <p>
                <strong>Corrected text:</strong>
              </p>
              <p>{writingResult.correctedText}</p>
              {writingResult.suggestions?.length ? (
                <>
                  <p>
                    <strong>Suggestions:</strong>
                  </p>
                  <ul className="rule-list">
                    {writingResult.suggestions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}

      {!loading && activeTab === "conversation" ? (
        <section className="exercise-block">
          <h2>Conversation Practice</h2>
          <p>Read dialogues, study translations, and practice speaking lines aloud.</p>

          <div className="tab-row">
            {DIFFICULTY_TABS.map((diff) => (
              <button
                key={diff}
                className={activeDifficulty === diff ? "active" : ""}
                onClick={() => setActiveDifficulty(diff)}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>

          {filteredConversations.length === 0 ? (
            <p>No conversations available for this level.</p>
          ) : null}

          <div className="advanced-card-grid">
            {filteredConversations.map((conv) => (
              <article key={conv.id} className="advanced-card conversation-card">
                <h3>{conv.title}</h3>
                <span className={`difficulty-badge difficulty-${conv.difficulty}`}>
                  {conv.difficulty}
                </span>
                <div className="dialogue-list">
                  {conv.dialogues.map((line, idx) => (
                    <div
                      key={idx}
                      className={`dialogue-line dialogue-line--${idx % 2 === 0 ? "left" : "right"}`}
                    >
                      <strong className="dialogue-speaker">{line.speaker}:</strong>
                      <span className="dialogue-text">{line.text}</span>
                      <span className="dialogue-translation">{line.translation}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

export default AdvancedFeaturesPage;