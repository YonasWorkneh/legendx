import { useAppContext } from "../../../contexts/AppContext";
import styles from "./OfferCard.module.css";

function OfferCard({ offer }) {
  const {
    paymentDuration: type,
    services,
    discounted,
    base,
    offerImg,
    title,
  } = offer;
  const { theme } = useAppContext();

  return (
    <div
      className={`${styles.offer} ${
        type === 3 || type === 2 ? styles.pro : ""
      } `}
    >
      <div className={styles.img}>
        <img src={`http://localhost:8000/${offerImg}`} alt="gym-athlete" />
      </div>
      <p className={styles.type}>{title}</p>
      <p className={`${styles.discount} ${base ? "" : styles.transparent}`}>
        {base ? base : "discount"}
      </p>
      <p className={styles.price}>
        {discounted} /
        <span className={styles.per}>
          {type === 1
            ? "month"
            : type === 2
            ? "quarter"
            : type === 3
            ? "six-month"
            : "year"}
        </span>
      </p>
      <svg
        width="100%"
        height="50px"
        viewBox="0 0 100% 100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M351 1.63727C148.307 62.4774 -18.0098 -34.0834 3.92903 61.5342"
          stroke={`${
            type === 3 || type === 2
              ? theme === "dark"
                ? "#666"
                : "#d9d9d9d9"
              : theme === "dark"
              ? "#444"
              : `var(--brand-color)`
          }`}
          strokeOpacity="0.6"
          strokeWidth="1"
        />
      </svg>
      <ul className={styles.services}>
        {services.map((service, index) => (
          <li key={index} className={styles.service}>
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OfferCard;
