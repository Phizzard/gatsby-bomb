import React from "react";
import styled from "@emotion/styled";
import { Card } from "./Card";

export const Videos = ({ data }) => {
  return (
    <Container>
      {data
        .map(({ node }) => (
          <VideoCard
            key={node.id}
            title={node.name}
            image={node.image.medium_url}
          />
        ))
        .reverse()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: ${props => (props.flexBasis ? props.flexBasis : "75%")};
  padding: 0;
`;

const VideoCard = styled(Card)`
  :first-of-type {
    margin: 0 0;
  }
`;
