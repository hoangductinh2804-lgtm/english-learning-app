import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyProgress,
  getVocabulary,
  reviewVocabulary,
} from "../api/client";
import Flashcard from "../components/Flashcard";
import VocabularyCard from "../components/VocabularyCard";
import { useAuth } from "../context/AuthContext";

const LEVEL_OPTIONS = ["all", "beginner", "intermediate", "advanced"];

function VocabularyPage() {
  const { token, refreshUser } = useAuth();
  const [items, setItems] = useState([]);
  const [topics, setTopics] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const progressMap = useMemo(() => {
    return progressList.reduce((acc, row) => {
      if (row.vocabulary?._id) {
        acc[row.vocabulary._id] = row;
      }
      return acc;
    }, {});
  }, [progressList]);

  async function fetchVocabulary() {
    setLoading(true);
    setError("");

    try {
      const params = {};
      if (selectedLevel !== "all") {
        params.level = selectedLevel;
      }
      if (selectedTopic !== "all") {
        params.topic = selectedTopic;
      }

      const response = await getVocabulary(params);

      setItems(response.vocabulary || []);
      if (response.topics) {
        setTopics(response.topics.slice().sort((a, b) => a.localeCompare(b)));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchProgress() {
    try {
      const response = await getMyProgress(token);
      setProgressList(response.progress || []);
    } catch (_err) {
      setProgressList([]);
    }
  }

  useEffect(() => {
    fetchVocabulary();
  }, [selectedLevel, selectedTopic]);

  useEffect(() => {
    fetchProgress();
  }, []);

  async function handleReview(vocabularyId, isCorrect, status) {
    try {
      const response = await reviewVocabulary(token, vocabularyId, { isCorrect, status });
      await refreshUser();

      setProgressList((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.vocabulary?._id === response.progress.vocabulary?._id
        );

        if (existingIndex === -1) {
          return [response.progress, ...prev];
        }

        const clone = [...prev];
        clone[existingIndex] = response.progress;
        return clone;
      });
    } catch (_err) {
      setError("Failed to update progress");
    }
  }

  return (
    <main className="vocabulary-page">
      <section className="vocabulary-header">
        <h1>Vocabulary Learning</h1>
        <p>Lọc theo chủ đề và level để học nhanh hơn.</p>
        <Link to="/dashboard">Back to dashboard</Link>
      </section>

      <section className="filters">
        <label>
          Level
          <select
            value={selectedLevel}
            onChange={(event) => setSelectedLevel(event.target.value)}
          >
            {LEVEL_OPTIONS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label>
          Topic
          <select
            value={selectedTopic}
            onChange={(event) => setSelectedTopic(event.target.value)}
          >
            <option value="all">all</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="secondary-btn"
          onClick={() => {
            setSelectedLevel("all");
            setSelectedTopic("all");
          }}
        >
          Reset bộ lọc
        </button>
      </section>

      <p className="score-text">
        Hiển thị {items.length} từ | Level: {selectedLevel} | Chủ đề: {selectedTopic}
      </p>

      <Flashcard items={items} onReview={handleReview} />

      {error ? <p className="error-text">{error}</p> : null}
      {loading ? <p className="loading">Loading vocabulary...</p> : null}

      <section className="vocabulary-grid">
        {items.map((item) => (
          <VocabularyCard
            key={item._id}
            item={item}
            progress={progressMap[item._id]}
          />
        ))}
      </section>
    </main>
  );
}

export default VocabularyPage;
