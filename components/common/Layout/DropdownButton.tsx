import React, { ReactElement } from "react";
import { Button } from "components";
import styles from "./styles.module.scss";

export function DropdownButton({
  trigger,
  ...props
}: any): ReactElement | null {
  return (
    <Button className={styles.dropdown} {...props}>
      {trigger}
    </Button>
  );
}
