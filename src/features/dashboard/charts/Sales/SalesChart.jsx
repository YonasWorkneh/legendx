import { CiCircleAlert } from "react-icons/ci";
import styles from "./SalesChart.module.css";
import { MdOutlineQueryStats } from "react-icons/md";
import AreaChart from "./AreaChart";

function SalesChart() {
  return (
    <div className={styles.chart}>
      <div className={styles.header}>
        <div>
          <p>
            <span className={`${styles.rev} ${styles.circle}`}></span>
            <span>Revenue</span>
          </p>
          <p>
            <span className={`${styles.exp} ${styles.circle}`}></span>
            <span>Expense</span>
          </p>
        </div>
        <MdOutlineQueryStats className={styles.icon} />
      </div>
      <div className={styles.mt2}>
        <AreaChart />
      </div>
    </div>
  );
}
const returnLastTwoDigit = (n) => {
  let num = Math.pow(5, n);
  while (num.toLocaleString().length > 2) num /= 10;
};

export default SalesChart;
