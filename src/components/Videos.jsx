import React from "react";
import styled from "@emotion/styled";
import { Card } from "./Card";

export const Videos = ({ data, ...atrs }) => {
  return (
    <Container {...atrs}>
      {data
        .map(({ node }) => {
          let sec = node.length_seconds;
          let hrs = Math.floor(sec / 3600);
          let min = Math.floor((sec - hrs * 3600) / 60);
          let seconds = sec - hrs * 3600 - min * 60;
          seconds = Math.round(seconds * 100) / 100;

          let length = hrs < 10 ? "0" + hrs : hrs;
          length += ":" + (min < 10 ? "0" + min : min);
          length += ":" + (seconds < 10 ? "0" + seconds : seconds);

          return (
            <VideoCard
              key={node.id}
              badge={length}
              to={`${node.slug}`}
              image={
                node.localImage && node.localImage.childImageSharp
                  ? node.localImage.childImageSharp.fluid
                  : node.image.super_url
              }
            >
              <Deck>
                <h3>{node.name}</h3>
                {node.deck && <p>{node.deck}</p>}
              </Deck>
            </VideoCard>
          );
        })
        .reverse()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : "column")};
  justify-content: ${props =>
    props.direction === "row" ? "space-around" : "flex-start"};
  flex-wrap: ${props => (props.direction === "row" ? "wrap" : "nowrap")};
  padding: 0;
  @media screen and (min-width: ${props => props.theme.screens.tablet}) {
    flex-basis: 70%;
  }
`;

const VideoCard = styled(Card)`
  justify-content: center;
  flex-basis: 100%;
  flex-wrap: wrap;
  @media screen and (min-width: ${props => props.theme.screens.tablet}) {
    flex-wrap: nowrap;
    flex-basis: 48%;
  }
`;

const Deck = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #404040;
  width: 100%;
  padding: 0.7rem;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: ${props => props.theme.screens.tablet}) {
    width: 60%;
  }
  p,
  h3 {
    text-align: center;
    margin: 0;
    font-size: 1.1rem;
  }
  p {
    margin: 0.75rem 0 0 0;
    font-size: 0.8rem;
  }
`;
