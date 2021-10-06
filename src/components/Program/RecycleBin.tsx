import { Progman17 } from "@react95/icons/esm/react/Progman17";
import React from "react";
import IconWrapper from "../IconWrapper";
import ExplorerProgram from "./Templates/Explorer";
import runVirus from "./Virus";

export default function RecycleBin({ openProgram, handleClose }: any) {
  // const { clippy } = useClippy();

  return (
    <ExplorerProgram title="Recycle Bin" handleClose={handleClose}>
      <IconWrapper
        handleDoubleClick={() => runVirus({ onFinished: () => {} })}
        name="notavirus.exe"
      >
        <Progman17 />
      </IconWrapper>
    </ExplorerProgram>
  );
}
