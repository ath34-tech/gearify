import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../../components/dashboard/TopNavbar";
import InsightCard from "../../components/dashboard/InsightCard";
import MaintenanceTable from "../../components/dashboard/MaintenanceTable";
import { DashboardProvider } from "../../context/DashboardContext";

import { EquipmentProvider, useEquipment } from "../../context/EquipmentContext";
import { TeamsProvider, useTeams } from "../../context/TeamsContext";

/* ---------- CARDS ---------- */
function DashboardCards() {
  const { equipment, loading: eqLoading } = useEquipment();
  const { teams, loading: teamLoading } = useTeams();

  const loading = eqLoading || teamLoading;

  return (
    <div className="insight-row">
      <InsightCard
        title="Total Equipment"
        value={loading ? "—" : equipment.length}
        subtitle="Assets in system"
        variant="info"
      />

      <InsightCard
        title="Teams"
        value={loading ? "—" : teams.length}
        subtitle="Active teams"
        variant="success"
      />

      <InsightCard
        title="System Status"
        value="Operational"
        subtitle="All services running"
        variant="danger"
      />
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <DashboardProvider>
      <EquipmentProvider>
        <TeamsProvider>
          <div className="dashboard-root">
            <TopNavbar />

            <div className="dashboard-content">
              {/* 🔥 HEADER WITH BUTTON */}
              <div className="dashboard-header">
                <div>
                  <h1>Dashboard</h1>
                  <p>Overview of maintenance activity</p>
                </div>

                <button
                  className="primary-btn"
                  onClick={() => navigate("/maintenance/new")}
                >
                  + New Request
                </button>
              </div>

              <DashboardCards />

              <MaintenanceTable />
            </div>
          </div>
        </TeamsProvider>
      </EquipmentProvider>
    </DashboardProvider>
  );
}
