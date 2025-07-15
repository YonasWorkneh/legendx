import { NavLink } from "react-router-dom";
import { formatDate } from "../../../utils/date";
import styles from "./Customer.module.css";
import useOffers from "../../offers/useOffers";
import { useAppContext } from "../../../contexts/AppContext";

function Customer({ customer }) {
  const {
    name,
    userId: id,
    email,
    phoneNum: phone,
    imgUrl,
    plan,
    hasPaid: status,
    regDate,
    height,
    weight,
  } = customer;

  const { offers } = useOffers();
  const { admin } = useAppContext();
  const { gymId: gym } = admin;
  const { title: membership } =
    offers?.find((offer) => offer.paymentDuration === plan) || {};
  return (
    <NavLink to={`/${gym}/customers/${id}`}>
      <li className={styles.user}>
        <span className={styles.itallic}>#{id}</span>
        <div className={styles.profile}>
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${imgUrl}`}
            alt="user-img"
          />
          <span>{name}</span>
        </div>
        <span>{phone}</span>
        <span>{email}</span>
        <span>{formatDate(false, Date.parse(regDate))}</span>
        <span>{membership ? membership : <>&mdash;</>}</span>
        <span>{weight}</span>
        <span>{height}</span>
        <span className={`${styles.status} ${styles[status]}`}>
          {status ? "paid" : "unpaid"}
        </span>
      </li>
    </NavLink>
  );
}

export default Customer;
