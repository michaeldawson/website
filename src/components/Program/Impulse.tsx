import React from "react";
import TextProgram from "./Templates/Text";

export default function AirRobe({ handleClose }: any) {
  return (
    <TextProgram title="AirRobe" handleClose={handleClose}>
      <p>
        Impulse is my side project - a wearable device and app to help users
        overcome addictions. More to come ;)
      </p>
    </TextProgram>
  );
}
