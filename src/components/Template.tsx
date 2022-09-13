import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import Slider from "./Slider";
import MyCountup from "./MyCountup";
import Main from "./Main";

const shortcodes = { Slider, MyCountup }; // Provide common components here

export default function PageTemplate({ data, children }) {
  return (
    <>
      <MDXProvider components={shortcodes}>
        <Main data={data}>{children}</Main>
      </MDXProvider>
    </>
  );
}
export const query = graphql`
  query ($id: String!) {
    allMdx {
      edges {
        node {
          id
          frontmatter {
            slug
            date
            desktopIcon
            order
            icon
          }
          frontmatter {
            title
            slug
            subtitle
            date
          }
          internal {
            contentFilePath
          }
        }
      }
      nodes {
        id
        frontmatter {
          slug
          date
        }
        internal {
          contentFilePath
        }
      }
    }
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date
        slug
      }
    }
  }
`;
