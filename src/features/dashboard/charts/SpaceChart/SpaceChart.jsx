import { useCustomers } from "../../../customers/useCustomers";
import { useSettings } from "../../../Settings/useSettings";
import Space from "./Space";
import styles from "./SpaceChart.module.css";

function SpaceChart() {
  const { settings } = useSettings();
  const { value: totalSpace } =
    settings?.find((setting) => setting.key === "totalSpace") || {};
  const { customers } = useCustomers();
  const percentage =
    Math.round(((totalSpace - customers?.length) / totalSpace) * 100) || 0;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.h3}>Gym Capacity</span>
        <span>
          <svg
            width="25"
            height="25"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.6917 8.39817C19.2997 5.64705 16.8027 3.46649 13.6524 3.12413C13.1755 3.0723 12.7839 3.4175 12.7839 3.83719V8.77662C12.7839 8.98646 12.9787 9.15657 13.219 9.15657H18.8752C19.3558 9.15657 19.7511 8.81465 19.6917 8.39817Z"
              fill="var(--color-grey-700)"
            />
            <path
              d="M11.0435 4.21715C6.95853 4.21715 3.64697 7.10906 3.64697 10.6764C3.64697 14.2437 6.95853 17.1357 11.0435 17.1357C15.1285 17.1357 18.4401 14.2437 18.4401 10.6764C18.4401 10.4666 18.2453 10.2964 18.005 10.2964H11.9137C11.6734 10.2964 11.4786 10.1263 11.4786 9.91649V4.59711C11.4786 4.38726 11.2838 4.21715 11.0435 4.21715Z"
              fill="var(--color-grey-700)"
            />
          </svg>
        </span>
      </div>
      <p className={styles.fade}>Indoor and outdoor</p>
      <div className={styles.mt2}>
        <div className={styles.li}>
          {Array.from({ length: 100 }).map((_, i) => (
            <Space
              key={i}
              background={i < percentage ? "#ffffff8f" : "rgba(21,21,29,0.76)"}
            />
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <span>Space status:</span>
        <span>{percentage}%</span>
      </div>
    </div>
  );
}

export default SpaceChart;
