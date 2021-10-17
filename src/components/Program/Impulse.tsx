import React from "react";
import TextProgram from "./Templates/Text";

export default function Impulse({ handleClose }: any) {
  return (
    <TextProgram title="Impulse" handleClose={handleClose}>
      <p>
        Impulse is my side project - a wearable device and app to help users
        overcome addictions. More to come ;)
      </p>
    </TextProgram>
  );
}
