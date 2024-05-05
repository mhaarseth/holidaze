import React from "react";
import styles from "./Register.module.css";
import { REGISTRATION_URL } from "../../constants/constants";
import Registration from "../../components/Registration/Registration";

export default function Register() {
  return (
    <div className={styles.registerContainer}>
      <Registration />
    </div>
  );
}
