import PropTypes from "prop-types";
import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import styled from "@emotion/styled";

const Header = ({ siteTitle }) => (
  <Container>
    <HeaderLinks>
      <HeaderLink>
        <AniLink
          swipe
          direction="right"
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
          duration={0.4}>
          Shows
        </AniLink>
      </HeaderLink>
      <HeaderLink>
        <AniLink
          swipe
          direction="right"
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
          duration={0.4}>
          Search
        </AniLink>
      </HeaderLink>
      <HeaderLink>
        <AniLink
          swipe
          direction="right"
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
          duration={0.4}>
          Settings
        </AniLink>
      </HeaderLink>
    </HeaderLinks>
  </Container>
);

const Container = styled.header`
  background-color: #000;
  text-align: center;
  border-bottom-left-radius: 5rem;
  border-bottom-right-radius: 5rem;
  margin: 0 2% 0rem 2%;
  @media screen and (min-width: ${props => props.theme.screens.tablet}) {
    margin: 0 20% 0rem 20%;
  }
`;

const HeaderLinks = styled.div`
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-evenly;
`;

const HeaderLink = styled.h2`
  margin: 0 0.5rem;
  font-size: 1.1rem;
`;

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
