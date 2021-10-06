import React from "react";
import TextProgram, { P } from "./Templates/Text";

export default function AirRobe({ handleClose }: any) {
  return (
    <TextProgram title="AirRobe" handleClose={handleClose}>
      <P>
        AirRobe is a sustainable fashion startup that absolutely taking off on a
        hockey-stick trajectory. We're integrating with fashion retailers to
        provide a "circular wardrobe" to their customers. Buy now, re-sell
        later... It's the next big thing.
      </P>
      <P>
        Check it out at{" "}
        <a target="_blank" href="https://airrobe.com">
          airrobe.com.au
        </a>
      </P>
    </TextProgram>
  );
}
