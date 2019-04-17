import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import videojs from "video.js";
import "video.js/dist/video-js.min.css";

import Layout from "../components/layout";

const Live = () => {
  let videoRef = useRef(null);
  useEffect(() => {
    const player = videojs("live-video", {
      autoplay: true,
      controls: true,
      sources: [
        {
          src: "http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8",
          type: "video/x-mpegURL"
        }
      ]
    });
    return function cleanup() {
      if (player) player.dispose();
    };
  }, []);
  return (
    <Layout>
      <h1>You're watching LIVE!</h1>
      <Wrapper>
        <div data-vjs-player>
          <video id="live-video" className="video-js" ref={videoRef} />
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

export default Live;
