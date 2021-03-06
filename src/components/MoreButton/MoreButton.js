import React, { useRef } from "react";
import styles from "./MoreButton.module.css";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { TweenMax, Power3 } from "gsap";

export default function MoreButton(props) {
  const { children, className, ...rest } = props;
  const childClassNames = classNames(
    className,
    "button-content",
    "button-container",
    "row",
    "align-center"
  );
  const buttonRef = useRef();

  const callParallax = (e) => {
    parallaxIt(e, buttonRef.current.children[0], 5);
    parallaxIt(e, buttonRef.current.children[1], 20);
  };

  const parallaxIt = (e, target, movement) => {
    TweenMax.to(target, 1, {
      x: e.nativeEvent.offsetX / (movement + 4),
      y: e.nativeEvent.offsetY / (movement + 1),
      ease: Power3.easeOut,
    });
  };

  const buttonEffect = (e) => {
    switch (e.type) {
      case "mousemove":
        callParallax(e);
        break;
      case "mouseleave":
        TweenMax.to(buttonRef.current.children, 1, {
          x: 0,
          y: 0,
          ease: Power3.easeInOut,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={childClassNames}
      onMouseMove={buttonEffect}
      onMouseLeave={buttonEffect}
      ref={buttonRef}
    >
      <div className={`${styles["circle"]} circle`}></div>
      <Link {...rest} className={styles["hero-link"]}>
        {children}
      </Link>
    </div>
  );
}
