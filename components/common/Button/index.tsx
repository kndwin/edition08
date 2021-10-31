import React, { useRef } from "react";
import { useButton } from "react-aria";

import styles from "./styles.module.scss";

export const Button = (props: any) => {
  let ref = useRef(null);

  let { buttonProps } = useButton(props, ref);
  const { children, className } = props;

  return (
    <button
      ref={ref}
      className={`${styles.button} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
