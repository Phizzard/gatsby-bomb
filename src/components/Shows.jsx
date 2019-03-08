import React from "react";
import styled from "@emotion/styled";
import { Card } from "./Card";

export const Shows = ({ data }) => {
  return (
    <Container>
      {data.map(({ node }) => {
        return (
          <ShowCard
            key={node.id}
            badge={node.title}
            image={node.localImage.childImageSharp.fluid}
            to={node.slug}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ShowCard = styled(Card)`
  flex-basis: 100%;
  @media screen and (min-width: ${props => props.theme.screens.tablet}) {
    flex-basis: 31.5%;
  }
`;
