import { Frame, Modal } from "@react95/core";
import React from "react";

export default function ExplorerProgram({ handleClose, children }) {
  return (
    <Modal
      icon="windows_explorer_32x32_4bit"
      title="Windows Explorer"
      closeModal={handleClose}
      width="300"
      height="200"
    >
      <Frame boxShadow="in" bg="white" style={{ height: "100%" }}>
        {children}
      </Frame>
    </Modal>
  );
}
