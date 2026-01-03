import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import TopNavbar from "../../components/dashboard/TopNavbar";
import "./maintenance.css";

export default function NewRequest() {
  const navigate = useNavigate();

  const [equipmentList, setEquipmentList] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    description: "",
    equipment_id: "",
    category: "corrective",   // ✅ MAPS TO DB
    priority: "medium",
    due_date: "",             // ✅ MAPS TO DB
    team_id: null,
    assigned_to: "",
  });

  /* ---------------- LOAD EQUIPMENT ---------------- */
  useEffect(() => {
    const loadEquipment = async () => {
      const { data, error } = await supabase
        .from("equipment")
        .select("id, name");

      if (!error) setEquipmentList(data || []);
    };

    loadEquipment();
  }, []);

  /* ---------------- LOAD TECHNICIANS ---------------- */
  useEffect(() => {
    const loadTechnicians = async () => {
      const { data, error } = await supabase
        .from("technicians")
        .select("id, name");

      if (error) {
        console.error("Failed to load technicians", error);
        return;
      }

      setTechnicians(data || []);
    };

    loadTechnicians();
  }, []);

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("maintenance_requests").insert([
  {
    subject: form.subject,
    description: form.description,
    equipment_id: form.equipment_id,
    category: form.category,
    priority: form.priority,
    due_date: form.category === "preventive" ? form.due_date : null,
    team_id: form.team_id,
    assigned_to: form.assigned_to || null,
    status: form.assigned_to ? "in_progress" : "new",
  },
]);


    setLoading(false);

    if (error) {
      console.error(error);
      alert("Failed to create request");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="maintenance-root">
      <TopNavbar />

      <div className="maintenance-content">
        <h1>Create Maintenance Request</h1>
        <p>Report an issue or schedule maintenance</p>

        <form className="maintenance-card" onSubmit={handleSubmit}>
          <input
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Describe the issue (optional)"
            value={form.description}
            onChange={handleChange}
          />

          <select
            name="equipment_id"
            value={form.equipment_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Equipment</option>
            {equipmentList.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.name}
              </option>
            ))}
          </select>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="corrective">Corrective</option>
            <option value="preventive">Preventive</option>
          </select>

          {form.category === "preventive" && (
            <input
              type="date"
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
              required
            />
          )}

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            name="assigned_to"
            value={form.assigned_to}
            onChange={handleChange}
          >
            <option value="">Assign Technician (optional)</option>
            {technicians.map((tech) => (
              <option key={tech.id} value={tech.id}>
                {tech.name}
              </option>
            ))}
          </select>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
