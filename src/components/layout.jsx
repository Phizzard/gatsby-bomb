import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Header from "./Header";
import styled from "@emotion/styled";
import "./layout.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeProvider } from "emotion-theming";

const theme = {
  screens: {
    phone: "321px",
    tablet: "769px",
    desktop: "1025px",
    hdDesktop: "2561px"
  }
};

const Layout = ({ children, ...attrs }) => (
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
          <Header siteTitle={data.site.siteMetadata.title} />{" "}
          <Body>
            <main {...attrs}> {children} </main>{" "}
            <footer
              style={{
                fontSize: "12px",
                color: "#999"
              }}
            >
              ©{new Date().getFullYear()}
              {` `}
              <a
                style={{
                  color: "#999"
                }}
                href="https://www.philtietjen.dev"
              >
                Phil Tietjen
              </a>
              , Built with {` `}{" "}
              <a
                style={{
                  color: "#999"
                }}
                href="https://www.gatsbyjs.org"
              >
                Gatsby{" "}
              </a>{" "}
              {` & `}{" "}
              <a
                style={{
                  color: "#999"
                }}
                href="https://www.giantbomb.com/api"
              >
                GiantBomb API{" "}
              </a>{" "}
            </footer>{" "}
          </Body>{" "}
        </>{" "}
      </ThemeProvider>
    )}
  />
);

const Body = styled.div`
  margin: 0 auto;
  max-width: 2560px;
  padding-top: 0;
  background-color: #242628;
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
