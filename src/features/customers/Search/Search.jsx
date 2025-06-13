import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { FaSearch } from "react-icons/fa";
import { useCustomers } from "../useCustomers";
import { useAppContext } from "../../../contexts/AppContext";

function Search({ disabled }) {
  const [key, setKey] = useState("");
  const { setModifiedResults, setCurrentPage } = useAppContext();
  const { customers } = useCustomers();

  const searchKey = () => {
    if (key?.length > 1) {
      const searchResults = customers?.filter(
        (customer) =>
          customer.userId.toLowerCase().includes(key) ||
          customer.name.toLowerCase().includes(key) ||
          customer.email.toLowerCase().includes(key)
      );
      setCurrentPage(1);
      setModifiedResults(searchResults);
      return;
    }
    setModifiedResults(null);
  };
  useEffect(
    function () {
      const reset = (e) =>
        e.key.toLowerCase().includes("esc") && setModifiedResults(null);
      window.addEventListener("keydown", reset);
      return () => window.removeEventListener("keydown", reset);
    },
    [setModifiedResults]
  );
  return (
    <form
      className={styles.search}
      onSubmit={(e) => {
        e.preventDefault();
        searchKey();
      }}
    >
      <div className={styles.icon}>
        <FaSearch type="submit" />
      </div>
      <input
        type="text"
        placeholder="Search by name | email | id"
        value={key}
        className={styles.input}
        disabled={disabled}
        onChange={(e) => {
          setKey(e.target.value);
          searchKey();
        }}
      />
    </form>
  );
}

export default Search;
