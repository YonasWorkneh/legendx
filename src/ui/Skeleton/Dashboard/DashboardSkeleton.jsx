import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Optional: To include default styles

import styles from "./DashboardSkeleton.module.css";
import { useAppContext } from "../../../contexts/AppContext";

function DashboardSkeleton() {
  const { theme } = useAppContext();
  const isDark = theme === "dark";
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Skeleton
          className={styles.message}
          baseColor={isDark ? "#111" : "#e0e0e0"}
          highlightColor={isDark ? "#22222272" : "#f5f5f5"}
        />
        <div className={styles.admin}>
          <Skeleton
            height={40}
            width={40}
            borderRadius={50}
            style={{ marginRight: "2rem" }}
            baseColor={isDark ? "#111" : "#e0e0e0"}
            highlightColor={isDark ? "#22222272" : "#f5f5f5"}
          />
          <Skeleton
            height={30}
            width={30}
            borderRadius={50}
            style={{ marginLeft: "2rem" }}
            baseColor={isDark ? "#111" : "#e0e0e0"}
            highlightColor={isDark ? "#22222272" : "#f5f5f5"}
          />
          <Skeleton
            height={30}
            width={30}
            borderRadius={50}
            style={{ marginLeft: "2rem" }}
            baseColor={isDark ? "#111" : "#e0e0e0"}
            highlightColor={isDark ? "#22222272" : "#f5f5f5"}
          />
          <Skeleton
            className={styles.btn}
            baseColor={isDark ? "#111" : "#e0e0e0"}
            highlightColor={isDark ? "#22222272" : "#f5f5f5"}
          />
        </div>
      </div>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <Skeleton
          height={50}
          className={styles.logo}
          baseColor={isDark ? "#111" : "#e0e0e0"}
          highlightColor={isDark ? "#22222272" : "#f5f5f5"}
        />
        <Skeleton
          height={40}
          count={5}
          style={{ marginBottom: 20, borderRadius: "1rem" }}
          baseColor={isDark ? "#111" : "#e0e0e0"}
          highlightColor={isDark ? "#22222272" : "#f5f5f5"}
        />
        <Skeleton
          height={40}
          count={2}
          style={{ marginTop: 20, borderRadius: "1rem" }}
          baseColor={isDark ? "#111" : "#e0e0e0"}
          highlightColor={isDark ? "#22222272" : "#f5f5f5"}
        />
        <Skeleton
          className={styles.advert}
          baseColor={isDark ? "#111" : "#e0e0e0"}
          highlightColor={isDark ? "#22222272" : "#f5f5f5"}
        />
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.flex}>
          <Skeleton
            className={styles.hero}
            baseColor={isDark ? "#111" : "#e0e0e0"}
            highlightColor={isDark ? "#22222272" : "#f5f5f5"}
          />
          <div className={styles.numeric}>
            <Skeleton
              className={styles.num}
              baseColor={isDark ? "#111" : "#e0e0e0"}
              highlightColor={isDark ? "#22222272" : "#f5f5f5"}
            />
            <Skeleton
              className={styles.num}
              baseColor={isDark ? "#111" : "#e0e0e0"}
              highlightColor={isDark ? "#22222272" : "#f5f5f5"}
            />
            <Skeleton
              className={styles.num}
              baseColor={isDark ? "#111" : "#e0e0e0"}
              highlightColor={isDark ? "#22222272" : "#f5f5f5"}
            />
            <Skeleton
              className={styles.num}
              baseColor={isDark ? "#111" : "#e0e0e0"}
              highlightColor={isDark ? "#22222272" : "#f5f5f5"}
            />
          </div>
        </div>
        <div className={styles.charts}>
          <Skeleton
            className={styles.chart}
            baseColor={isDark ? "#111" : "#e0e0e0"}
            highlightColor={isDark ? "#22222272" : "#f5f5f5"}
          />
          <Skeleton
            className={styles.chart}
            baseColor={isDark ? "#111" : "#e0e0e0"}
            highlightColor={isDark ? "#22222272" : "#f5f5f5"}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardSkeleton;
