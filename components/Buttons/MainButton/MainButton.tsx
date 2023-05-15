import { MouseEvent } from "react";
const MainButton = ({
  text,
  handleClick,
  isSubmit,
}: {
  text: string;
  isSubmit: Boolean;
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button type={isSubmit ? "submit" : "button"} onClick={handleClick}>
      {text}
    </button>
  );
};

export default MainButton;
