import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { redirect } from "react-router-dom";
import styles from "./Registration.module.css";
import { REGISTRATION_URL } from "../../constants/constants";

const schema = yup.object({
  name: yup
    .string()
    .min(3, "Your name must be at least three characters long")
    .required("You must provide a name"),
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

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    if (data.venueManager === "true") {
      data.venueManager = true;
    } else if (data.venueManager === "false") {
      data.venueManager = false;
    }

    try {
      const response = await fetch(REGISTRATION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.errors[0].message);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={styles.registrationContainer}>
      <h2 className={styles.registrationHeading}>Registration</h2>
      <div className={styles.registrationFormContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
          <input type="text" {...register("name")} />
          <p>{errors.name?.message}</p>
          <label>E-mail address</label>
          <input type="email" {...register("email")} />
          <p>{errors.email?.message}</p>
          <label>Password</label>
          <input type="password" {...register("password")} />
          <p>{errors.password?.message}</p>
          <div className={styles.registrationRoleChoiceContainer}>
            <label>Role</label>
            <select {...register("venueManager")}>
              <option value="false">Customer</option>
              <option value="true">Venue Manager</option>
            </select>
          </div>
          <button type="submit">Register new account</button>
        </form>
      </div>
    </div>
  );
}
