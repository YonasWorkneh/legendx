import { NavLink } from "react-router-dom";
import styles from "./nav.module.css";

function Nav() {
  return (
    <ul className={styles.nav}>
      <li>
        <NavLink className={styles.link} to="gym">
          Gym
        </NavLink>
      </li>
      <li>
        <NavLink className={styles.link} to="profile">
          Profile
        </NavLink>
      </li>
    </ul>
  );
}

export default Nav;
