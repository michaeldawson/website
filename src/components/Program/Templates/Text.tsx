import { Frame, Modal } from "@react95/core";
import styled from "@xstyled/styled-components";
import React from "react";
import useWindowSize from "../../../utils/useWindowSize";
import * as classes from "./Text.module.css";

export default function TextProgram({
  title,
  handleClose,
  handleClick,
  children,
  isBig,
}) {
  const { width, height } = useWindowSize();

  const modalWidth = width > 500 ? (isBig ? width * 0.9 : 500) : width;
  const modalHeight = (height * (isBig ? 85 : 60)) / 100;

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
          className={[classes.frame, "frame"]}
          style={{
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
