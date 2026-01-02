import "./navbar.css";

export default function TopNavbar() {
  return (
    <div className="top-navbar">
      <div className="nav-left">
        <span className="logo">Gearify</span>
        <nav>
          <span className="active">Dashboard</span>
          <span>Maintenance</span>
          <span>Calendar</span>
          <span>Equipment</span>
          <span>Reporting</span>
          <span>Teams</span>
        </nav>
      </div>

      <div className="nav-center">
        <input placeholder="Search equipment, requests..." />
      </div>

      <div className="nav-right">
        <button className="new-btn">New</button>
        <div className="avatar">A</div>
      </div>
    </div>
  );
}
