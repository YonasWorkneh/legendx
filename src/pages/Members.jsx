import { Outlet, useParams } from "react-router-dom";
import Header from "../features/customers/Header/Header";
import CustomersList from "../features/customers/ListOfCustomers/CustomersList";
import SignUp from "../features/customers/signup/SignUp";

function Members() {
  const { customerId: id } = useParams();
  console.log(useParams());
  console.log(id);
  return (
    <div style={{ height: "100%" }}>
      {id ? (
        <Outlet />
      ) : (
        <>
          <h1>All Customers</h1>
          <Header />
          <CustomersList />
          <SignUp />
        </>
      )}
    </div>
  );
}

export default Members;
