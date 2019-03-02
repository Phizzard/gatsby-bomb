import React from "react";
import styled from "@emotion/styled";

export const VideoPlayer = ({ src, title }) => (
  <Container>
    <Player
      title={title}
      allowFullScreen="1"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      src={src}
    />
  </Container>
);

const Container = styled.div`
  display: flex;
  position: relative;
  height: 70vh;
  width: 100vw;
  margin-left: -2rem;
`;

const Player = styled.iframe`
  border: none;
  height: 100%;
  width: 100%;
`;
