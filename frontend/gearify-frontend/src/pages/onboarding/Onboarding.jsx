import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./onboarding.css";

export default function Onboarding() {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ get logged-in user (NO JWT handling)
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("Not authenticated");
      setLoading(false);
      return;
    }

    // ✅ create company
    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .insert({ name: company })
      .select()
      .single();

    if (companyError) {
      alert(companyError.message);
      setLoading(false);
      return;
    }

    // ✅ create/update user profile
    const { error: profileError } = await supabase.from("users").upsert({
      id: user.id,
      email: user.email,
      company_id: companyData.id,
      role,
      onboarded: true,
    });

    if (profileError) {
      alert(profileError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="onboarding-root">
      <div className="onboarding-card">
        <h1>Set up your workspace</h1>
        <p className="subtitle">Tell us about your company</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="technician">Technician</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Setting up..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
