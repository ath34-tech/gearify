import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNavbar from "../../components/dashboard/TopNavbar";
import { fetchMaintenanceById, updateMaintenance } from "../../api/maintenance.api";
import { supabase } from "../../lib/supabase";
import "./maintenance.css";

export default function MaintenanceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- LOAD REQUEST ---------- */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMaintenanceById(id);
        setForm(data);
      } catch (err) {
        alert("Failed to load request");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, navigate]);

  /* ---------- LOAD TECHNICIANS ---------- */
  useEffect(() => {
    const loadTechnicians = async () => {
      const { data } = await supabase
        .from("technicians")
        .select("id, name");

      setTechnicians(data || []);
    };

    loadTechnicians();
  }, []);

  /* ---------- CHANGE HANDLER ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- SAVE ---------- */
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await updateMaintenance(id, {
        subject: form.subject,
        description: form.description,
        category: form.category,
        priority: form.priority,
        status: form.status,
        assigned_to: form.assigned_to || null,
        due_date: form.due_date || null,
      });

      navigate("/dashboard");
    } catch {
      alert("Update failed");
    }
  };

  if (loading || !form) return null;

  return (
    <div className="maintenance-root">
      <TopNavbar />

      <div className="maintenance-content">
        <h1>Edit Maintenance Request</h1>
        <p>{form.equipment?.name}</p>

        <form className="maintenance-card" onSubmit={handleSave}>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
          />

          <select name="category" value={form.category || ""} onChange={handleChange}>
            <option value="">Category</option>
            <option value="corrective">Corrective</option>
            <option value="preventive">Preventive</option>
          </select>

          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select name="status" value={form.status} onChange={handleChange}>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>

          <select
            name="assigned_to"
            value={form.assigned_to || ""}
            onChange={handleChange}
          >
            <option value="">Unassigned</option>
            {technicians.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="due_date"
            value={form.due_date || ""}
            onChange={handleChange}
          />

          <button className="primary-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
