import { BiPlus } from "react-icons/bi";
import Equipment from "./Equipment";
import styles from "./styles.module.css";
import Form from "./Form";
import { useState } from "react";
import { useEquipments } from "./useEquiments";
import Error from "../../ui/Error/Error";
import Confirm from "../../ui/Confirmation/Confirm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteEquipment } from "../../services/equipmentApi";
function ListOfEquipments() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const { equipments } = useEquipments();
  const [activeEquipment, setActiveEquipment] = useState({}); // new state for active equipment
  const [isConfirmOpened, setIsConfirmOpened] = useState(false); // new state for delete confirmation box
  const queryClient = useQueryClient();
  const { mutate: removeEquipment } = useMutation({
    mutationFn: deleteEquipment,
    onSettled: () => setIsConfirmOpened(false),
    onError: () =>
      toast.error("Error trying to delete equipment. Please try again!"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
      toast.success("Equipment deleted succesfully");
    },
  });
  return (
    <div>
      <button
        className={styles.btn}
        onClick={() => {
          setActiveEquipment({});
          setIsFormOpened(true);
        }}
      >
        <BiPlus />
        <span>New equipment</span>
      </button>
      {equipments?.length ? (
        <div className={styles.list}>
          {equipments.map((equipment) => (
            <Equipment
              equipment={equipment}
              key={equipment.id}
              onEdit={() => {
                setIsFormOpened(true);
                setActiveEquipment(equipment);
              }}
              onDelete={() => {
                setActiveEquipment(equipment);
                setIsConfirmOpened(true);
              }}
            />
          ))}
        </div>
      ) : (
        <Error message="There are no equipments. Start adding by clicking the new equipment button." />
      )}
      {isFormOpened && (
        <Form
          onClose={() => setIsFormOpened(false)}
          activeEquipment={activeEquipment}
        />
      )}
      {isConfirmOpened && (
        <Confirm
          onCancel={() => setIsConfirmOpened(false)}
          onDelete={removeEquipment}
          message={`Are you sure you want to delete this equipment. This action is  \npermanent and can't be undone.`}
          id={activeEquipment.equipmentId}
        />
      )}
    </div>
  );
}

export default ListOfEquipments;
