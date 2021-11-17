import { useEffect, useRef, useState } from "react";
import {
  useViewportScroll,
  useTransform,
  useSpring,
  motion,
} from "framer-motion";
import styles from "./SmoothScroll.module.css";

export default function SmoothScroll({ children }) {
  const viewportRef = useRef();
  const [height, setHeight] = useState(window.innerHeight);

  const ro = new ResizeObserver((elements) => {
    for (let elem of elements) {
      const crx = elem.contentRect;
      setHeight(crx.height);
    }
  });

  useEffect(() => {
    ro.observe(viewportRef.current);
  });

  const { scrollY } = useViewportScroll(); // measures how many pixels user has scrolled vertically
  // as scrollY changes between 0px and the scrollable height, create a negative scroll value...
  // ... based on current scroll position to translateY the document in a natural way
  const transform = useTransform(scrollY, [0, height], [0, -height]);
  const physics = { damping: 20, mass: 1, stiffness: 55 };
  const spring = useSpring(transform, physics);

  return (
    <>
      <motion.div
        className={`${styles["viewport"]} scroll-container`}
        ref={viewportRef}
        style={{ y: spring }}
      >
        {children}
      </motion.div>
      <div
        style={{
          height: height,
        }}
      />
    </>
  );
}
