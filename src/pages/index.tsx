import { graphql } from "gatsby";
import Main from "../components/Main";

export default Main;

export const pageQuery = graphql`
  query {
    mdx {
      body
      frontmatter {
        title
        subtitle
        startBarTitle
      }
    }
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          body
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            subtitle
            desktopIcon
            sbt
            startBarTitle
            link
            order
            icon
          }
        }
      }
    }
  }
`;
