import React from "react";
import { string, any } from "prop-types";
import styled from "@emotion/styled";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import Img from "gatsby-image";

export const Card = ({ badge, image, to, children, height, ...attrs }) => {
  const CardContainer = to ? LinkContainer : Container;
  return (
    <CardContainer to={`/${to}`} fade {...attrs}>
      <Image height={height}>
        <Img fluid={image} alt={badge} />
        <Badge>{badge}</Badge>
      </Image>
      {children}
    </CardContainer>
  );
};

Card.propTypes = {
  className: string,
  children: any,
  to: string
};

const LinkContainer = styled(AniLink)`
  display: flex;
  position: relative;
  justify-content: center;
  margin: 0.75rem 0;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  margin: 0.75rem 0;
`;

const Image = styled.div`
  position: relative;
  width: 100%;
  height: ${props => (props.height ? `${props.height / 1.3}px` : `initial`)};
  @media screen and (min-width: 480px) {
    height: ${props => (props.height ? `${props.height}px` : `initial`)};
  }
  img {
    height: 100%;
    width: 100%;
  }
  .gatsby-image-wrapper {
    position: initial !important;
  }
`;

const Badge = styled.p`
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  margin-bottom: 0;
  padding: 0.15rem 0.35rem;
  background-color: #242628;
  color: #fff;
  font-size: 14px;
  border-radius: 0.15rem;
`;

export default { Card };
