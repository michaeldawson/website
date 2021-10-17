import styled from "@xstyled/styled-components";
import React, { useState } from "react";
import useWindowSize from "../utils/useWindowSize";

interface Props {
  name: string;
  handleDoubleClick?: () => void;
  white?: boolean;
  style?: any;
  children: React.ReactNode;
}

export default function IconWrapper({
  children,
  name,
  white,
  handleDoubleClick,
}: Props) {
  const [isSelected, setSelected] = useState(false);

  const selectedStyles = isSelected ? { border: "1px solid black" } : {};

  const toggleSelected = () => setSelected((i) => !i);

  const { width } = useWindowSize();

  const isMobile = width < 500;

  // This is shit but I don't care
  const handleClick = isMobile ? handleDoubleClick : undefined;
  const handleDoubleClickActual = isMobile ? undefined : handleDoubleClick;

  return (
    <IconContainer
      onDoubleClick={handleDoubleClickActual}
      onClick={handleClick}
      style={{ color: white ? "white" : undefined, ...selectedStyles }}
    >
      {children}
      {name}
    </IconContainer>
  );
}

const IconContainer = styled.span`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4;
  min-width: 70px;
  height; 80px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  * {
    cursor: pointer;
  }

  img {
    margin-bottom: 8;
  }
`;
