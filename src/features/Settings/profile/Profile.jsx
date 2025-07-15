import { LuPencil } from "react-icons/lu";

import styles from "./Profile.module.css";
import ThemePreview from "./Theme/Theme";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { adminUpdateApi } from "../../../services/adminApi";
import toast from "react-hot-toast";
import Loader from "../../../ui/Loader/Loader";
import { useAppContext } from "../../../contexts/AppContext";

function ProfileSettings() {
  const { admin, setAdmin } = useAppContext();
  // pass change vars
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passChangeLoading, setPassChangeLoading] = useState(false);
  const [accUpdating, setAccUpdating] = useState(false);
  const {
    register: record,
    handleSubmit: handlePasswordChange,
    formState,
    reset,
  } = useForm();
  const { errors } = formState;

  // profile change vars
  const [image, setImage] = useState(null);
  const [selectedImg, setSelectedImg] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const { register, handleSubmit } = useForm();

  const onChangePassword = async (data) => {
    const formData = new FormData();
    formData.append("currPass", data.currPass);
    formData.append("newPass", data.newPass);
    setPassChangeLoading(true);

    try {
      const result = await adminUpdateApi(formData);
      toast.success(result.message);
      reset();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPassChangeLoading(false);
    }
  };

  const onProfileUpdate = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("image", image);
    adminUpdateApi(formData);
    try {
      setAccUpdating(true);
      const result = await adminUpdateApi(formData);
      const { admin } = result;
      setAdmin(admin);
      localStorage.setItem("gym-admin", JSON.stringify(admin));

      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setAccUpdating(false);
    }
  };

  function onProfileSelect(e) {
    setSelectedImg(null);
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        setSelectedImg(URL.createObjectURL(file)); // Preview the image
      }
    }, 1000);
  }
  return (
    <div className={styles.profile}>
      <h3>Account</h3>
      <p>Update your account settings down below. </p>
      <div className={styles.forms}>
        <form className={styles.form} onSubmit={handleSubmit(onProfileUpdate)}>
          <div className={styles.personal}>
            <h4>Profile information</h4>
            <div className={styles.wrapper}>
              <div className={styles.img}>
                {isUploading ? (
                  <Loader size={40} />
                ) : (
                  <img
                    src={
                      selectedImg
                        ? selectedImg
                        : `${import.meta.env.VITE_BASE_URL}/admins/${
                            admin.imgUrl
                          }`
                    }
                    alt="profile-img"
                  />
                )}
                <label htmlFor="profile">
                  <LuPencil />
                </label>
                <input
                  type="file"
                  id="profile"
                  hidden
                  onChange={onProfileSelect}
                />
              </div>
            </div>
            <div>
              <label htmlFor="name">Full name</label>
              <input
                type="text"
                {...register("name")}
                defaultValue={admin.name}
              />
            </div>
            <div>
              <label htmlFor="name">Email</label>
              <input
                type="text"
                {...register("email")}
                defaultValue={admin.email}
              />
            </div>
            <button className={styles.add}>
              {accUpdating ? (
                <Loader size={25} bgColor="#fff" />
              ) : (
                <span>Save changes</span>
              )}
            </button>
          </div>
        </form>
        <form
          className={styles.reset}
          onSubmit={handlePasswordChange(onChangePassword)}
        >
          <h4>Change password</h4>
          <div className={styles.mb10}>
            <label htmlFor="current">Current password *</label>
            <div className={styles.relative}>
              <input
                type={showPassword ? "text" : "password"}
                {...record("currPass", { required: "Required." })}
                className={errors.currPass ? styles.inputErr : ""}
              />
              {showPassword ? (
                <FaEye onClick={() => setShowPassword((state) => !state)} />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPassword((state) => !state)}
                />
              )}
            </div>
            {errors.currPass && (
              <p className={styles.err}>{errors.newPass.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="new">New password</label>
            <div className={styles.relative}>
              <input
                type={showNewPassword ? "text" : "password"}
                {...record("newPass", { required: "Required" })}
                className={errors.newPass ? styles.inputErr : ""}
              />
              {showNewPassword ? (
                <FaEye onClick={() => setShowNewPassword((state) => !state)} />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowNewPassword((state) => !state)}
                />
              )}
            </div>
            {errors.newPass && (
              <p className={styles.err}>{errors.newPass.message}</p>
            )}
          </div>
          <button className={styles.add}>
            {passChangeLoading ? (
              <Loader size={25} bgColor="#fff" />
            ) : (
              <span>Reset password</span>
            )}
          </button>
        </form>
      </div>
      <div className={styles.appearance}>
        <h4>Appearance & theme</h4>
        <label>Select your default theme.</label>
        <ThemePreview />
      </div>
    </div>
  );
}

export default ProfileSettings;
