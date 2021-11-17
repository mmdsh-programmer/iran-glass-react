import React, { useEffect, useRef, useState } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";

export default function Preloader(props) {
  const indicatorRef = useRef(null);
  const [percent, setPercent] = useState(50);

  useEffect(() => {});

  return (
    <div
      className={`${styles["preloader-container"]} row justify-center align-center`}
    >
      <span className={styles["preloader-percent"]}>{percent} %</span>
      <div className={styles["preloader-indicator"]} ref={indicatorRef}></div>
    </div>
  );
}
