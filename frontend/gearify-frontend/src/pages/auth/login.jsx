import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import PublicNav from "../../components/PublicNav";
export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // API later
  };

  return (
    <div className="auth-root">
      <PublicNav/>
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="subtitle">Sign in to your Gearify account</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="primary-btn">
            Sign in
          </button>
        </form>

        <p className="switch-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Create one</span>
        </p>
      </div>
    </div>
  );
}
