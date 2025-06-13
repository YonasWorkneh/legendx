import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("temp-auth-token");
    const gymId = localStorage.getItem("gym-id");
    const admin = localStorage.getItem("gym-admin");
    if (!token && !gymId && !admin) {
      console.log("No token or gym id found");
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
