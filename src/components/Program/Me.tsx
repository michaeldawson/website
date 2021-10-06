import React from "react";
import useWindowSize from "../../utils/useWindowSize";
import me from ".././../images/me.jpeg";
import ExplorerProgram from "./Templates/Explorer";

export default function Me({ handleClose }: any) {
  const { width, height } = useWindowSize();
  const modalWidth = width < 600 ? width : 600;
  const modalHeight = modalWidth * 0.8;

  return (
    <ExplorerProgram
      title="me.jpeg"
      width={modalWidth}
      height={modalHeight}
      handleClose={handleClose}
    >
      <img src={me} style={{ width: "100%" }} />
    </ExplorerProgram>
  );
}
