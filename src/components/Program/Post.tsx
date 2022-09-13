import React from "react";
import TextProgram from "./Templates/Text";

export default function Post({ mdx, children, handleClose, handleClick }) {
  const isBig = mdx.body.length > 200;

  return (
    <TextProgram
      title={mdx.frontmatter.title}
      handleClose={handleClose}
      handleClick={handleClick}
      isBig={isBig}
    >
      <h1>{mdx.frontmatter.title}</h1>
      <h2>{mdx.frontmatter.subtitle}</h2>
      {mdx.frontmatter.date ? (
        <div className="post-date">Last updated {mdx.frontmatter.date}</div>
      ) : null}
      <div style={{ marginBottom: 30 }}>{children}</div>
    </TextProgram>
  );
}
