import SalesChart from "../features/dashboard/charts/Sales/SalesChart";
import SpaceChart from "../features/dashboard/charts/SpaceChart/SpaceChart";
import Hero from "../features/dashboard/hero/Hero";
import Stats from "../features/dashboard/stats/Stats";

function Dashboard() {
  const styles = {
    display: "flex",
    gap: "2rem",
  };
  return (
    <div>
      <div style={styles}>
        <Hero />
        <Stats />
      </div>
      <div style={{ ...styles, marginTop: "2rem", color: "#000" }}>
        <SalesChart />
        <SpaceChart />
      </div>
    </div>
  );
}

export default Dashboard;
