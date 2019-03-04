import React from "react";
import { string } from "prop-types";
import styled from "@emotion/styled";
import AniLink from "gatsby-plugin-transition-link/AniLink";

export const Card = ({ title, image, to, className }) => {
  const CardContainer = to ? LinkContainer : Container;
  return (
    <CardContainer className={className} to={`/${to}`}>
      <Image src={image} alt={title} />
      <Title>{title}</Title>
    </CardContainer>
  );
};

Card.propTypes = {
  className: string,
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

const Image = styled.img`
  position: relative;
  align-self: strech;
  height: 100%;
  width: 100%;
`;

const Title = styled.p`
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
