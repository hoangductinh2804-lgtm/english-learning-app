import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getListeningTracks } from "../api/client";

const DIFFICULTY_TABS = [
  { key: "beginner", label: "Dễ" },
  { key: "intermediate", label: "Vừa" },
  { key: "advanced", label: "Khó" },
];

function ListeningPracticePage() {
  const [tracks, setTracks] = useState([]);
  const [activeDifficulty, setActiveDifficulty] = useState("beginner");
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    async function fetchTracks() {
      setLoading(true);
      setError("");
      try {
        const data = await getListeningTracks();
        setTracks(data.tracks || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTracks();
  }, []);

  const filteredTracks = tracks.filter((t) => t.level === activeDifficulty);

  function handleSelectTrack(track) {
    setSelectedTrack(track);
    setAnswer("");
    setResult(null);
    setPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  function handleTabChange(key) {
    setActiveDifficulty(key);
    setSelectedTrack(null);
    setAnswer("");
    setResult(null);
  }

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        setError("Không thể phát audio. Kiểm tra kết nối mạng.");
      });
      setPlaying(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedTrack) return;
    const correct = selectedTrack.transcript
      .toLowerCase()
      .includes(answer.trim().toLowerCase());
    setResult(correct ? "correct" : "incorrect");
  }

  function getBlankTranscript(transcript) {
    const words = transcript.split(" ");
    if (words.length < 4) return transcript + " ____";
    const idx = Math.floor(words.length / 2);
    return words.map((w, i) => (i === idx ? "____" : w)).join(" ");
  }

  return (
    <main className="app-page">
      <div className="page-container">
        <header className="page-header">
          <Link to="/dashboard" className="back-btn">← Trang chủ</Link>
          <h1 className="page-title">Luyện Nghe</h1>
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
          <p className="loading">Đang tải bài nghe...</p>
        ) : (
          <div className="listening-layout">
            {/* Track List */}
            <div className="track-list">
              {filteredTracks.length === 0 ? (
                <p className="empty-state">Không có bài nghe nào ở mức độ này.</p>
              ) : (
                filteredTracks.map((track) => (
                  <button
                    key={track.id}
                    className={`track-item${selectedTrack?.id === track.id ? " track-item--active" : ""}`}
                    onClick={() => handleSelectTrack(track)}
                  >
                    <span className="track-icon">🎵</span>
                    <div className="track-info">
                      <strong>{track.title}</strong>
                      <small>{track.duration}</small>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Player & Exercise */}
            {selectedTrack && (
              <div className="listening-exercise">
                <div className="audio-player">
                  <audio
                    ref={audioRef}
                    src={selectedTrack.audioUrl}
                    onEnded={() => setPlaying(false)}
                    preload="none"
                  />
                  <button className="play-btn" onClick={togglePlay}>
                    {playing ? "⏸ Dừng" : "▶ Phát"}
                  </button>
                  <span className="track-title-display">{selectedTrack.title}</span>
                </div>

                <div className="exercise-box">
                  <h4>Điền vào chỗ trống:</h4>
                  <p className="blank-transcript">{getBlankTranscript(selectedTrack.transcript)}</p>

                  <form onSubmit={handleSubmit} className="answer-form">
                    <input
                      type="text"
                      className="answer-input"
                      placeholder="Nhập từ còn thiếu..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                    <button type="submit" className="submit-btn">Kiểm tra</button>
                  </form>

                  {result && (
                    <div className={`result-banner result-banner--${result}`}>
                      {result === "correct" ? "✅ Chính xác! Rất giỏi!" : "❌ Chưa đúng, thử lại nhé!"}
                    </div>
                  )}

                  <div className="exercise-questions">
                    <h4>Câu hỏi:</h4>
                    <ul>
                      {selectedTrack.questions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/advanced" className="speaking-link-btn">
                    🎤 Luyện nói
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default ListeningPracticePage;
