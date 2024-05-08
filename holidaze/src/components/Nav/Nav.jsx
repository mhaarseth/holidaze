import React from "react";
import { Link } from "react-router-dom";
import { FaHotel, FaUserCircle } from "react-icons/fa";
import styles from "./Nav.module.css";
import SearchField from "../SearchField/SearchField";

export default function Nav() {
  return (
    <div className={styles.navContainer}>
      <div className={styles.searchFieldContainer}>
        <SearchField />
      </div>
      <div className={styles.navHeadingContainer}>
        <h1 className={styles.navTitle}>Holidaze</h1>
      </div>
      <div className={styles.navMenuContainer}>
        <Link to="/" className={styles.menuItem}>
          <FaHotel />
        </Link>
        <Link to="/profile" className={styles.menuItem}>
          <FaUserCircle />
        </Link>
      </div>
    </div>
  );
}
