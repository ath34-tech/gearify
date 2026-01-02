import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./auth.css";
import PublicNav from "../../components/PublicNav";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // EMAIL SIGNUP
  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // after signup → onboarding
    navigate("/onboarding");
  };

  // GOOGLE SIGNUP
  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      alert(error.message);
    }
    // redirect handled by Supabase → comes back authenticated
  };

  return (
    <div className="auth-root">
      <PublicNav />

      <div className="auth-card">
        <h1>Create your account</h1>
        <p className="subtitle">Start with Gearify</p>

        <button
          onClick={handleGoogleSignup}
          className="primary-btn"
          style={{ marginBottom: "1rem" }}
        >
          Continue with Google
        </button>

        <div className="divider">or</div>

        <form onSubmit={handleEmailSignup}>
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

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Creating..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
