import { Outlet, useLocation } from "react-router-dom";

// import { useAppContext } from "../../contexts/AppContext";
import styles from "./AppLayout.module.css";

import Header from "../Header/Header";
import Sidebar from "../SideBar/Sidebar";
import Main from "../Main/Main";
import { useEffect, useState } from "react";
import DashboardSkeleton from "../Skeleton/Dashboard/DashboardSkeleton";
import { useAppContext } from "../../contexts/AppContext";

function AppLayout({ onSetTheme }) {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const url = location.pathname;
  const { theme } = useAppContext();

  useEffect(
    function () {
      onSetTheme(theme);
    },
    [theme, onSetTheme]
  );

  useEffect(function () {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return isLoading && url.includes("dashboard") ? (
    <DashboardSkeleton />
  ) : url.includes("signup") ? (
    <Outlet />
  ) : (
    <div className={styles.app}>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default AppLayout;
