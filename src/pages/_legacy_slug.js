import { graphql } from "gatsby";
import Main from "../components/Main";

export default Main;

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
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
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            desktopIcon
            startBarTitle
            sbt
            subtitle
            order
            icon
          }
        }
      }
    }
  }
`;
