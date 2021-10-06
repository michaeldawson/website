import React from "react";
import TextProgram from "./Templates/Text";

export default function Post({ post, handleClose }) {
  return (
    <TextProgram title={post.frontmatter.title} handleClose={handleClose}>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
    </TextProgram>
  );
}
