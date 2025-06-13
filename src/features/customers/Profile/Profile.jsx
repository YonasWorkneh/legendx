import { NavLink, useParams } from "react-router-dom";
import styles from "./Profile.module.css";
import { useState } from "react";

import { LuPencil } from "react-icons/lu";
import Input from "./Input/Input";
import Select from "./Select/Select";
import Error from "../../../ui/Error/Error";
// import { useAppContext } from "../../../contexts/AppContext";
import { HiTrash } from "react-icons/hi";
import Confirm from "../../../ui/Confirmation/Confirm";
import { useCustomers } from "../useCustomers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, updateUser } from "../../../services/userAPI";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Loader from "../../../ui/Loader/Loader";
import { useOffers } from "../../Offers/useOffers";

function Profile() {
  const { customerId: id } = useParams();
  const { customers } = useCustomers();
  const customer = customers?.find((customer) => customer.userId === id) || {};

  const [opened, setOpened] = useState(false);
  const [src, setSrc] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm();

  const { mutate: onDelete } = useMutation({
    mutationFn: deleteUser,
    onSettled: () => setOpened(false),
    onError: () =>
      toast.error("Error trying to delete user. Please try again!"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
      toast.success("User deleted succesfully");
    },
  });

  const { mutate: onUpdate } = useMutation({
    mutationFn: updateUser,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("User changes updated succesfully.");
    },
  });

  const onCancel = () => setOpened(false);

  function onSubmit(data) {
    const updates = Object.entries(customer)
      .map((info) => {
        const [key, value] = info;
        let prevValue = value;
        let newValue = data[key];
        if (typeof value === "string") {
          prevValue = value?.toLowerCase();
          newValue = newValue?.toLowerCase();
        }
        if (typeof value === "number") {
          newValue = Number(newValue);
        }
        if (typeof value === "boolean") {
          newValue = newValue === "true" ? true : false;
        }
        if (key === "regDate")
          newValue = new Date(data.regDate).toISOString().toLowerCase();
        if (newValue !== prevValue && data[key]) return [key, newValue];
        return [];
      })
      .filter((updates) => updates.length);
    if (image) updates.push(["image", image]);
    const formData = new FormData();
    if (!updates.length) {
      toast.error("There are no updates specified. Please try again.");
      return;
    }
    updates.map((update) => {
      const [key, value] = update;
      formData.append(key, value);
    });

    onUpdate({ id, updates: formData });
  }

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

  const { offers } = useOffers();

  if (!Object.keys(customer).length)
    return (
      <Error
        message={
          "We could not find any matching user with this id. Please try again. "
        }
      />
    );

  const {
    name,
    userId,
    email = "",
    regDate,
    phoneNum: phone,
    imgUrl,
    gender,
    plan,
    age,
    fitnessGoal,
    paymentMethod,
    hasPaid: status,
    weight,
    updatedAt,
  } = customer;

  const { title: membership } =
    offers?.find((offer) => offer.paymentDuration === plan) || {};
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.h1}>Customer Profile</h1>
      <div className={styles.info}>
        <div className={styles.left}>
          <div className={styles.imgFile}>
            {!isUploading && (
              <label htmlFor="img-file" className={styles.selector}>
                <LuPencil />
              </label>
            )}

            <input
              type="file"
              id="img-file"
              hidden
              {...register("image")}
              onChange={onImageSelect}
            />
            {isUploading ? (
              <Loader />
            ) : (
              <img
                src={src ? src : `http://localhost:8000/${imgUrl}`}
                alt="user-img"
              />
            )}
          </div>
          <div className={styles.user}>
            <h2 className={styles.name}>{name}</h2>
            <h4>@{userId}</h4>
          </div>
          <div className={styles.divide}></div>
          <h3 style={{ textTransform: "capitalize" }}>{membership}</h3>
          <div className={styles.btns}>
            <NavLink to="../">
              <button className={`${styles.btn} ${styles.discard}`}>
                Cancel
              </button>
            </NavLink>
            <button className={`${styles.btn} ${styles.save}`}>
              Save Changes
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <h2 className={styles.h2}>Personal Information</h2>
          <div className={styles.inputs}>
            <Input
              id={"name"}
              lable={"Full Name"}
              value={name}
              register={register}
            />
            <Input
              type={"date"}
              id={"regDate"}
              lable={"Registration Date"}
              value={new Date(Date.parse(regDate)).toISOString().split("T")[0]}
              register={register}
            />
            <Select
              id={"gender"}
              lable={"Gender"}
              options={["female", "male"]}
              values={["f", "m"]}
              selected={gender?.toLowerCase() === "m" ? "m" : "f"}
              register={register}
            />
            <Select
              id={"plan"}
              lable={"Memberships"}
              options={offers?.map((offer) => offer.title)}
              values={offers?.map((offers) => offers.paymentDuration)}
              selected={plan}
              register={register}
            />
            <Input id={"age"} lable={"Age"} value={age} register={register} />
            <Input
              id={"weight"}
              lable={"Weight"}
              value={weight}
              register={register}
            />
            <Select
              id={"fitnessGoal"}
              lable={"Fitness-Goal"}
              options={["weight loss", "Muscle gain", "maintain"]}
              values={[1, 2, 3]}
              selected={fitnessGoal}
              register={register}
            />
            <Input
              id={"phoneNum"}
              lable={"Contact Number"}
              value={phone}
              register={register}
            />
            <Select
              id={"hasPaid"}
              lable={"Payment-Status"}
              options={["paid", "unpaid"]}
              values={[true, false]}
              selected={status}
              register={register}
            />
            <Input
              id={"email"}
              lable={"Email"}
              value={email}
              register={register}
            />
            <Select
              id={"status"}
              lable={"Payment-Method"}
              options={["Cash 💵", "CBE", "telebirr", "other"]}
              values={[1, 2, 3, 4]}
              selected={paymentMethod ? paymentMethod : ""}
              name="paymentMethod"
              register={register}
            />
            <Input
              type={"date"}
              id={"updatedAt"}
              lable={"Last updated"}
              value={
                new Date(Date.parse(updatedAt)).toISOString().split("T")[0]
              }
              register={register}
              disabled={true}
            />
          </div>
          <button
            className={styles.deleteBtn}
            onClick={(e) => {
              e.preventDefault();
              setOpened(true);
            }}
          >
            <HiTrash />
          </button>
        </div>
      </div>
      {opened && (
        <Confirm onDelete={onDelete} id={userId} onCancel={onCancel} />
      )}
    </form>
  );
}

export default Profile;
