import { HiBell } from "react-icons/hi";
import styles from "./Header.module.css";
import { FaMoon } from "react-icons/fa6";
import { LuLogOut, LuSun } from "react-icons/lu";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect, useState } from "react";
import Notifications from "./Notifications";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

function Header() {
  const { theme, setTheme } = useAppContext();
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();
  const { admin } = useAppContext();
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(
    function () {
      if (admin) {
        setName(admin.name);
        setImgUrl(admin.imgUrl);
      } else {
        const admin = JSON.parse(localStorage.getItem("gym-admin"));
        setName(admin.name);
        setImgUrl(admin.imgUrl);
      }
    },
    [admin]
  );

  return (
    <div className={`center ${styles.header}`}>
      <p className={styles.message}>Welcome, {name}</p>
      <div className={styles.container}>
        <div
          className={`center ${styles.profile}`}
          onClick={() => {
            navigate(`/${admin.gymId}/settings/profile`);
          }}
        >
          <img
            src={`${import.meta.env.VITE_BASE_URL}/admins/${imgUrl}`}
            alt="admin-avatar"
          />
        </div>
        <div className={`center ${styles.icons}`}>
          <div className={`${styles.wrapper} ntf-bar`}>
            <button
              className={styles.btn}
              onClick={() => setIsOpened((state) => !state)}
            >
              <HiBell />
            </button>
            {isOpened && <Notifications onCloseNotification={setIsOpened} />}
          </div>
          <button
            className={`center ${styles.btn} ${styles.rotate}`}
            onClick={(e) => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          >
            {theme === "dark" ? <LuSun /> : <FaMoon />}
          </button>
          <button
            className={styles.logout}
            onClick={() => {
              setLoggingOut(true);
              setTimeout(function () {
                localStorage.removeItem("gym-id");
                sessionStorage.removeItem("temp-auth-token");
                localStorage.removeItem("gym-admin");
                navigate("/");
                setLoggingOut(false);
              }, 1000);
            }}
          >
            {loggingOut ? (
              <Loader bgColor="#fff" size={25} />
            ) : (
              <>
                <LuLogOut />
                <span>Log out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
