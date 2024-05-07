import React from "react";
import Nav from "../Nav/Nav.jsx";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <Nav />
    </div>
  );
}
