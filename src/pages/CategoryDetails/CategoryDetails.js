import React from "react";
import styles from "./CategoryDetails.module.css";
import { Footer } from "components/Footer";
import { MoreButton } from "components/MoreButton";

export default function CategoryDetails() {
  return (
    <>
      <main className={styles["category-body"]}>
        <section className={styles["hero"]}>
          <div className="container">
            <header className={styles["category-header"]}>
              <h1 className={styles["header-title"]}>Decorative Mirror</h1>
              <p className={styles["header-subtitle"]}>
                Iran Glass Technology with more than 40 years of experience and
                with the aim of meeting the needs of customers and improving the
                quality of products
              </p>
            </header>
          </div>
          <div className={styles["background"]}>
            <img
              className={styles["background-image"]}
              src={process.env.PUBLIC_URL + "/images/category/hero-image.png"}
              alt="hero image"
            />
          </div>

          <p className={styles["description"]}>
            Iran Glass Technology with more than 40 years of experience and with
            the aim of meeting the needs of customers and improving the quality
            of products since 2001 has changed its name and created the Iranian
            glass technology brand (with the brand name Gilda Glass)
          </p>
        </section>

        <section className={styles["catalogue"]}>
          <div className={`container ${styles["container"]}`}>
            <div className={`row wrap ${styles["catalogue-counter"]}`}>
              <div
                className={`col ${styles["col-4"]} row justify-start align-start`}
              >
                <div className="row align-end">
                  <span className={styles["counter-number"]}>48</span>
                  <span className={styles["counter-separator"]}></span>
                  <h4 className={`inline-block ${styles["counter-title"]}`}>
                    Wall mirors
                  </h4>
                </div>
              </div>
              <div
                className={`col ${styles["col-4"]} row justify-center align-center`}
              >
                <div className="row align-end">
                  <span className={styles["counter-number"]}>6</span>
                  <span className={styles["counter-separator"]}></span>
                  <h4 className={`inline-block ${styles["counter-title"]}`}>
                    Miror tables
                  </h4>
                </div>
              </div>
              <div
                className={`col ${styles["col-4"]} row justify-end align-end`}
              >
                <div className="row align-end">
                  <span className={styles["counter-number"]}>10</span>
                  <span className={styles["counter-separator"]}></span>
                  <h4 className={`inline-block ${styles["counter-title"]}`}>
                    Miror consuls
                  </h4>
                </div>
              </div>
            </div>

            <div className={styles["catalogue-data"]}>
              <header className={styles["catalogue-data-title"]}>
                <h3 className={styles["title"]}>Wall mirror</h3>
              </header>

              <div className="row align-center">
                <span className={`block ${styles["counter-separator"]}`}></span>
                <span className={`block ${styles["counter-number"]}`}>
                  48 products
                </span>
              </div>

              <div className="row wrap align-center">
                <p className={styles["catalogue-data-description"]}>
                  Iran Glass Technology with more than 40 years of experience
                  and with the aim of meeting the needs of customers
                </p>

                <MoreButton to="/" className={styles["view-products"]}>
                  View products
                </MoreButton>
              </div>

              <div className={styles["catalogue-data-image"]}>
                <img
                  className={styles["image"]}
                  src={
                    process.env.PUBLIC_URL +
                    "/images/category/product-image.png"
                  }
                  alt="product"
                  title="product image"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles["quote"]}>
          <div className="container">
            <blockquote cite="#" className={styles["quote-text"]}>
              Modern design is about realigning your priorities to help keep you
              focused on the important things in life
            </blockquote>
          </div>
        </section>

        <section className={styles["gallery"]}>
          <div
            className={`container row wrap align-center ${styles["gallery-container"]}`}
          >
            <div className={styles["image-holder"]}>
              <img
                src={process.env.PUBLIC_URL + "/images/home/image-2.png"}
                alt="gallery-item-1"
              />
            </div>
            <div className={styles["image-holder"]}>
              <img
                src={process.env.PUBLIC_URL + "/images/home/quote-image.png"}
                alt="gallery-item-2"
              />
            </div>
            <div className={styles["image-holder"]}>
              <img
                src={process.env.PUBLIC_URL + "/images/home/work-1.jpg"}
                alt="gallery-item-3"
              />
            </div>
            <div className={styles["image-holder"]}>
              <img
                src={process.env.PUBLIC_URL + "/images/home/work-2.jpg"}
                alt="gallery-item-4"
              />
            </div>
            <div className={styles["image-holder"]}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/category/gallery-image-4.png"
                }
                alt="gallery-item-5"
              />
            </div>
            <div className={styles["image-holder"]}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/category/gallery-image-2.png"
                }
                alt="gallery-item-6"
              />
            </div>
            <div className={styles["image-holder"]}>
              <img
                src={
                  process.env.PUBLIC_URL + "/images/category/product-image.png"
                }
                alt="gallery-item-7"
              />
            </div>
            <div className={styles["image-holder"]}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/category/gallery-image-1.png"
                }
                alt="gallery-item-8"
              />
            </div>
            <div className={styles["image-holder"]}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/category/gallery-image-3.png"
                }
                alt="gallery-item-9"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer classes={styles["custom-footer"]} />
    </>
  );
}
