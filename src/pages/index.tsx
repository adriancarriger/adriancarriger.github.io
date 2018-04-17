import Link from 'gatsby-link';
import * as React from 'react';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    posts: {
      edges: any[];
    }
    site: {
      siteMetadata: {
        title: string
      }
    }
  };
}

export default class extends React.Component<IndexPageProps, {}> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context);
  }
  public render() {
    return (
      <div>
        <h1>Adrian Carriger</h1>
        <p>This is my personal website.</p>
        {this.props.data.posts.edges.map((edge, index) => {
          return (
            <li key={index}>
              <Link to={edge.node.fields.slug}>{edge.node.fields.slug}</Link>
            </li>
          );
        })}
      </div>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    posts: allMarkdownRemark(
      limit: 10
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            author {
              bio
            }
          }
        }
      }
    }
  }
`;
