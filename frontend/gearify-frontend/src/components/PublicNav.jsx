import { useNavigate } from "react-router-dom";
import "./publicNav.css";

export default function PublicNav() {
  const navigate = useNavigate();

  return (
    <nav className="public-nav">
      <div className="logo" onClick={() => navigate("/")}>
        Gearify
      </div>

      <div className="nav-actions">
        <button onClick={() => navigate("/login")}>Login</button>
        <button className="primary" onClick={() => navigate("/signup")}>
          Get Started
        </button>
      </div>
    </nav>
  );
}
