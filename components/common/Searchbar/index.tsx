import styles from "./styles.module.scss";
import React, { ReactElement } from "react";

export interface SearchbarProps {}

export function Searchbar(props: SearchbarProps): ReactElement | null {
  return (
    <input type="text" placeholder="Search" className={styles.searchbar} />
  );
}
