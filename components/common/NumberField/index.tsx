import { useRef } from "react";
import styles from "./styles.module.scss";

import { useNumberFieldState } from "@react-stately/numberfield";
import { useLocale } from "@react-aria/i18n";
import { useButton } from "@react-aria/button";
import { useNumberField } from "react-aria";

export const NumberField = (props: any) => {
  let { locale } = useLocale();
  let state = useNumberFieldState({ ...props, locale });
  let inputRef = useRef(null);
  let incrRef = useRef(null);
  let decRef = useRef(null);
  let {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef);

  let { buttonProps: incrementProps } = useButton(
    incrementButtonProps,
    incrRef
  );
  let { buttonProps: decrementProps } = useButton(decrementButtonProps, decRef);

  return (
    <div className={styles.wrapper}>
      <label {...labelProps}>{props.label}</label>
      <div className={styles.group} {...groupProps}>
        <input className={styles.number} {...inputProps} ref={inputRef} />
        <div className={styles.buttonGroup}>
          <button className={styles.buttonUp} {...incrementProps} ref={decRef}>
						▲
          </button>
          <button className={styles.buttonDown} {...decrementProps} ref={incrRef}>
						▼
          </button>
        </div>
      </div>
    </div>
  );
};
