import React from "react";
import TextProgram from "./Templates/Text";

export default function Post({ post, handleClose, handleClick }) {
  const isBig = post.html.length > 200;

  return (
    <TextProgram
      title={post.frontmatter.title}
      handleClose={handleClose}
      handleClick={handleClick}
      isBig={isBig}
    >
      <h1>{post.frontmatter.title}</h1>
      <h2>{post.frontmatter.subtitle}</h2>
      <div className="post-date">Last updated {post.frontmatter.date}</div>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
    </TextProgram>
  );
}
