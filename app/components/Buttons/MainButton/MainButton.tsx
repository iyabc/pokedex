import React from "react";

const MainButton = ({
  text,
  handleClick,
}: {
  text: string;
  handleClick: Function;
}) => {
  return <button onclick={() => handleClick}>{text}</button>;
};

export default MainButton;
