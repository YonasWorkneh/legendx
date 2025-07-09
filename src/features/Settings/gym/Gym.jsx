import { useEffect, useState } from "react";
import styles from "./Gym.module.css";
import { HiMinus, HiPlus } from "react-icons/hi";
import OfferForm from "./OfferForm/OfferForm";
import useOffers from "../../offers/useOffers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSetting, setSetting } from "../../../services/settingsApi";
import toast from "react-hot-toast";
import { useSettings } from "../useSettings";

function Gym({ space = 100 }) {
  const { settings } = useSettings();

  const [availSpace, setAvailSpace] = useState(null);
  const { offers } = useOffers();
  const [offersCpy, setOffersCpy] = useState([]);
  const [utilities, setUtilities] = useState([]);
  const [employees, setEmployees] = useState([]);

  const queryClient = useQueryClient();

  useEffect(
    function () {
      setOffersCpy(offers);
    },
    [offers, setOffersCpy]
  );

  useEffect(
    function () {
      const { value: totalSpace } =
        settings?.find((setting) => setting.key === "totalSpace") || {};

      const utils = settings?.filter((setting) =>
        setting.key.includes("utility")
      );

      const employs = settings?.filter((setting) =>
        setting.key.includes("employee")
      );
      setAvailSpace(totalSpace);
      setUtilities(utils);
      setEmployees(employs);
    },
    [settings]
  );

  const onAddOffer = () => setOffersCpy((offers) => [...offers, {}]);
  const { mutate: updateSetting } = useMutation({
    mutationFn: setSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Gym setting updated succesfully.");
    },
    onError: () => toast.error("Failed to update settings. Please try again."),
  });

  const { mutate: onDeleteSetting } = useMutation({
    mutationFn: deleteSetting,
    onSuccess: (data) => {
      console.log(data);
      setUtilities((utilities) =>
        utilities.filter((utility) => utility.settingId !== data.id)
      );
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Setting deleted succesfully.");
    },
    onError: () => toast.error("Failed to delete settings. Please try again."),
  });

  const onSetSpace = (e) => {
    const form = new FormData(e.target);
    const { space } = Object.fromEntries(form);
    updateSetting({ key: "totalSpace", value: space });
  };

  const onSetUtilities = (e) => {
    const form = new FormData(e.target);
    const { utility, amount } = Object.fromEntries(form);
    updateSetting({ key: `utility-${utility}`, value: amount });
  };

  const onSetEmployeeWage = (e) => {
    const form = new FormData(e.target);
    const { employee, amount } = Object.fromEntries(form);
    updateSetting({ key: `employee-${employee}`, value: amount });
  };

  return (
    <div className={styles.gym}>
      <div>
        <div className={styles.header}>
          <h3>Gym details</h3>
          <p>Update you gym details to get the most out of the system.</p>
        </div>
        <div className={styles.gymMain}>
          <form
            className={styles.space}
            onSubmit={(e) => {
              e.preventDefault();
              onSetSpace(e);
            }}
          >
            <label htmlFor="space">Total space</label>
            <p>
              Update total space your gym holds to ease determining available
              space based on customers.
            </p>
            <div className={`${styles.flex} ${styles.mt1}`}>
              <input
                type="number"
                name="space"
                id="space"
                placeholder="100"
                defaultValue={availSpace}
                onChange={(e) => {
                  setAvailSpace(e.target.value);
                }}
              />
              <button className={styles.add}>Save Changes</button>
            </div>
          </form>
          <div className={styles.offers}>
            <div className={styles.offerHeader}>
              <h4>Membership offers</h4>
              <p>Add and update membership offers and their details.</p>
            </div>
            <div className={styles.flexWrap}>
              {offersCpy?.map((offer, index) => (
                <OfferForm
                  offer={offer}
                  key={index}
                  formId={index}
                  setOffers={setOffersCpy}
                />
              ))}
            </div>
            <button
              className={`${styles.add} ${styles.mt2}`}
              onClick={onAddOffer}
            >
              <HiPlus />
              <span>Add offer</span>
            </button>
          </div>
        </div>
        <div className={styles.payment}>
          <div className={styles.header}>
            <h3>Expense details</h3>
            <p>
              Update you expense details to better analyze your net revenue and
              expense.
            </p>
          </div>
          <div className={styles.content}>
            <div className={styles.utility}>
              <label htmlFor="utility">Utility</label>
              <p>Add utility payments to better analyze your financial data.</p>

              {utilities.map((utility, index) => {
                return (
                  <form
                    key={index}
                    className={styles.flexWrap}
                    onSubmit={(e) => {
                      e.preventDefault();
                      onSetUtilities(e);
                    }}
                  >
                    <div className={`${styles.flex} ${styles.col}`}>
                      <label htmlFor="utility" className={styles.smLabel}>
                        Utility
                      </label>
                      <input
                        type="text"
                        name="utility"
                        id="utility"
                        placeholder="Utility"
                        defaultValue={utility?.key?.replace("utility-", "")}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="amount" className={styles.smLabel}>
                        Amount
                      </label>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Amount"
                        defaultValue={utility?.value}
                        required
                      />
                    </div>
                    <button className={styles.add}>
                      <HiPlus />
                    </button>
                    <button
                      className={styles.add}
                      onClick={(e) => {
                        e.preventDefault();
                        onDeleteSetting(utility.settingId);
                      }}
                    >
                      <HiMinus />
                    </button>
                  </form>
                );
              })}
              <button
                className={`${styles.add} ${styles.mt2}`}
                onClick={() => setUtilities((utilities) => [...utilities, {}])}
              >
                <HiPlus />
                <span>Add utility</span>
              </button>
            </div>
            <div className={styles.utility}>
              <label htmlFor="utility">Employee wage</label>
              <p>Add employee wages to better analyze your financial data.</p>

              {employees.map((employee, index) => (
                <form
                  key={index}
                  className={styles.flexWrap}
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSetEmployeeWage(e);
                  }}
                >
                  <div>
                    <label htmlFor="wage" className={styles.smLabel}>
                      Employee Name
                    </label>
                    <input
                      type="text"
                      name="employee"
                      id="employee"
                      placeholder="Employee"
                      defaultValue={employee?.key?.replace("employee-", "")}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="amount" className={styles.smLabel}>
                      Wage
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      defaultValue={employee.value}
                      placeholder="Wage"
                      required
                    />
                  </div>
                  <button className={styles.add}>
                    <HiPlus />
                  </button>
                  <button
                    className={styles.add}
                    onClick={(e) => {
                      e.preventDefault();
                      onDeleteSetting(employee.settingId);
                    }}
                  >
                    <HiMinus />
                  </button>
                </form>
              ))}
              <button
                className={`${styles.add} ${styles.mt2}`}
                onClick={() => setEmployees((employees) => [...employees, {}])}
              >
                <HiPlus />
                <span>Add employee</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gym;
