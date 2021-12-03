import React, { useRef, InputHTMLAttributes } from "react";
import {  useTextField, AriaTextFieldOptions } from "@react-aria/textfield";

import styles from "./styles.module.scss";

export function TextField(props: any) {
  let { label } = props;
  // @ts-ignore
	let ref = useRef<HTMLInputElement>(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
		useTextField(props, ref);
  const { className } = props;

  return (
    <div className={`${styles.textfield}`}>
      {label && <label {...labelProps}>{label}</label>}
			<input {...(inputProps as InputHTMLAttributes<HTMLInputElement>)} ref={ref} className={className} />
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
