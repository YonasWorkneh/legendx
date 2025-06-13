import { HiExclamationTriangle } from "react-icons/hi2";
import styles from "./Confirm.module.css";

function Confirm({
  message = "You are about to delete this record. This action is permanent and can't be undone.",
  id,
  onDelete,
  onCancel,
}) {
  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <span className={styles.circle}>
          <HiExclamationTriangle />
        </span>
        <div>
          <h1>Are you sure?</h1>
          <p>{message}</p>
          <div className={styles.actions}>
            <button
              className={`${styles.btn} `}
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
            >
              Cancel
            </button>
            <button
              className={`${styles.btn} ${styles.delete}`}
              onClick={(e) => {
                e.preventDefault();
                onDelete(id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
