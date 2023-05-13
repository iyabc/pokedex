import styles from "./CircleButton.module.css";

const AddButton = ({ text, color }: { text: string; color: string }) => {
  return (
    <button
      className={`${styles.circleButton} ${styles[`circleButton--${color}`]}`}
    >
      {text}
    </button>
  );
};

export default AddButton;
