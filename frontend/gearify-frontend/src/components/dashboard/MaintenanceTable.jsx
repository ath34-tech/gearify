import { useDashboard } from "../../context/DashboardContext";
import "./table.css";
import { useNavigate } from "react-router-dom";

export default function MaintenanceTable() {
  const { requests, loading } = useDashboard();
  const navigate = useNavigate();

  if (loading) {
    return <div className="table-card">Loading...</div>;
  }

  return (
    <div className="table-card">
      <h3>Recent Maintenance Requests</h3>

      {requests.length === 0 ? (
        <p>No active maintenance requests 🎉</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Employee</th>
              <th>Technician</th>
              <th>Category</th>
              <th>Stage</th>
              <th>Company</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr
                key={req.id}
                onClick={() => navigate(`/maintenance/${req.id}`)}
                className="clickable-row"
              >                <td>{req.subject}</td>
                <td>{req.requested_by?.email || "—"}</td>
                <td>{req.assigned_to?.name || "Unassigned"}</td>
                <td>{req.category}</td>
                <td>
                  <span className={`badge ${req.status}`}>
                    {req.status.replace("_", " ")}
                  </span>
                </td>
                <td>{req.company?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
