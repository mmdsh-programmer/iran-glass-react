import React from "react";
import styles from "./ProductView.module.css";

export default function ProductView() {
  return (
    <section className={styles["product-view"]}>
      <div className="container">
        <div className="row align-center justify-space-between">
          <header className={styles["product-view-title"]}>
            <h2 className={styles["product-title"]}>Classic Mirror</h2>
          </header>
          <a href="#" className={styles["close-button"]}>
            <img
              src={
                process.env.PUBLIC_URL + "/images/product-view/close-button.svg"
              }
              alt="close button"
            />
          </a>
        </div>

        <div className="row wrap">
          <div className={styles["product-sort"]}>
            <ul className={`row wrap ${styles["sort-list"]}`}>
              <li className={styles["list-item"]}>
                <h5 className={styles["item-title"]}>Model</h5>
                <span className={styles["item-description"]}>
                  Classic Part 01
                </span>
              </li>
              <li className={styles["list-item"]}>
                <h5 className={styles["item-title"]}>material</h5>
                <span className={styles["item-description"]}>Wood</span>
              </li>
              <li className={styles["list-item"]}>
                <h5 className={styles["item-title"]}>miror color</h5>
                <span className={styles["item-description"]}>Silver</span>
              </li>
              <li className={styles["list-item"]}>
                <h5 className={styles["item-title"]}>Wood color</h5>
                <span className={styles["item-description"]}>Gold</span>
              </li>
              <li className={styles["list-item"]}>
                <h5 className={styles["item-title"]}>Length</h5>
                <span className={styles["item-description"]}>90 CM</span>
              </li>
              <li className={styles["list-item"]}>
                <h5 className={styles["item-title"]}>Width</h5>
                <span className={styles["item-description"]}>70 CM</span>
              </li>
              <li className={styles["list-item"]}>
                <h5 className={styles["item-title"]}>Weight</h5>
                <span className={styles["item-description"]}>6 KG</span>
              </li>
            </ul>
          </div>

          <div className={`row ${styles["product-navigations"]}`}>
            <a href="#" className={styles["navigator"]}>
              <img
                src={
                  process.env.PUBLIC_URL + "/images/product-view/left-arrow.svg"
                }
                alt="prev"
                className={`${styles["left"]} ${styles["navigator-icon"]}`}
              />
              <span className={styles["navigator-text"]}>PREV PRODUCT</span>
            </a>
            <a href="#" className={styles["navigator"]}>
              <span className={styles["navigator-text"]}>NEXT PRODUCT</span>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/product-view/right-arrow.svg"
                }
                alt="next"
                className={`${styles["right"]} ${styles["navigator-icon"]}`}
              />
            </a>
          </div>
        </div>

        <div className={`row ${styles["product-images"]}`}>
          <img
            src={
              process.env.PUBLIC_URL + "/images/product-view/product-image.png"
            }
            alt="product 1"
          />

          <img
            src={
              process.env.PUBLIC_URL +
              "/images/product-view/product-image-2.png"
            }
            alt="product 2"
          />

          <img
            src={
              process.env.PUBLIC_URL + "/images/product-view/product-image.png"
            }
            alt="product 1"
          />
        </div>
      </div>
    </section>
  );
}
