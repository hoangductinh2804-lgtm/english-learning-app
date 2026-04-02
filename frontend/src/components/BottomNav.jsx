import { NavLink } from "react-router-dom";

const items = [
  { to: "/", icon: "⌂", label: "Trang chu" },
  { to: "/flashcards", icon: "▦", label: "Kho bai" },
  { to: "/listening", icon: "◉", label: "Luyen nghe" },
  { to: "/study/daily-life", icon: "◎", label: "Luyen noi" },
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