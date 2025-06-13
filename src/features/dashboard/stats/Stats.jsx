import { IoPeople } from "react-icons/io5";
import Stat from "./Stat";
import styles from "./Stats.module.css";
import { BsLightningChargeFill } from "react-icons/bs";
import { CgGym } from "react-icons/cg";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { useCustomers } from "../../customers/useCustomers";
import { useEquipments } from "../../Equipments/useEquiments";

function Stats() {
  const { customers } = useCustomers();
  const { equipments } = useEquipments();
  return (
    <div className={styles.stats}>
      <div className={styles.first}>
        <Stat
          lable={"Members"}
          value={customers?.length}
          trend="up"
          externalInfo="Active members"
          icon={<IoPeople />}
        />
        <Stat
          lable={"Visited"}
          value={""}
          trend="down"
          externalInfo="Daily average"
          icon={<BsLightningChargeFill />}
          border={true}
        />
      </div>
      <div className={styles.first}>
        <Stat
          lable={"Revenue"}
          value={"120 K"}
          trend="down"
          externalInfo="Month / June"
          icon={<HiOutlineBanknotes />}
          border={true}
        />
        <Stat
          lable={"Equipments"}
          value={equipments?.length}
          trend="up"
          externalInfo="Active equipments"
          icon={<CgGym />}
        />
      </div>
    </div>
  );
}

export default Stats;
