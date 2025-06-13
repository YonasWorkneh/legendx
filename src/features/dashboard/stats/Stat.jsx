import { AiOutlineFall, AiOutlineRise } from "react-icons/ai";
import styles from "./Stat.module.css";

function Stat({ lable, icon, trend, value, externalInfo, border }) {
  return (
    <div className={`${styles.stat} ${border ? styles.border : ""}`}>
      <div className={styles.upper}>
        <span>
          {icon}
          <span>{lable}</span>
        </span>
      </div>
      <div className={styles.middle}>
        <p
          className={styles.value}
          style={value ? {} : { textAlign: "center" }}
        >
          {value ? value : <>&mdash;</>}
        </p>
        <span
          className={styles.trend}
          style={{
            background: trend === "up" ? "#00800099" : "#fa3f3f93",
            float: "right",
          }}
        >
          {trend === "up" ? <AiOutlineRise /> : <AiOutlineFall />}
        </span>
      </div>
      <span className={styles.external}>{externalInfo}</span>
    </div>
  );
}

export default Stat;
