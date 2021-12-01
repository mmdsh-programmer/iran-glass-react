import React, { useEffect } from "react";
import styles from "./Preloader.module.css";
import { gsap, Power2 } from "gsap";

export default function Preloader(props) {
  useEffect(() => {
    let path = document.querySelector(".path");
    const tween = gsap.timeline();
    tween
      .to(path, {
        attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" },
        ease: Power2.easeIn,
        duration: 1,
      })
      .to(path, {
        attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
        ease: Power2.easeOut,
        duration: 1.5,
      })
      .from(
        ".content",
        {
          y: 200,
          autoAlpha: 0,
          duration: 1.5,
          ease: Power2.easeOut,
          onComplete: () => tween.reverse(),
        },
        "-=1.5"
      );
  }, []);

  return (
    <section className={styles["preloader-container"]}>
      <svg
        className={styles["transition"]}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          className="path"
          dur="10s"
          fill="#424242"
          vectorEffect="non-scaling-stroke"
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
        />
      </svg>

      <div className={`${styles["container"]} ${styles["content"]} content`}>
        <h1 className={styles["logo"]}>IGT</h1>
      </div>
    </section>
  );
}
