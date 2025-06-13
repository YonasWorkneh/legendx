import { useEffect, useState } from "react";
import { useAppContext } from "../../../contexts/AppContext";
import Error from "../../../ui/Error/Error";
import Loader from "../../../ui/Loader/Loader";
import Pagination from "../../../ui/Pagination/Pagination";
import Customer from "../customer/Customer";
import { useCustomers } from "../useCustomers";
import styles from "./CustomersList.module.css";

function CustomersList() {
  const { customers, isLoadingCustomers } = useCustomers();
  const { modifiedResults, recordPerPage, currentPage, setCurrentPage } =
    useAppContext();

  const [totalPages, setTotalPages] = useState();

  const index = recordPerPage * currentPage;
  const lastIndex = index > customers?.length ? customers?.length : index;
  const rem = index - lastIndex;
  const firstIndex = lastIndex - recordPerPage;
  const customersPerPage = customers?.slice(firstIndex + rem, lastIndex);
  const modifiedResultsPerPage = modifiedResults?.length
    ? modifiedResults?.slice(firstIndex + rem, lastIndex)
    : modifiedResults;

  useEffect(
    function () {
      setTotalPages(
        modifiedResults?.length ? modifiedResults?.length : customers?.length
      );
    },
    [modifiedResults?.length, setTotalPages, customers]
  );

  if (isLoadingCustomers)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "3rem",
        }}
      >
        <Loader />
      </div>
    );
  if (!customers?.length)
    return (
      <Error message="You currently have no registered customers. Start by adding customers." />
    );
  if (!modifiedResults?.length && modifiedResults !== null)
    return <Error message="No matching records. Please try again." />;
  return (
    <>
      <ul className={styles.customers}>
        <li className={styles.headerRow}>
          <span>Customer Id</span>
          <span>Customer</span>
          <span>Phone</span>
          <span>Email</span>
          <span>Register Date</span>
          <span>Plan</span>
          <span>Weight</span>
          <span>Height</span>
          <span>Status</span>
        </li>
        {(modifiedResultsPerPage || customersPerPage)?.map(
          (customer, index) => (
            <Customer customer={customer} key={index} />
          )
        )}
      </ul>
      <Pagination
        total={totalPages}
        currentPage={currentPage}
        onSetTotalPages={setTotalPages}
        onSetCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default CustomersList;
