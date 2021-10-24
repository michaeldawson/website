import { Frame, Modal } from "@react95/core";
import styled from "@xstyled/styled-components";
import React from "react";
import useWindowSize from "../../../utils/useWindowSize";

export default function TextProgram({
  title,
  handleClose,
  handleClick,
  children,
}) {
  const { width, height } = useWindowSize();

  const modalWidth = width < 500 ? width : width * 0.8;
  const modalHeight = (height * 85) / 100;

  return (
    <div
      onClick={handleClick}
      style={{ width: modalWidth, height: modalHeight.toString() }}
    >
      <Modal
        width={modalWidth}
        height={modalHeight.toString()}
        icon="reader_closed_32x32_4bit"
        title={title}
        closeModal={handleClose}
      >
        <Frame
          height="100%"
          boxShadow="in"
          bg="white"
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            fontSize: 15,
            overflowY: "scroll",
            height: modalHeight - 33,
          }}
        >
          {children}
        </Frame>
      </Modal>
    </div>
  );
}

export const P = styled.p`
  margin-bottom: 12px;
`;
