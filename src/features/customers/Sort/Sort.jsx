import { HiArrowsUpDown } from "react-icons/hi2";
import styles from "./Sort.module.css";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../contexts/AppContext";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useCustomers } from "../useCustomers";
import { getTimeStamp } from "../../../utils/date";

function Sort({ disabled, sortOpened, setSortOpened, setFilterOpened }) {
  const { setModifiedResults } = useAppContext();
  const { customers } = useCustomers();
  const customersCopy = customers.map((customer) => customer);

  const { register, reset, handleSubmit } = useForm();
  function onSort(data) {
    const { type, field } = data;
    const [customer] = customersCopy;
    if (
      typeof customer[field] === "string" &&
      (field !== "age" || field !== "regDate")
    ) {
      customersCopy.sort((a, b) =>
        type === "asc"
          ? a[field].toLowerCase().localeCompare(b[field].toLowerCase()) -
            b[field].toLowerCase().localeCompare(a[field].toLowerCase())
          : b[field].toLowerCase().localeCompare(a[field].toLowerCase()) -
            a[field].toLowerCase().localeCompare(b[field].toLowerCase())
      );
    }
    if (field === "regDate" && field !== "age") {
      customersCopy.sort((a, b) =>
        type === "asc"
          ? getTimeStamp(a[field]) - getTimeStamp(b[field])
          : getTimeStamp(b[field]) - getTimeStamp(a[field])
      );
    } else
      customersCopy.sort((a, b) =>
        type === "asc" ? a[field] - b[field] : b[field] - a[field]
      );
    setModifiedResults(customersCopy);
    reset();
    setSortOpened(false);
  }

  useEffect(
    function () {
      const unsort = (e) =>
        e.key.toLowerCase().includes("esc") && setModifiedResults(null);
      window.addEventListener("keydown", unsort);
      return () => window.removeEventListener("keydown", unsort);
    },
    [setModifiedResults]
  );

  useEffect(
    function () {
      const handleClickClose = (e) =>
        !e.target.closest(".sort") && setSortOpened(false);
      const handleEscClose = (e) =>
        e.key.toLowerCase().includes("esc") && setSortOpened(false);
      addEventListener("click", handleClickClose);
      addEventListener("keydown", handleEscClose);
      return () => {
        removeEventListener("click", handleClickClose);
        removeEventListener("keydown", handleEscClose);
      };
    },
    [setSortOpened]
  );

  return (
    <div className={`${styles.container} sort`}>
      <button
        className={`center ${styles.btn}`}
        disabled={disabled}
        onClick={() => {
          setSortOpened((opened) => !opened);
          setFilterOpened(false);
        }}
      >
        <HiArrowsUpDown />
        <span>Sort By</span>
      </button>
      {sortOpened && (
        <form className={styles.sort} onSubmit={handleSubmit(onSort)}>
          <p className={styles.title}>
            Sort by
            <HiArrowsUpDown />
          </p>
          <div className={styles.bt}>
            <div className={styles.type}>
              <p className={styles.subtitle}>Type</p>
              <div>
                <input
                  type="radio"
                  name="sort"
                  id="asc"
                  value={"asc"}
                  defaultChecked
                  {...register("type")}
                />
                <label htmlFor="asc">Ascending</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="sort"
                  value={"dsc"}
                  id="dsc"
                  {...register("type")}
                />
                <label htmlFor="dsc">Descending</label>
              </div>
            </div>
          </div>
          <div className={styles.bt}>
            <div className={styles.field}>
              <p className={styles.subtitle}>Field</p>
              <div className={styles.px2}>
                <select name="field" {...register("field")}>
                  <option value="name">Select a field </option>
                  <option value="name">Name</option>
                  <option value="age">Age</option>
                  <option value="weight">Weight</option>
                  <option value="hasPaid">Payment status</option>
                  <option value="regDate">Registration date</option>
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
                  setSortOpened(false);
                  setFilterOpened(false);
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

export default Sort;
