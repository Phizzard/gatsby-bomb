import React from "react";
import styled from "@emotion/styled";

import Layout from "../components/layout";
import { VideoPlayer } from "../components/VideoPlayer";

const Video = ({ pageContext }) => {
  return (
    <Layout>
      <Wrapper>
        <VideoPlayer title={pageContext.name} src={pageContext.embed_player} />
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 90vh;
`;

export default Video;
