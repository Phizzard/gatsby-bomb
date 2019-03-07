import React from "react";
import { string, any } from "prop-types";
import styled from "@emotion/styled";
import AniLink from "gatsby-plugin-transition-link/AniLink";

export const Card = ({ badge, image, to, className, onClick, children }) => {
  const CardContainer = to ? LinkContainer : Container;
  return (
    <CardContainer
      className={className}
      to={`/${to}`}
      swipe
      direction="left"
      onClick={() => onClick}
    >
      <Image>
        <img src={image} alt={badge} />
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
  img {
    height: 100%;
    width: 100%;
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
