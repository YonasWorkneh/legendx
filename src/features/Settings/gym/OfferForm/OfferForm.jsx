import toast from "react-hot-toast";
import {
  createOffer,
  deleteOffer,
  updateOffer,
} from "../../../../services/offerApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

import styles from "./OfferForm.module.css";
import { HiPlus } from "react-icons/hi";
import Loader from "../../../../ui/Loader/Loader";
import { LuPencil } from "react-icons/lu";

function OfferForm({ formId, offer }) {
  const [isUploading, setIsUploading] = useState(false);
  const [services, setServices] = useState(offer?.services?.length || 1);
  const [image, setImage] = useState(null);

  const { getValues, register, reset, setValue, handleSubmit } = useForm({
    defaultValues: offer,
  });
  const [selectedImg, setSelectedImg] = useState(getValues("offerImg"));

  const queryClient = useQueryClient();

  const { mutate: uploadOffer } = useMutation({
    mutationFn: createOffer,
    onError: () => {
      reset();
      setImage(null);
      setSelectedImg(null);
      toast.error("Failed to create offer. Please try again.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["offers"],
      });
      toast.success("Offer successfully created.");
    },
  });

  const { mutate: update } = useMutation({
    mutationFn: updateOffer,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["offers"],
      });
      toast.success("Offer updated succesufully.");
    },
  });

  const { mutate: deleteOff } = useMutation({
    mutationFn: deleteOffer,
    onError: () => toast.error("Failed to delete offer. Please try again."),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["offers"],
      });
      toast.success("Offer deleted succesfully.");
    },
  });

  function onImageSelect(e) {
    setSelectedImg(null);
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      const file = e.target.files[0];
      if (getValues().id) setValue("id", null);
      if (file) {
        setImage(file);
        setSelectedImg(URL.createObjectURL(file)); // Preview the image
      }
    }, 1000);
  }

  function onSubmit(data) {
    const formData = new FormData();
    const services = [];
    const { offerId: id } = offer;
    Object.keys(data).forEach((key) => {
      if (!key.includes(formId)) return;
      if (key.includes("service")) {
        services.push(data[key]);
        return;
      }
      formData.append(key.slice(0, -2), data[key]);
    });
    formData.append(
      "services",
      JSON.stringify(services.filter((services) => services))
    );
    formData.append("image", image);
    const gymId =
      localStorage.getItem("gym-id") ||
      sessionStorage.getItem("temp-auth-token");
    formData.append("gymId", gymId);
    id ? update({ id, offer: formData }) : uploadOffer(formData);
  }

  return (
    <form className={styles.offer} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor={`title-${formId}`}>Membership title</label>
        <input
          type="text"
          placeholder="Yearly"
          defaultValue={getValues("title")}
          id={`title-${formId}`}
          {...register(`title-${formId}`, { required: true })}
        />
      </div>
      <div>
        <label htmlFor={`duration-${formId}`}>Payment duration</label>
        <select
          id={`paymentDuration-${formId}`}
          {...register(`paymentDuration-${formId}`)}
          defaultValue={getValues("paymentDuration")}
        >
          <option value="">Select payment duration</option>
          <option value={1}>Monthly</option>
          <option value={2}>Quarterly</option>
          <option value={3}>Six-monthly</option>
          <option value={4}>Yearly</option>
        </select>
      </div>
      <div>
        <label htmlFor={`base-${formId}`}>Base price</label>
        <input
          type="number"
          placeholder="5000"
          id={`base-${formId}`}
          defaultValue={getValues("base")}
          {...register(`base-${formId}`, { required: true })}
        />
      </div>
      <div>
        <label htmlFor={`discounted-${formId}`}>Discounted price</label>
        <input
          type="number"
          placeholder="4500"
          defaultValue={getValues("discounted")}
          id={`discounted-${formId}`}
          {...register(`discounted-${formId}`, { required: true })}
        />
      </div>
      <div className={`${styles.service} ${styles.mt2}`}>
        <label htmlFor={`service-${formId}`}>Service</label>
        {Array.from({ length: services }).map((_, index) => (
          <input
            key={index}
            type="text"
            placeholder={`service-${index + 1}`}
            defaultValue={getValues("services")?.at(index)}
            {...register(`service-${formId}${index}`)}
          />
        ))}
      </div>
      <button
        className={styles.add}
        onClick={(e) => {
          e.preventDefault();
          setServices((state) => state + 1);
        }}
      >
        <HiPlus />
        <span>Add service</span>
      </button>
      <h5>Add membership image</h5>
      <div className={styles.img}>
        {isUploading ? (
          <Loader />
        ) : !selectedImg ? (
          <label htmlFor={`image-${formId}`}>
            <HiPlus />
          </label>
        ) : (
          ""
        )}
        <input
          type="file"
          id={`image-${formId}`}
          hidden
          onChange={onImageSelect}
        />
        {selectedImg && (
          <div className={styles.img}>
            <img
              src={
                getValues("id")
                  ? `http://localhost:8000/${selectedImg}`
                  : selectedImg
              }
              alt={`Selected for ${formId}`}
            />
            <label htmlFor={`image-${formId}`} className={styles.pen}>
              <LuPencil />
            </label>
          </div>
        )}
      </div>
      <button
        className={`${styles.add} ${styles.mt2} ${styles.delete}`}
        onClick={(e) => {
          e.preventDefault();
          deleteOff(offer.offerId);
        }}
      >
        Delete
      </button>
      <button className={`${styles.add} ${styles.mt2}`}>
        <span>Save changes</span>
      </button>
    </form>
  );
}

export default OfferForm;
