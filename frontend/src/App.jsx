import { Navigate, Route, Routes } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import CategoryPage from "./pages/CategoryPage";
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
