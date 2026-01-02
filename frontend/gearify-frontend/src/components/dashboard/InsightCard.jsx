import "./insight-card.css";

export default function InsightCard({ title, value, subtitle, variant }) {
  return (
    <div className={`insight-card ${variant}`}>
      <h3>{title}</h3>
      <h2>{value}</h2>
      <p>{subtitle}</p>
    </div>
  );
}
