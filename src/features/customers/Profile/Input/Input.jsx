import styles from "./Input.module.css";

function Input({ type, id, lable, value, register, disabled }) {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{lable}</label>
      <input
        id={id}
        type={type}
        defaultValue={value}
        {...register(id)}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
