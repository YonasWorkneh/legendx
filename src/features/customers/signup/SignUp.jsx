import { useForm } from "react-hook-form";
import { useAppContext } from "../../../contexts/AppContext";
import styles from "./SignUp.module.css";
import { CgClose } from "react-icons/cg";
import { HiPencil } from "react-icons/hi";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../../services/userAPI";
import toast from "react-hot-toast";
import Loader from "../../../ui/Loader/Loader";
import { useOffers } from "../../Offers/useOffers";
import Camera from "../../../ui/Camera/Camera";

export default function SignUp() {
  const { isMemberSignUpOpen: isOpen, setIsMemberSignUpOpen: setIsOpen } =
    useAppContext(true);
  const { register, reset, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const [src, setSrc] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState({});
  const { offers } = useOffers();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [isCameraOpened, setIsCameraOpened] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const { mutate: registerUser } = useMutation({
    mutationFn: createUser,
    onSettled: () => {
      setIsOpen(false);
      setSrc("");
      reset();
      setIsRegistering(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("User registered succesfully.");
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    setIsRegistering(true);
    const formData = new FormData();
    Array.from(Object.keys(data)).forEach((key) => {
      formData.append(key, data[key].trim());
    });
    formData.append("image", image);
    const gymId =
      localStorage.getItem("gym-id") ||
      sessionStorage.getItem("temp-auth-token");
    formData.append("gymId", gymId);
    registerUser(formData);
  }

  function closeModal() {
    setIsOpen(false);
    reset();
    setSrc("");
  }

  function onUploadPhoto(e) {
    e.preventDefault();
    fileInputRef.current.click();
  }

  function onTakePhoto(e) {
    e.preventDefault();
    setIsCameraOpened(true);
  }

  function onUpdatePhoto(e) {
    e.preventDefault();
    setImage(null);
    setSrc("");
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

  const closeEffect = useCallback(closeModal, [reset, setIsOpen]);

  useEffect(
    function () {
      const closeWithKey = (e) =>
        e.key.toLowerCase().includes("esc") && closeEffect();
      window.addEventListener("keydown", close);
      return () => window.removeEventListener("keydown", closeWithKey);
    },
    [closeEffect]
  );

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.wrapper}>
            <form
              className={styles.modalContainer}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.modalHeader}>
                <h2>Gym Membership Sign Up</h2>
                <button className={styles.closeBtn} onClick={closeModal}>
                  <CgClose />
                </button>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.formColumn}>
                  {/* name */}
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      {...register("name", {
                        required: "Required *",
                      })}
                    />
                    {errors?.name && (
                      <p className={styles.errMess}>{errors.name.message}</p>
                    )}
                  </div>
                  {/* email */}
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="text"
                      placeholder="john@example.com"
                      {...register("email", {
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email format",
                        },
                      })}
                    />
                    {errors?.eamil && (
                      <p className={styles.errMess}>{errors.email.message}</p>
                    )}
                  </div>
                  {/* phone */}
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      {...register("phoneNum", {
                        required: "Required *",
                      })}
                    />
                    {errors?.phoneNum && (
                      <p className={styles.errMess}>
                        {errors.phoneNum.message}
                      </p>
                    )}
                  </div>
                  {/* gender */}
                  <div className={styles.formGroup}>
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      {...register("gender", {
                        required: "Required *",
                      })}
                    >
                      <option value="">Select a Gender</option>
                      <option value="F">Female</option>
                      <option value="M">Male</option>
                    </select>
                    {errors?.gender && (
                      <p className={styles.errMess}>{errors.gender.message}</p>
                    )}
                  </div>
                  {/* age */}
                  <div className={styles.formGroup}>
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      name=""
                      id="age"
                      {...register("age")}
                    />
                  </div>
                  {/* fitness goal */}
                  <div className={styles.formGroup}>
                    <label>Fitness Goal</label>
                    <div className={styles.radioGroup}>
                      <div className={styles.radioItem}>
                        <input
                          type="radio"
                          id="weight-loss"
                          name="fitness-goal"
                          value={1}
                          defaultChecked
                          {...register("goal")}
                        />
                        <label htmlFor="weight-loss">Weight Loss</label>
                      </div>
                      <div className={styles.radioItem}>
                        <input
                          type="radio"
                          id="muscle-gain"
                          name="fitness-goal"
                          value={2}
                          {...register("goal")}
                        />
                        <label htmlFor="muscle-gain">Muscle Gain</label>
                      </div>
                      <div className={styles.radioItem}>
                        <input
                          type="radio"
                          id="maintain"
                          name="fitness-goal"
                          value={3}
                          {...register("goal")}
                        />
                        <label htmlFor="maintain">Maintain Fitness</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.formColumn}>
                  {/* weight */}
                  <div className={styles.formGroup}>
                    <label htmlFor="weight">Current weight</label>
                    <input
                      type="number"
                      name=""
                      id="weight"
                      {...register("weight")}
                    />
                  </div>
                  {/* height */}
                  <div className={styles.formGroup}>
                    <label htmlFor="weight">Current height</label>
                    <input
                      type="number"
                      name=""
                      id="height"
                      {...register("height")}
                    />
                  </div>
                  {/* membership */}
                  <div className={styles.formGroup}>
                    <label htmlFor="program">Membership Program</label>
                    <select id="program" {...register("plan")}>
                      {offers?.map((offer) => (
                        <option value={offer.paymentDuration} key={offer.id}>
                          {offer.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* shift */}
                  <div className={styles.formGroup}>
                    <label htmlFor="gender">Shift</label>
                    <select id="shift" {...register("shift")}>
                      <option value="">Select preferred shift</option>
                      <option value="F">Day ☀️</option>
                      <option value="M">Night 🌙</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="program">Payment Method</label>
                    <select id="program" {...register("paymentMethod")}>
                      <option value={1}>Cash 💵</option>
                      <option value={2}>CBE</option>
                      <option value={3}>Telebirr</option>
                      <option value={4}>Other</option>
                    </select>
                  </div>
                  {/* profile image */}
                  <div className={styles.formGroup}>
                    <label htmlFor="image">Upload profile</label>
                    <div className={styles.image}>
                      {src ? (
                        <>
                          <img
                            src={src}
                            alt="user-img"
                            className={styles.profile}
                          />
                          <button
                            className={styles.imgUpdate}
                            onClick={onUpdatePhoto}
                          >
                            <HiPencil />
                          </button>
                        </>
                      ) : (
                        <label htmlFor="image">
                          {isUploading ? (
                            <Loader size={60} />
                          ) : (
                            !src && (
                              <>
                                <div className={styles.imgSelectBox}>
                                  <button onClick={onUploadPhoto}>
                                    Upload photo
                                  </button>
                                  <button onClick={onTakePhoto}>
                                    Take photo
                                  </button>
                                </div>
                              </>
                            )
                          )}
                        </label>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      style={{ display: "none" }}
                      id="image"
                      onChange={onImageSelect}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button
                  className={`${styles.btn} ${styles.secondary}`}
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button className={`${styles.btn} ${styles.primary}`}>
                  {isRegistering ? (
                    <Loader size={20} bgColor="#fff" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
          {isCameraOpened && (
            <Camera
              onCloseCamera={setIsCameraOpened}
              onCapture={(image) => {
                setIsUploading(true);
                setTimeout(function () {
                  setIsUploading(false);
                  setImage(image);
                  if (image) {
                    setSrc(URL.createObjectURL(image));
                  }
                }, 1000);
              }}
            />
          )}
        </div>
      )}
    </>
  );
}