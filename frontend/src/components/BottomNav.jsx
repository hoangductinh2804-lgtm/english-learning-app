import { NavLink } from "react-router-dom";

const items = [
  { to: "/", icon: "⌂", label: "Trang chủ" },
  { to: "/flashcards", icon: "▦", label: "Kho bài" },
  { to: "/listening", icon: "◉", label: "Luyện nghe" },
  { to: "/writing", icon: "✍", label: "Luyện viết" },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map((item) => (
        <NavLink
          key={item.to}
          className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
          to={item.to}
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}