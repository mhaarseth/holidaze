import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaRegUser } from "react-icons/fa";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <div className={styles.navContainer}>
      <h1 className={styles.navTitle}>Holidaze</h1>
      <div className={styles.menuContainer}>
        <Link to="/" className={styles.menuItem}>
          <FaHome />
        </Link>
        <Link to="/profile" className={styles.menuItem}>
          <FaRegUser />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
