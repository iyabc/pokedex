import React from "react";

const MainButton = ({
  text,
  handleClick,
}: {
  text: string;
  handleClick: Function;
}) => {
  return <button onClick={() => handleClick}>{text}</button>;
};

export default MainButton;
