import { BiPencil, BiTrash } from "react-icons/bi";
import styles from "./Equipment.module.css";
function Equipment({ equipment, onEdit, onDelete }) {
  const { name, quantity, imgUrl } = equipment;
  return (
    <div className={styles.equip}>
      <img src={`http://localhost:8000/${imgUrl}`} alt={`${name}-img`} />
      <p className={styles.title}>{name}</p>
      <p className={styles.quan}>{quantity}</p>
      <div className={styles.actions}>
        <button className={styles.edit} onClick={onEdit}>
          <BiPencil />
        </button>
        <button className={styles.del} onClick={onDelete}>
          <BiTrash />
        </button>
      </div>
    </div>
  );
}

export default Equipment;
