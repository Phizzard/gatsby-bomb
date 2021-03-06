import PropTypes from "prop-types";
import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import styled from "@emotion/styled";
import { MdViewCarousel, MdSearch, MdLiveTv } from "react-icons/md";
import { FaInfinity } from "react-icons/fa";

const Header = ({ siteTitle }) => (
  <Container>
    <HeaderLinks>
      <HeaderLink>
        <AniLink
          fade
          to="/search/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
          duration={0.4}
        >
          <MdSearch />
        </AniLink>
      </HeaderLink>
      <HeaderLink>
        <AniLink
          fade
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
          duration={0.4}
        >
          <MdViewCarousel />
        </AniLink>
      </HeaderLink>
      <HeaderLink>
        <AniLink
          fade
          to="/infinite/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
          duration={0.4}
        >
          <FaInfinity />
        </AniLink>
      </HeaderLink>
      <HeaderLink>
        <AniLink
          fade
          to="/live/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
          duration={0.4}
        >
          <MdLiveTv />
        </AniLink>
      </HeaderLink>
    </HeaderLinks>
  </Container>
);

const Container = styled.header`
  background-color: #000;
  text-align: center;
  border-top-left-radius: 5rem;
  border-top-right-radius: 5rem;
  z-index: 999;
  margin: 0 2% 0rem 2%;
  position: fixed;
  width: 100%;
  bottom: 0;
  @media screen and (min-width: ${props => props.theme.screens.tablet}) {
    margin: 0 20% 0rem 20%;
    width: initial;
    position: relative;
    border-bottom-left-radius: 5rem;
    border-bottom-right-radius: 5rem;
    border-top-left-radius: 0rem;
    border-top-right-radius: 0rem;
  }
`;

const HeaderLinks = styled.div`
  margin: 0 auto;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-evenly;
  z-index: 999;
`;

const HeaderLink = styled.h2`
  margin: 0 0.2rem;
  font-size: 2rem;
  z-index: 999;
`;

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
