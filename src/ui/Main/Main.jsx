import styles from "./Main.module.css";

function Main({ children }) {
  return (
    <main
      data-barba="container"
      data-barba-namespace="home"
      className={styles.main}
    >
      {children}
    </main>
  );
}

export default Main;
