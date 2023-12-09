import React from "react";

import styles from "./ButtonTwo.module.scss";

interface ButtonTwoProps {
  text: string;
  img: string;
  handleClick: () => void;
  color?: "blue" | "red";
}

const ButtonTwo: React.FC<ButtonTwoProps> = ({ img, text, handleClick, color = "blue" }) => {
  return (
    <button className={`${styles.buttonTwo} ${styles[color + "Text"]}`} onClick={() => handleClick()}>
      <img src={img} alt={`${text} button`} />
      {text}
    </button>
  );
};

export { ButtonTwo };
