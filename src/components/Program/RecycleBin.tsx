import { useClippy } from "@react95/clippy";
import { Progman17 } from "@react95/icons/esm/react/Progman17";
import React from "react";
import me from "../../images/me.jpeg";
import ActionPactIcon from "../Icons/ActionPact";
import IconWrapper from "../IconWrapper";

import ExplorerProgram from "./Templates/Explorer";
import runVirus from "./Virus";

export default function RecycleBin({ openProgram, handleClose }: any) {
  const { clippy } = useClippy();

  return (
    <ExplorerProgram title="Recycle Bin" handleClose={handleClose}>
      <IconWrapper handleDoubleClick={() => openProgram("Me")} name="me.jpeg">
        <img src={me} style={{ width: "32px", height: "32px" }} />
      </IconWrapper>
      <IconWrapper
        handleDoubleClick={() => runVirus({ clippy, onFinished: () => {} })}
        name="notavirus.exe"
      >
        <Progman17 />
      </IconWrapper>
      <IconWrapper
        handleDoubleClick={() => {
          window.location.href = "/actionpact";
        }}
        name="actionpact"
      >
        <ActionPactIcon />
      </IconWrapper>
    </ExplorerProgram>
  );
}
