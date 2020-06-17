/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    'gatsby-plugin-root-import',
    'gatsby-plugin-optimize-svgs',
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        }
      }
    }  
  ],
}
