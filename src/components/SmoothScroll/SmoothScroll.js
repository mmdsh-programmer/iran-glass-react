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
import { gsap, Power2 } from "gsap";
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
      force3D: false,
      rotate: 0,
      y: -window.pageYOffset,
      duration: 3,
      ease: Power2.easeOut,
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

// import { useEffect, useRef } from "react";
// import { useHistory } from "react-router";
// import useWindowSize from "hooks/useWindowSize";
// import styles from "./SmoothScroll.module.css";

// export default function SmoothScroll({ children }) {
//   const app = useRef(null);
//   const scrollContainer = useRef(null);
//   const history = useHistory();
//   console.log(history);
//   const { width, height } = useWindowSize();
//   const scrollConifg = {
//     ease: 0.08,
//     current: 0,
//     previous: 0,
//     rounded: 0,
//   };

//   useEffect(() => {
//     setBodyHeight();
//     requestAnimationFrame(() => scrolling());
//   }, []);

//   useEffect(() => {
//     setBodyHeight();
//   }, [height, width]);

//   const scrolling = () => {
//     scrollConifg.current = window.scrollY;
//     // Set Previous to the scroll previous position
//     scrollConifg.previous +=
//       (scrollConifg.current - scrollConifg.previous) * scrollConifg.ease;
//     // Set rounded to
//     scrollConifg.rounded = Math.abs(scrollConifg.previous * 100) / 100;

//     //Assign smooth scrolling to the scroll container
//     scrollContainer.current.style.transform = `translateY(-${scrollConifg.rounded}px)`;

//     requestAnimationFrame(() => scrolling());
//   };

//   const setBodyHeight = () => {
//     document.body.style.height = `${
//       scrollContainer.current.getBoundingClientRect().height
//     }px`;
//   };

//   return (
//     <>
//       <div ref={app} className={styles["app"]}>
//         <div ref={scrollContainer} className={styles["scroll"]}>
//           {children}
//         </div>
//       </div>
//     </>
//   );
// }
