const path = require('path');

// Create slugs for files.
// Slug will used for blog page path.
function onCreateNode({node, boundActionCreators, getNode}) {
  const { createNodeField } = boundActionCreators;
  let slug;
  switch (node.internal.type) {
    case `MarkdownRemark`:
      const fileNode = getNode(node.parent);
      const [basePath, name] = fileNode.relativePath.split('/');
      slug = `/${basePath}/${name}/`;
      break;
  }
  if (slug) {
    createNodeField({node, name: `slug`, value: slug});
  }
};

function createPages({ graphql, boundActionCreators }) {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('src/templates/blog-post.tsx');
    resolve(
      graphql(`
        {
          posts: allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          reject(result.errors);
        }

        result.data.posts.edges.forEach(edge => {
          createPage({
            path: edge.node.fields.slug,
            component: blogPost,
            context: {
              slug: edge.node.fields.slug,
            }
          });
        });
      })
    );
  });
};

module.exports = {
  onCreateNode,
  createPages
};
