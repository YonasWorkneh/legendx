import styles from "./Select.module.css";

function Select({ id, options, selected, lable, register, values }) {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{lable}</label>
      <select defaultValue={selected} id={id} {...register(id)}>
        {options.map((option, index) => (
          <option key={index} value={values?.length ? values[index] : option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
