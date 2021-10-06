import { Modal } from "@react95/core";
import React from "react";
import useWindowSize from "../../utils/useWindowSize";

export default function FreecellProgram({ handleClose }) {
  const size = useWindowSize();

  return (
    <Modal
      icon="freecell_1_32x32_4bit"
      title="Freecell"
      width={size.width}
      height={Math.min((size.width / 4) * 3, (size.height / 7) * 6).toString()}
      closeModal={handleClose}
      style={{
        padding: 0,
      }}
    >
      <iframe
        style={{ height: "100%", width: "100%" }}
        src="https://online-solitaire.com/freecell"
      ></iframe>
    </Modal>
  );
}
