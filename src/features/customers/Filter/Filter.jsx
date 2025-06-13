import { BsSliders } from "react-icons/bs";
import styles from "./Filter.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOffers } from "../../Offers/useOffers";
import { useCustomers } from "../useCustomers";
import { useAppContext } from "../../../contexts/AppContext";

function Filter({ disabled, filterOpened, setFilterOpened, setSortOpened }) {
  const [options, setOptions] = useState([]);
  const { register, handleSubmit, setValue, reset } = useForm();
  const [key, setKey] = useState("");
  const { offers } = useOffers();
  const { customers } = useCustomers();
  const { modifiedResults, setModifiedResults, setCurrentPage } =
    useAppContext();

  function onFilter(data) {
    const { value } = data;
    const filter = value === "true" ? true : value === "false" ? false : +value;
    const filtered = (modifiedResults || customers)?.filter(
      (customer) => customer[key] === filter
    );
    setModifiedResults(filtered);
    setCurrentPage(1);
    reset();
    setFilterOpened(false);
    setOptions([]);
    if (!filtered.length)
      setTimeout(() => {
        setModifiedResults(null);
      }, 3000);
  }

  useEffect(
    function () {
      const clearFilter = (e) => {
        if (e.key.toLowerCase().includes("esc")) {
          setModifiedResults(null);
          reset();
        }
      };
      window.addEventListener("keydown", clearFilter);
      return () => window.removeEventListener("keydown", clearFilter);
    },
    [reset, setModifiedResults]
  );

  useEffect(
    function () {
      const handleClickClose = (e) =>
        !e.target.closest(".filter") && setFilterOpened(false);
      const handleEscClose = (e) =>
        e.key.toLowerCase().includes("esc") && setFilterOpened(false);
      addEventListener("click", handleClickClose);
      addEventListener("keydown", handleEscClose);
      return () => {
        removeEventListener("click", handleClickClose);
        removeEventListener("keydown", handleEscClose);
      };
    },
    [setFilterOpened]
  );

  return (
    <div className={`${styles.container} filter`}>
      <button
        className={`center ${styles.btn}`}
        disabled={disabled}
        onClick={() => {
          setFilterOpened((opened) => !opened);
          setSortOpened(false);
        }}
      >
        <BsSliders />
        <span>Filter</span>
      </button>
      {filterOpened && (
        <form className={styles.filter} onSubmit={handleSubmit(onFilter)}>
          <p className={styles.title}>
            Filter
            <BsSliders />
          </p>
          <div className={styles.bt}>
            <div className={styles.field}>
              <p className={styles.subtitle}>Field</p>
              <div className={styles.px2}>
                <select
                  name="field"
                  onChange={(e) => {
                    const field = JSON.parse(e.target.value);
                    setKey(field?.at(0)?.field);
                    setOptions(field);
                    setValue("value", field?.at(0).value);
                  }}
                >
                  <option value={"[]"}>Select a field </option>
                  {offers?.length && (
                    <option
                      value={JSON.stringify(
                        offers?.map((offer) => {
                          return {
                            key: offer.title,
                            value: offer.paymentDuration,
                            field: "plan",
                          };
                        })
                      )}
                    >
                      Membership
                    </option>
                  )}
                  <option
                    value={JSON.stringify([
                      { key: "paid", value: "true", field: "hasPaid" },
                      { key: "unpaid", value: "false", field: "hasPaid" },
                    ])}
                  >
                    Payment status
                  </option>
                  <option
                    value={JSON.stringify([
                      { key: "weight loss", value: 1, field: "fitnessGoal" },
                      { key: "muscle-gain", value: 2, field: "fitnessGoal" },
                      { key: "maintain", value: 3, field: "fitnessGoal" },
                    ])}
                  >
                    Fitness goal
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.bt}>
            <div className={styles.value}>
              <p className={styles.subtitle}>Value</p>
              <div className={styles.px2}>
                <select name="value" {...register("value")}>
                  {options?.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.key}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className={styles.bt}>
            <div className={styles.action}>
              <button
                className={`${styles.btn}`}
                onClick={(e) => {
                  e.preventDefault();
                  setFilterOpened((opened) => !opened);
                  setSortOpened(false);
                  setOptions([]);
                  reset();
                }}
              >
                cancel
              </button>
              <button className={`${styles.btn} ${styles.apply}`}>Apply</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Filter;
