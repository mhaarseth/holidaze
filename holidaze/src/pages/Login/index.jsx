import React from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Login.module.css";
import { LOGIN_URL, API_KEY_URL } from "../../constants/constants";

const schema = yup.object({
  email: yup
    .string()
    .matches(
      // eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid e-mail address"
    )
    .required("A valid e-mail address is required"),
  password: yup
    .string()
    .min(3, "Your password must be at least eight characters")
    .required("You must provide a valid password"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const json = await response.json();
        const getToken = json.data.accessToken;

        const profileName = json.data.name;
        localStorage.setItem("profileName", profileName);

        localStorage.setItem("token", getToken);
        const token = localStorage.getItem("token");

        const fetchApiKey = await fetch(API_KEY_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const generateApiKey = await fetchApiKey.json();
        const getApiKey = generateApiKey.data.key;
        localStorage.setItem("apiKey", getApiKey);

        window.location.href = "/";
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.errors[0].message);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContentContainer}>
        <h2 className={styles.loginHeading}>Login</h2>
        <div className={styles.loginFormContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>E-mail address</label>
            <input type="email" {...register("email")} />
            <p>{errors.email?.message}</p>
            <label>Password</label>
            <input type="password" {...register("password")} />
            <p>{errors.password?.message}</p>
            <button type="submit">Log in</button>
          </form>
        </div>
        <div className={styles.registerLinkContainer}>
          Not registered yet? <Link to={"../register"}>Go register!</Link>
        </div>
      </div>
    </div>
  );
}
