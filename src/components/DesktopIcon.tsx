import { Icon } from "@react95/core";
import { IconProps } from "@react95/core/@types/Icon/Icon";
import styled from "@xstyled/styled-components";
import React, { useState } from "react";

interface Props {
  name: string;
  iconName: IconProps["name"];
  handleDoubleClick?: () => void;
  white?: boolean;
  style?: any;
}

export default function DesktopIcon({
  name,
  iconName,
  handleDoubleClick,
  white,
  ...rest
}: Props) {
  const [isSelected, setSelected] = useState(false);
  const selectedStyles = isSelected ? { border: "1px solid black" } : {};
  const toggleSelected = () => setSelected((i) => !i);

  return (
    <IconContainer
      style={{ color: white ? "white" : undefined, ...selectedStyles }}
      {...rest}
    >
      <Icon
        name={iconName}
        className="draggable"
        variant="32x32_4"
        onClick={toggleSelected}
        onDoubleClick={handleDoubleClick}
        {...iconStyle}
      />
      {name}
    </IconContainer>
  );
}

const IconContainer = styled.button`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4;
  min-width: 70px;
  height; 70px;
  border: none;
  background-color: transparent;

  i,
  :hover {
    cursor: pointer;
  }

  i {
    margin-bottom: 8;
  }
`;

const iconStyle = {
  style: {
    width: 40,
    height: 40,
    marginRight: 4,
  },
};
