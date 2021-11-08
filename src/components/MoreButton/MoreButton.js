import React, { useRef } from "react";
import styles from "./MoreButton.module.css";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { TweenMax, Power2 } from "gsap";

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
    parallaxIt(e, buttonRef.current.children[0], 80);
  };

  const parallaxIt = (e, target, movement) => {
    var boundingRect = buttonRef.current.getBoundingClientRect();
    var relX = e.pageX - boundingRect.left;
    var relY = e.pageY - boundingRect.top;

    TweenMax.to(target, 0.3, {
      x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
      y: 0,
      ease: Power2.easeOut,
    });
  };

  const buttonEffect = (e) => {
    switch (e.type) {
      case "mouseenter":
        TweenMax.to(buttonRef.current, 0.3, {
          transformOrigin: "0 0",
        });
        TweenMax.to(buttonRef.current.children[0], 0.3, {
          scale: 1.1,
        });
        break;
      case "mousemove":
        callParallax(e);
        break;
      case "mouseleave":
        TweenMax.to(buttonRef.current, 0.3, { scale: 1 });
        TweenMax.to(buttonRef.current.children, 0.3, { scale: 1, x: 0, y: 0 });
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={childClassNames}
      onMouseMove={buttonEffect}
      onMouseEnter={buttonEffect}
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
