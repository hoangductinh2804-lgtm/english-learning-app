import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyProgress,
  getVocabulary,
  getVocabularyByLevel,
  getVocabularyByTopic,
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
      let response;

      if (selectedLevel !== "all" && selectedTopic !== "all") {
        response = await getVocabulary({ level: selectedLevel, topic: selectedTopic });
      } else if (selectedLevel !== "all") {
        response = await getVocabularyByLevel(selectedLevel);
      } else if (selectedTopic !== "all") {
        response = await getVocabularyByTopic(selectedTopic);
      } else {
        response = await getVocabulary();
      }

      setItems(response.vocabulary || []);
      if (response.topics) {
        setTopics(response.topics);
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
        <p>Filter words by level/topic, then review quickly with flashcards.</p>
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
      </section>

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
