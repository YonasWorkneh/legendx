import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { LuLayoutDashboard, LuLogIn } from "react-icons/lu";
import { MdOutlineQueryStats } from "react-icons/md";
// import { SiTrainerroad } from "react-icons/si";
import { CgGym } from "react-icons/cg";
import { IoAnalytics, IoPeople } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";
// import { HiInboxStack } from "react-icons/h/i2";
import { BsStack } from "react-icons/bs";
import { SiGoogleanalytics, SiTrainerroad } from "react-icons/si";
import { TbDeviceAnalytics } from "react-icons/tb";
function Navbar() {
  return (
    <ul className={`${styles.navbar}`}>
      <li>
        <NavLink to="dashboard" className={` ${styles.link}`}>
          <LuLayoutDashboard className={styles.icon} />
          <span>Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="memberships" className={` ${styles.link}`}>
          <BsStack className={styles.icon} />
          <span>Memberships</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="customers" className={` ${styles.link}`}>
          <IoPeople className={styles.icon} />
          <span>Customers</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="equipments" className={` ${styles.link}`}>
          <CgGym className={styles.icon} />
          <span>Equipments</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="analytics" className={` ${styles.link}`}>
          <SiGoogleanalytics className={styles.icon} />
          <span>Analytics</span>
        </NavLink>
      </li>

      <ul className={styles.bottom}>
        <li>
          <NavLink to="settings" className={` ${styles.link}`}>
            <FaGear className={styles.icon} />
            <span>Settings</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="signup" className={` ${styles.link}`}>
            <LuLogIn className={styles.icon} />
            <span>Signup</span>
          </NavLink>
        </li>
      </ul>
    </ul>
  );
}

export default Navbar;
