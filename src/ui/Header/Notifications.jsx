import { FaClock, FaUserTimes } from "react-icons/fa";
import styles from "./Notifications.module.css";
import { useEffect } from "react";
function Notifications({ onCloseNotification }) {
  useEffect(
    function () {
      const handleClickClose = (e) =>
        !e.target.closest(".ntf-bar") && onCloseNotification(false);
      const handleEscClose = (e) =>
        e.key.toLowerCase().includes("esc") && onCloseNotification(false);
      window.addEventListener("click", handleClickClose);
      window.addEventListener("keydown", handleEscClose);
      return () => {
        window.removeEventListener("click", handleClickClose);
        window.removeEventListener("keydown", handleEscClose);
      };
    },
    [onCloseNotification]
  );

  return (
    <ul className={styles.notifications}>
      <p className={styles.title}>Notifications</p>
      <li>
        <span className={styles.icon}>
          <FaUserTimes />
        </span>
        <p>
          <span className={styles.user}>John Doe</span>
          <p>Membership expired 3 days ago.</p>
        </p>
      </li>
      <li>
        <span className={styles.icon}>
          <FaClock />
        </span>
        <p>
          <span className={styles.user}>John Doe</span>
          <p>Membership expires in 2 days.</p>
        </p>
      </li>
    </ul>
  );
}

export default Notifications;
