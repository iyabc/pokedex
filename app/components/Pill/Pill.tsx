import React from "react";
import styles from "./Pill.module.css";

const Pill = ({ text, isType }: { text: string; isType: boolean }) => {
  return (
    <div
      className={[styles["pill"], isType && styles[`pill--${text}`]].join(" ")}
    >
      {text}
    </div>
  );
};

export default Pill;
