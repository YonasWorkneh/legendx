import { FaCalendarAlt } from "react-icons/fa";

import styles from "./Header.module.css";
import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import { HiPlus } from "react-icons/hi2";
import { useAppContext } from "../../../contexts/AppContext";
import { useCustomers } from "../useCustomers";
import { useState } from "react";
import { formatDate } from "../../../utils/date";

function Header() {
  const { setIsMemberSignUpOpen: setIsOpen } = useAppContext();
  const { customers } = useCustomers();
  const [filterOpened, setFilterOpened] = useState(false);
  const [sortOpened, setSortOpened] = useState(false);

  return (
    <div className={styles.header}>
      <div className={`center ${styles.date}`}>
        <FaCalendarAlt />
        <span>{formatDate(false)}</span>
      </div>
      <Search disabled={!customers.length} />
      <div className={styles.manip}>
        <Sort
          disabled={!customers?.length}
          sortOpened={sortOpened}
          setSortOpened={setSortOpened}
          setFilterOpened={setFilterOpened}
        />
        <Filter
          disabled={!customers?.length}
          filterOpened={filterOpened}
          setFilterOpened={setFilterOpened}
          setSortOpened={setSortOpened}
        />
      </div>
      <div>
        <button className={styles.btn} onClick={() => setIsOpen(true)}>
          <HiPlus />
          <span>New customer</span>
        </button>
      </div>
    </div>
  );
}

export default Header;
