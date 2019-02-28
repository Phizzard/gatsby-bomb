import PropTypes from "prop-types";
import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#000`
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 2560,
        padding: `1rem 2rem`
      }}
    >
      <h1 style={{ margin: 0, fontSize: "20px" }}>
        <AniLink
          swipe
          direction="right"
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
          duration={0.4}
        >
          {siteTitle}
        </AniLink>
      </h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
