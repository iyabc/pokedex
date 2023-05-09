import styles from "./CircleButton.module.css";

const CircleButton = ({
  text,
  color,
  handleOnCLick,
}: {
  text: string;
  color: string;
  handleOnCLick: any;
}) => {
  return (
    <button
      className={[styles["circle-btn"], styles[`circle-btn--${color}`]].join(
        " "
      )}
      onClick={handleOnCLick}
    >
      {text}
    </button>
  );
};

export default CircleButton;
