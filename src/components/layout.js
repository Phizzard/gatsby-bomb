import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import PageTransition from "gatsby-v2-plugin-page-transitions";
import Header from "./header";
import "./layout.css";
import { ThemeProvider } from "react-jss";

const theme = {
  screens: {
    phone: "320px",
    tablet: "768px",
    desktop: "1024px",
    hdDesktop: "2560px"
  }
};

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <PageTransition>
            <div
              style={{
                margin: `0 auto`,
                maxWidth: 2560,
                padding: `0px 2rem 1.45rem`,
                paddingTop: 0
              }}
            >
              <main>{children}</main>
              <footer
                style={{
                  fontSize: "12px",
                  color: "#999"
                }}
              >
                © {new Date().getFullYear()} Philip Tietjen, Built with
                {` `}
                <a style={{ color: "#999" }} href="https://www.gatsbyjs.org">
                  Gatsby
                </a>
                {` & `}
                <a
                  style={{ color: "#999" }}
                  href="https://www.giantbomb.com/api"
                >
                  GiantBomb API
                </a>
              </footer>
            </div>
          </PageTransition>
        </>
      </ThemeProvider>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
