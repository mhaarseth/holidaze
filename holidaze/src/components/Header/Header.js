import React from "react";
import Nav from "../../components/Nav/Nav.js";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <Nav />
    </div>
  );
}
