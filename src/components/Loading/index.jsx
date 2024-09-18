import React from "react";
import styles from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles["loading-dots"]}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};
