import { graphql } from "gatsby";
import Main from "../components/Main";

export default Main;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            subtitle
            desktopIcon
            startBar
            icon
          }
        }
      }
    }
  }
`;
