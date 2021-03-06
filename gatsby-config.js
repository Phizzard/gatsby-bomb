var proxy = require("http-proxy-middleware");

module.exports = {
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": ""
        }
      })
    );
  },
  pathPrefix: "/gatsby-bomb",
  siteMetadata: {
    title: `Gatsby Bomb`,
    description: `A fan made version of GiantBomb powered by Gatsby JS and the Giantbomb API`,
    author: `@phizzard`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Bomb`,
        short_name: `GatsbyBomb`,
        start_url: `/`,
        background_color: `#242628`,
        theme_color: `#000`,
        display: `standalone`,
        icon: `src/images/giantbomb.png` // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-emotion`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    "gatsby-plugin-offline"
  ]
};
