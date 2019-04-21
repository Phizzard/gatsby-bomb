import React from "react";
import styled from "@emotion/styled";

import Layout from "../components/layout";

const Infinite = () => {
  return (
    <Layout>
      <Wrapper>
        <Title>GiantBomb Infinite, all day, all night baby.</Title>
        <Player
          src="https://www.giantbomb.com/live/livestreams/981"
          allowFullScreen
        />
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 1rem;
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  @media screen and (min-width: ${props => props.theme.screens.tablet}) {
    font-size: 2rem;
  }
`;

const Player = styled.iframe`
  border: none;
  width: 100vw;
  height: 1000px;
  @media screen and (min-width: ${props => props.theme.screens.tablet}) {
    width: 80vw;
    height: 800px;
  }
`;
export default Infinite;
