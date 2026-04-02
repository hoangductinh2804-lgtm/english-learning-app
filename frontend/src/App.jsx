import { Navigate, Route, Routes } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import CategoryPage from "./pages/CategoryPage";
import GrammarLabPage from "./pages/features/GrammarLabPage";
import ListeningPracticePage from "./pages/features/ListeningPracticePage";
import MatchingGamePage from "./pages/features/MatchingGamePage";
import PronunciationPage from "./pages/features/PronunciationPage";
import ReadingPracticePage from "./pages/features/ReadingPracticePage";
import ToolsPage from "./pages/features/ToolsPage";
import VoiceToVoicePage from "./pages/features/VoiceToVoicePage";
import WritingPage from "./pages/features/WritingPage";
import HomePage from "./pages/HomePage";
import StudyPage from "./pages/StudyPage";

function AppShell() {
  return (
    <div className="mobile-shell">
      <div className="mobile-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flashcards" element={<CategoryPage mode="flashcard" />} />
          <Route path="/listening" element={<CategoryPage mode="listening" />} />
          <Route path="/listening/practice/:slug" element={<ListeningPracticePage />} />
          <Route path="/reading" element={<ReadingPracticePage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/grammar" element={<GrammarLabPage />} />
          <Route path="/matching" element={<MatchingGamePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/pronunciation" element={<PronunciationPage />} />
          <Route path="/voice" element={<VoiceToVoicePage />} />
          <Route path="/study/:slug" element={<StudyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
