import { CgGym } from "react-icons/cg";
import styles from "./AuthForm.module.css";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createAdminApi, logInAdminApi } from "../../../services/adminApi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../ui/Loader/Loader";
import { useAppContext } from "../../../contexts/AppContext";

function AuthForm({ type }) {
  const { setAdmin } = useAppContext();
  const [isHidden, setIsHidden] = useState(true);
  const { handleSubmit, register, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
    if (data.remember) sessionStorage.setItem("remember", true);
    mutate(data);
  };

  const { mutate } = useMutation({
    mutationFn: type === "signup" ? createAdminApi : logInAdminApi,
    onSuccess: (data) => {
      const { admin } = data;
      console.log(admin); 
      const gymId = admin.gymId;
      toast.success(
        type === "signup"
          ? "Account created successfully!"
          : "Logged in successfully!"
      );
      if (type === "signin") {
        if (sessionStorage.getItem("remember"))
          localStorage.setItem("gym-id", admin.gymId);
        else sessionStorage.setItem("temp-auth-token", admin.gymId);
        localStorage.setItem("gym-admin", JSON.stringify(admin));
      }

      navigate(`/${gymId}`);
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    console.log(type);
    if (type !== "signup") {
      console.log("in for check");
      const token = sessionStorage.getItem("temp-auth-token");
      const gymId = localStorage.getItem("gym-id");
      if (token || gymId) {
        const admin = JSON.parse(localStorage.getItem("gym-admin"));
        setAdmin(admin);
      }
      if (gymId) {
        navigate(`/${gymId}`);
      }
      if (token) {
        navigate(`/${token}`);
      }
    }
  }, [navigate, setAdmin, type]);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <CgGym />
          <Link to={"/"}>
            <span className={styles.logo}>Legend X</span>
          </Link>
          <p className={styles.subtitle}>
            Manage Your Gym Like Never Before Streamline operations, track
            memberships, and grow <br />
            your business.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{type === "signup" ? "Create account" : "Sign In"}</h1>
        <div>
          {type === "signup" && (
            <>
              <div>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Required" })}
                  className={errors.name ? styles.errInput : ""}
                />
              </div>
              {errors.name && (
                <p className={styles.error}>{errors.name.message}</p>
              )}
            </>
          )}
          <div>
            <label htmlFor="name">Email</label>
            <input
              type="email"
              {...register("email", { required: "Required" })}
              className={errors.email ? styles.errInput : ""}
            />
          </div>
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
          <div>
            <label htmlFor="name">Password</label>
            <div className={styles.relative}>
              <input
                type={isHidden ? "password" : "text"}
                {...register("password", { required: "Required" })}
                className={errors.password ? styles.errInput : ""}
              />
              {isHidden ? (
                <FaEyeSlash onClick={() => setIsHidden((state) => !state)} />
              ) : (
                <FaEye onClick={() => setIsHidden((state) => !state)} />
              )}
            </div>
          </div>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
          {type === "signin" && (
            <div className={styles.check}>
              <label htmlFor="remember">Remember me</label>
              <input
                type="checkbox"
                name="remember"
                id="remember"
                value={true}
                {...register("remember")}
              />
            </div>
          )}
          <button className={styles.btn}>
            {isLoading ? (
              <Loader size={30} bgColor="#fff" />
            ) : type === "signup" ? (
              "Create account"
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
