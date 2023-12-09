import React from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  type: "submit" | "button";
  color?: "blue" | "red" | "grey";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, color = "blue", type, onClick }) => {
  return (
    <button type={type} className={`${styles.button} ${styles[color + "Text"]}`} onClick={onClick}>
      {text}
    </button>
  );
};

export { Button };
