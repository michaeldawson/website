import { Icon } from "@react95/core";
import { IconProps } from "@react95/core/@types/Icon/Icon";
import styled from "@xstyled/styled-components";
import React from "react";

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

interface Props {
  name: string;
  iconName: IconProps["name"];
  handleClick?: () => void;
  white?: boolean;
  style?: any;
}

export default function DesktopIcon({
  name,
  iconName,
  handleClick,
  white,
  ...rest
}: Props) {
  return (
    <IconContainer style={{ color: white ? "white" : undefined }} {...rest}>
      <Icon
        name={iconName}
        className="draggable"
        onClick={handleClick}
        {...iconStyle}
      />
      {name}
    </IconContainer>
  );
}
