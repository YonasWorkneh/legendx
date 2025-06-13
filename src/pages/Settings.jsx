import { Outlet } from "react-router-dom";
import Nav from "../features/Settings/navigation/nav";

function Settings() {
  const style = {
    fontSize: "3rem",
  };
  return (
    <div>
      <h1 style={style}>Settings</h1>
      <p>Manage your gym, account settings and prefernces.</p>
      <Nav />
      <Outlet />
    </div>
  );
}

export default Settings;
