import React from "react";
import ActionPactLogo from "../../images/actionpact.png";
import IconWrapper from "../IconWrapper";

export default function ActionPactIcon(props) {
  return (
    <IconWrapper white name="ActionPact" {...props}>
      <img src={ActionPactLogo} style={{ width: 32, height: 32 }}></img>
    </IconWrapper>
  );
}
