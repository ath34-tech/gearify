import { useNavigate } from "react-router-dom";
import "./landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-root">
      {/* NAVBAR */}
      <nav className="landing-nav">
        <div className="logo">Gearify</div>
        <div className="nav-actions">
          <button className="nav-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="nav-btn primary"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <span className="pill">Maintenance made simple</span>

        <h1>
          The modern way to manage
          <br />
          <span>equipment & maintenance</span>
        </h1>

        <p>
          Gearify helps teams track equipment, handle breakdowns,
          and schedule preventive maintenance — without complexity.
        </p>

        <div className="hero-actions">
          <button className="cta" onClick={() => navigate("/signup")}>
            Start for free
          </button>
          <button className="ghost" onClick={() => navigate("/login")}>
            Sign in
          </button>
        </div>
      </section>
    </div>
  );
}
