import { useForm } from "react-hook-form";
import styles from "./Form.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEquipment, updateEquipment } from "../../services/equipmentApi";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import Loader from "../../ui/Loader/Loader";
import { useCallback, useEffect, useRef, useState } from "react";
import { HiPencil, HiPlus } from "react-icons/hi2";
import { useAppContext } from "../../contexts/AppContext";
function Form({ onClose, activeEquipment }) {
  const { handleSubmit, register, reset } = useForm();
  // const { errors } = formState;
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);
  const [isProccessing, setIsProccessing] = useState(false);
  const { equipmentId: id } = activeEquipment;
  const [src, setSrc] = useState(
    id
      ? `${import.meta.env.VITE_BASE_URL}/equipments/${activeEquipment.imgUrl}`
      : ""
  );
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();
  const { admin } = useAppContext();

  const { mutate: registerEquipment } = useMutation({
    mutationFn: createEquipment,
    onSettled: () => {
      reset();
      onClose();
      setSrc("");
      setIsProccessing(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
      toast.success("Equipment registered succesfully.");
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: updEquipment } = useMutation({
    mutationFn: updateEquipment,
    onSettled: () => {
      reset();
      onClose();
      setSrc("");
      setIsProccessing(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
      toast.success("Equipment updated succesfully.");
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = (data) => {
    console.log(data);
    const { gymId } = admin;
    console.log(gymId);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("quantity", data.quantity);
    formData.append("image", image);
    formData.append("gymId", gymId);
    setIsProccessing(true);
    id ? updEquipment({ id, updates: formData }) : registerEquipment(formData);
  };

  function onImageSelect(e) {
    setIsUploading(true);
    setTimeout(function () {
      setIsUploading(false);
      const file = e.target.files[0];
      setImage(file);
      if (file) {
        setSrc(URL.createObjectURL(file));
      }
    }, 1000);
  }
  function closeModal() {
    onClose();
    reset();
    setSrc("");
  }
  const closeEffect = useCallback(closeModal, [reset, onClose]);

  useEffect(
    function () {
      const closeWithKey = (e) =>
        e.key.toLowerCase().includes("esc") && closeEffect();
      window.addEventListener("keydown", closeWithKey);
      return () => window.removeEventListener("keydown", closeWithKey);
    },
    [closeEffect]
  );
  return (
    <div className={styles.overlay}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            className={styles.close}
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <MdClose />
          </button>
          <h3>Gym equipment</h3>

          <div className={styles.inputs}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Required" })}
                defaultValue={activeEquipment?.name}
              />
            </div>
            <div>
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                {...register("quantity", { required: "Required" })}
                defaultValue={activeEquipment?.quantity}
              />
            </div>
            <div>
              <p>Image</p>
              <div className={styles.image}>
                {src ? (
                  <>
                    <img src={src} alt="user-img" className={styles.profile} />
                    <button
                      className={styles.imgUpdate}
                      onClick={(e) => {
                        e.preventDefault();
                        fileInputRef.current.click();
                      }}
                    >
                      <HiPencil />
                    </button>
                  </>
                ) : (
                  <label htmlFor="image">
                    {isUploading ? (
                      <Loader size={40} />
                    ) : (
                      !src && <HiPlus size={30} />
                    )}
                  </label>
                )}
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              id="image"
              onChange={onImageSelect}
            />
          </div>
          <div className={styles.center}>
            <button className={styles.btn}>
              {isProccessing ? (
                <Loader size={20} bgColor="#fff" />
              ) : (
                <>{id ? "Save changes" : "Add equipment"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
