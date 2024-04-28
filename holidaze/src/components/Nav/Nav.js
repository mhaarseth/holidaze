import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@awesome.me/kit-KIT_CODE/icons/classic/solid";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={styles.navContainer}>
      <h1 className={styles.navTitle}>Holidaze</h1>
      <div className={styles.menuContainer}>
        <Link to="/home" className={styles.menuItem}>
          <faHouse />
        </Link>
        <Link to="/profile" className={styles.menuItem}>
          Profile
        </Link>
      </div>
    </div>
  );
}
