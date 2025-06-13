import styles from "./Error.module.css";

function Error({ message = "No Data available" }) {
  return (
    <div className={styles.error}>
      <img src="/src/assets/error.png" alt="" />
      <div>
        <h4>No data available</h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Error;
