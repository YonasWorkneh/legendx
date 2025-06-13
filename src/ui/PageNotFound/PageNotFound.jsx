import { CgGym } from "react-icons/cg";
import styles from "./PageNotFound.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1>
        4{" "}
        <span className={styles.relative}>
          0
          <CgGym className={styles.absolute} />
        </span>{" "}
        4
      </h1>
      <h2 className={styles.title}>Page Not Found</h2>
      <p className={styles.text}>
        Sorry, the page you are looking for does not exist. have been removed or
        name changed.
      </p>
      <button className={styles.btn} onClick={() => navigate("/")}>
        <BiArrowBack />
        <span>Go Back</span>
      </button>
    </div>
  );
}

export default PageNotFound;
