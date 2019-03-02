import React from "react";
import styled from "@emotion/styled";
import AniLink from "gatsby-plugin-transition-link/AniLink";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.75rem 0;
  position: relative;
  flex-basis: 100%;
  @media screen and (min-width: ${props => props.theme.screens.tablet}) {
    flex-basis: 31.5%;
  }
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
  font-size: 14px;
  border-radius: 0.15rem;
`;

export const Shows = ({ data }) => {
  return (
    <Container>
      {data.map(({ node }) => (
        <Item key={node.id}>
          <AniLink to={`/${node.slug}`} swipe direction="left" duration={0.4}>
            <Image src={node.image.medium_url} alt={node.name} />
          </AniLink>
          <Title>{node.title}</Title>
        </Item>
      ))}
    </Container>
  );
};
