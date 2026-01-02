import "./dashboard.css";
import TopNavbar from "../../components/dashboard/TopNavbar";
import InsightCard from "../../components/dashboard/InsightCard";
import MaintenanceTable from "../../components/dashboard/MaintenanceTable";
import { DashboardProvider } from "../../context/DashboardContext";
// ✅ ADD THESE
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
  return (
    <DashboardProvider>
      {/* ✅ ONLY ADD THESE TWO PROVIDERS */}
      <EquipmentProvider>
        <TeamsProvider>
          <div className="dashboard-root">
            <TopNavbar />

            <div className="dashboard-content">
              <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Overview of maintenance activity</p>
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