import { MdFileDownload } from "react-icons/md";
import styles from "./Advert.module.css";
function Advert() {
  return (
    <div className={styles.container}>
      <div className={styles.add}></div>
      <div className={styles.content}>
        <h1>Download Mobile App</h1>
        <p>Manage your gym whenever whereever you are.</p>
        <button className={styles.btn}>
          <span>Download Now</span>
          <MdFileDownload />
        </button>
      </div>
    </div>
  );
}

export default Advert;
