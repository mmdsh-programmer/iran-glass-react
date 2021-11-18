import React, { useEffect, useRef, useState, useMemo } from "react";
import { useHistory } from "react-router";
import styles from "./Preloader.module.css";
import { gsap, Power2 } from "gsap";

export default function Preloader(props) {
  const [percent, setPercent] = useState(0);
  const indicatorRef = useRef(null);
  const progressRef = useRef(null);
  const preloaderContainerRef = useRef(null);
  const { latency } = props;
  const loadProgress = gsap.timeline();

  useEffect(() => {
    loadProgress.to(indicatorRef.current, {
      yPercent: -100,
      duration: latency / 1000 + 1,
      ease: Power2.easeOut,
      onUpdate: () => {
        progressRef.current.innerText = `${
          (loadProgress.progress() * 100) >> 0
        } %`;
      },
      onComplete: () => {
        gsap.to(preloaderContainerRef.current, {
          opacity: 0,
          duration: 0.5,
          delay: latency / 1000 + 1,
          ease: Power2.easeOut,
        });
      },
    });
  });

  return (
    <div
      className={`${styles["preloader-container"]} row justify-center align-center`}
      ref={preloaderContainerRef}
    >
      <span className={styles["preloader-percent"]} ref={progressRef}></span>
      <div className={styles["preloader-indicator"]} ref={indicatorRef}></div>
    </div>
  );
}
