import React from "react";
import styles from "./Pill.module.css";

const Pill = ({ type }: { type: string }) => {
  return (
    <div className={[styles["pill"], styles[`pill--${type}`]].join(" ")}>
      {type}
    </div>
  );
};

export default Pill;
