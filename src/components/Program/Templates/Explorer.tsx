import { Frame, Modal } from "@react95/core";
import React from "react";

export default function ExplorerProgram({
  title = "Windows Explorer",
  handleClose,
  children,
  ...rest
}) {
  return (
    <Modal
      icon="windows_explorer_32x32_4bit"
      title={title}
      closeModal={handleClose}
      width="300"
      height="400"
      {...rest}
    >
      <Frame
        boxShadow="in"
        bg="white"
        style={{ height: "100%", overflowY: "scroll" }}
      >
        {children}
      </Frame>
    </Modal>
  );
}
