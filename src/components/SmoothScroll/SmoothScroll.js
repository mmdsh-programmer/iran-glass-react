import React, { useRef, useState, useEffect } from "react";
import styles from "./SmoothScroll.module.css";
import { TweenLite, Power2 } from "gsap";
// import CustomEase from "gsap/CustomEase";

export default function SmoothScroll({ children }) {
  const viewport = useRef();
  const fakeRef = useRef();
  const [height, setHeight] = useState(window.innerHeight);

  const ro = new ResizeObserver((elements) => {
    for (let elem of elements) {
      const crx = elem.contentRect;
      setHeight(crx.height);
    }
  });

  const onScroll = (e) => {
    TweenLite.to(viewport.current, 3, {
      y: -window.pageYOffset,
      ease: Power2.easeOut,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    ro.observe(viewport.current);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={styles["viewport"]} ref={viewport}>
        {children}
      </div>
      <div
        ref={fakeRef}
        style={{
          height: height,
        }}
      ></div>
    </>
  );
}
