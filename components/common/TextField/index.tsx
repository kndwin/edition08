import React, { useRef } from "react";
import { useTextField } from "react-aria";

import styles from "./styles.module.scss";

export function TextField(props: any) {
  let { label } = props;
  // @ts-ignore
  let ref = useRef(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);
  const { className } = props;

  return (
    <div className={`${styles.textfield}`}>
      {label && <label {...labelProps}>{label}</label>}
      <input {...inputProps} ref={ref} className={className} />
      {props.description && (
        <div {...descriptionProps}>
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps}>
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}
