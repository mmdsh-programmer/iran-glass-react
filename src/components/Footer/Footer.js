import React from 'react';
import { Link } from "react-router-dom";
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles["main-footer"]}>
      <div className={`container ${styles["container"]}`}>
        <div className="row wrap">
          <dl className={styles["subscribe"]}>
            <dt>IGT</dt>
            <dd>Iran Glass Technology</dd>
          </dl>
        </div>

        <div className="row wrap footer-info">
          <div className={styles["col-3"]}>
            <h6 className={styles["footer-info-title"]}>
              Get in touch with us
            </h6>
            <ul className={styles["footer-info-menu"]}>
              <li className={styles["menu-item"]}>
                <address className={styles["footer-info-address"]}>
                  No 20, Azadi 117th,
                  Mashhad,Iran
                </address>
              </li>
              <li className={styles["menu-item"]}>
                <span className={styles["footer-info-postcode"]}>Po Box: 91784 7718</span>
              </li>
            </ul>
          </div>
          <div className={`${styles["col-3"]} ${styles["no-title"]}`}>
            <ul className={styles["footer-info-menu"]}>
              <li className={styles["menu-item"]}>
                <a href="mailto:contact@iranglass.com"
                  className={`${styles["footer-info-email"]} ${styles["menu-link"]}`}>contact@iranglass.com</a>
              </li>
              <li className={styles["menu-item"]}>
                <a href="tel:+985136661225" className={`${styles["footer-info-tel"]} ${styles["menu-link"]}`}>+98 513 6661225</a>
              </li>
              <li className={styles["menu-item"]}>
                <a href="tel:+989103002020" className={`${styles["footer-info-phone"]} ${styles["menu-link"]}`}>+98 910 3002020</a>
              </li>
            </ul>
          </div>
          <div className={styles["col-3"]}>
            <h6 className={styles["footer-info-title"]}>
              Products
            </h6>
            <ul className={styles["footer-info-menu"]}>
              <li className={styles["menu-item"]}><Link to="/" className={styles["menu-link"]}>Decoration mirors</Link></li>
              <li className={styles["menu-item"]}><Link to="/" className={styles["menu-link"]}>Smart mirors</Link></li>
              <li className={styles["menu-item"]}><Link to="/" className={styles["menu-link"]}>Oridinary mirors</Link></li>
            </ul>
          </div>
          <div className={styles["col-3"]}>
            <h6 className={styles["footer-info-title"]}>
              Socials
            </h6>
            <ul className={styles["footer-info-menu"]}>
              <li className={styles["menu-item"]}>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className={styles["menu-link"]}>
                  <img src="images/social-icons/instagram.svg" alt="instagram" title="instagram" />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`row wrap ${styles["footer-copyright"]}`}>
          <nav className={styles["footer-copyright-navbar"]}>
            <ul className={styles["footer-copyright-menu"]}>
              <li className={styles["menu-item"]}><Link to="/" className={styles["menu-link"]}>Home</Link></li>
              <li className={styles["menu-item"]}><Link to="/" className={styles["menu-link"]}>About</Link></li>
              <li className={styles["menu-item"]}><Link to="/" className={styles["menu-link"]}>Contact</Link></li>
            </ul>
          </nav>

          <Link to="/" className={styles["copyright-link"]}>2021 © All right reserved to IGT Co</Link>
        </div>
      </div>
    </footer>
  )
};
