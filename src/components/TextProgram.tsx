import { Frame, Modal } from "@react95/core";
import React from "react";

export default function TextProgram({ title, handleClose, children }) {
  return (
    <Modal
      width="300"
      icon="reader_closed_32x32_4bit"
      title={title}
      closeModal={handleClose}
    >
      <Frame
        height="100%"
        boxShadow="in"
        bg="white"
        style={{ paddingLeft: 4, paddingRight: 4 }}
      >
        {children}
      </Frame>
    </Modal>
  );
}
