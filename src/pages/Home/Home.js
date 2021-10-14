import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { MoreButton } from "components/MoreButton";

export default function Home() {
  return (
    <main className={styles["main-body"]}>
      <section className={styles["hero"]}>
        <div className={styles["background"]}></div>
        <div className={`container grid ${styles["container"]}`}>
          <h1 className={`${styles["hero-title"]} ${styles["main-title"]}`}>
            <span className="block">Iran</span>
            <span className="block">Glass</span>
            <span className={`block ${styles["ml-custom"]}`}>Technology</span>
          </h1>
          <div className={styles["hero-subtitle-container"]}>
            <h3 className={styles["hero-subtitle"]}>Decoration</h3>
            <h3 className={styles["hero-subtitle"]}>& Smart Mirors</h3>
            <img
              className={styles["scroll-down"]}
              src="images/home/scroll.svg"
              alt="scroll down"
            />
          </div>
          <div
            className={`${styles["hero-image-container"]} ${styles["first"]}`}
          >
            <img src="images/home/image-1.png" alt="hero" title="Iran Glass" />
          </div>
          <div
            className={`${styles["hero-image-container"]} ${styles["second"]}`}
          >
            <img src="images/home/image-2.png" alt="hero" title="Iran Glass" />
          </div>
          <div className={styles["hero-description-container"]}>
            <p className={styles["hero-description"]}>
              Iran Glass Technology with more than 40 years of experience and
              with the aim of meeting the needs of customers and improving the
              quality of products since 2001 has changed its name and created
              the Iranian glass technology brand (with the brand name Gilda
              Glass)
            </p>
            <MoreButton to="/" className={styles["more-button"]}>
              More about us
            </MoreButton>
          </div>
        </div>
      </section>

      <section className={styles["quote"]}>
        <blockquote cite="#" className={styles["quote-text"]}>
          Modern design is about realigning your priorities to help keep you
          focused on the important things in life
        </blockquote>
        <div className={styles["quote-border"]}>
          <div className={styles["quote-image-holder"]}>
            <img
              src="images/home/quote-image.png"
              alt="quote image"
              title="quote image"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
