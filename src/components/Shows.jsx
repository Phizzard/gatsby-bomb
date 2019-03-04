import React from "react";
import styled from "@emotion/styled";
import { Card } from "./Card";

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

export const Shows = ({ data }) => {
  return (
    <Container>
      {data.map(({ node }) => (
        <ShowCard
          key={node.id}
          title={node.title}
          image={node.image.medium_url}
          to={node.slug}
        />
      ))}
    </Container>
  );
};
