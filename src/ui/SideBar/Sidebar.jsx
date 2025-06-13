import styles from "./Sidebar.module.css";

import Advert from "../Advert/Advert";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";


function Sidebar() {
  return (
    <div className={`center ${styles.sidebar}`}>
      <div>
        <Logo />
        <Navbar />
      </div>
      <Advert />
    </div>
  );
}

export default Sidebar;
