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
import { TweenLite, Power1 } from "gsap";
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
    TweenLite.to(viewportRef.current, 1, {
      y: -window.pageYOffset,
      ease: Power1.easeOut,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    ro.observe(viewportRef.current);
  }, []);

  return (
    <>
      <div className={styles["viewport"]} ref={viewportRef}>
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
