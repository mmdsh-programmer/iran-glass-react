import React from "react";
import styles from "./MoreButton.module.css";
import { Link } from "react-router-dom";
import classNames from "classnames";

export default function MoreButton(props) {
  const { children, className, ...rest } = props;
  const childClassNames = classNames(styles["hero-link"], className);
  return (
    <Link {...rest} className={childClassNames}>
      {children}
    </Link>
  );
}
