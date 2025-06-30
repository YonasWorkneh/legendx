import styles from "./Advert.module.css";
import { Link } from "react-router-dom";
function Advert() {
  return (
    <div className={styles.container}>
      <p>Coming Soon</p>
      <Link to="/">
        <img src={"/img/app-store.svg"} alt="app-store" />
      </Link>
      <Link to="/">
        <img src={"/img/play-store.svg"} alt="play-store" />
      </Link>
    </div>
  );
}

export default Advert;
