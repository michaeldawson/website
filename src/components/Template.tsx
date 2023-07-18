import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import React from "react";
import Main from "./Main";
import MyCountup from "./MyCountup";
import RecommendationButton from "./RecommendationButton";
import Redirect from "./Redirect";
import Slider from "./Slider";

const shortcodes = { Slider, MyCountup, RecommendationButton, Redirect }; // Provide common components here

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
            link
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
