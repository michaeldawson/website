import React from "react";
import me from ".././../images/me.jpeg";
import Text from "./Templates/Text";

export default function Me({ handleClose }: any) {
  return (
    <Text title="me.jpeg" handleClose={handleClose}>
      <img src={me} style={{ width: "100%" }} />
      <p>
        This is my favourite place! If you'd like to know the story, and we're
        out for a drink together, I will gladly share... in exchange for a story
        about your favourite place :)
      </p>
    </Text>
  );
}
