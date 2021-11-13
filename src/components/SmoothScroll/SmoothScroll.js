// import Scrollbar from "smooth-scrollbar";
// import { useEffect } from "react";
// import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";

// export default function SmoothScroll() {
//   useEffect(() => {
//     Scrollbar.use(OverscrollPlugin);

//     Scrollbar.init(document.body, {
//       damping: 0.03,
//       plugins: {
//         overscroll: false,
//       },
//     });

//     return () => {
//       if (Scrollbar) Scrollbar.destroy(document.body);
//     };
//   }, []);

//   return null;
// }

import { useEffect, useRef, useState } from "react";
import { gsap, Power4 } from "gsap";
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

  const onScroll = () => {
    gsap.to(viewportRef.current, {
      force3D: true,
      rotate: 0,
      y: -window.pageYOffset,
      duration: 3,
      ease: Power4.easeOut,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    ro.observe(viewportRef.current);
  }, []);

  return (
    <>
      <div
        className={`${styles["viewport"]} scroll-container`}
        ref={viewportRef}
      >
        {children}
      </div>
      <div
        style={{
          height: height,
        }}
      />
    </>
  );
}
