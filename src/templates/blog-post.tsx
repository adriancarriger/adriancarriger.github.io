import Link from 'gatsby-link';
import * as React from 'react';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface BlogPageProps {
  data: {
    post: {
      id: string
      html: string
      frontmatter: {
        title: string;
      }
    }
  };
}

export default class extends React.Component<BlogPageProps, {}> {
  constructor(props: BlogPageProps, context: any) {
    super(props, context);
  }
  public render() {
    return (
      <div>
        <h1>{this.props.data.post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.data.post.html }}></div>
        <Link to='/page-2/'>Go to page 2</Link>
      </div>
    );
  }
}

export const pageQuery = graphql`
  query blogPostBySlug($slug: String!) {
    post: markdownRemark(
      fields: { slug: { eq: $slug } }
    ) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`;
