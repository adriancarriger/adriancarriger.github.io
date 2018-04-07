module.exports = {
  siteMetadata: {
    title: 'Gatsby Typescript Starter',
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': `AuthorJson`
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data`,
        name: 'markdown-pages'
      }
    },
    'gatsby-transformer-remark',

    // Parse all markdown files (each plugin add/parse some data into graphQL layer)
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 690,
              backgroundColor: `#f7f0eb`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-autolink-headers`
        ]
      }
    },

    // Parse all images files
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ]
};
