import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles["main-header"]}>
      <div className={`container ${styles.container}`}>
        <div className="row">
          <a href="#" className={styles["header-menu-icon"]}>
            <span></span>
            <span></span>
            <span></span>
          </a>

          <Link to="/" className={styles["header-logo"]}>
            IGT
          </Link>

          <nav className={styles["header-navbar"]}>
            <ul className={styles["header-menu"]}>
              <li className={styles["menu-item"]}>
                <Link to="/" className={styles["menu-link"]}>
                  Home
                </Link>
              </li>
              <li className={styles["menu-item"]}>
                <Link to="/category-details" className={styles["menu-link"]}>
                  Products
                </Link>
              </li>
              <li className={styles["menu-item"]}>
                <Link to="/404" className={styles["menu-link"]}>
                  About
                </Link>
              </li>
              <li className={styles["menu-item"]}>
                <Link to="/" className={styles["menu-link"]}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className={styles["header-utilities"]}>
            <ul className={styles["header-utilities-menu"]}>
              <li className={styles["menu-item"]}>
                <Link
                  className={`${styles["menu-link"]} ${styles["lang-switch"]}`}
                  to="/"
                >
                  فارسی
                </Link>
              </li>
              <li className={styles["menu-item"]}>
                <a
                  className={styles["menu-link"]}
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/social-icons/instagram.svg"
                    }
                    alt="instagram"
                    title="instagram"
                    className={styles["instagram"]}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
