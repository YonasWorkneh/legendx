import { CgGym } from "react-icons/cg";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logo}>
      <CgGym />
      <h1>LegendX &mdash; Gym</h1>
    </div>
  );
}

export default Logo;
