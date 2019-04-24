import React, { useEffect, useRef, useState, Fragment } from "react";
import styled from "@emotion/styled";
import videojs from "video.js";
import "@videojs/http-streaming";
import "video.js/dist/video-js.min.css";
import axios from "axios";

import Layout from "../components/layout";

const Live = () => {
  const [liveVideo, setLiveVideo] = useState(null);
  let videoRef = useRef(null);

  useEffect(() => {
    let player = null;
    if (
      document.getElementById("live-video") &&
      liveVideo &&
      liveVideo.stream
    ) {
      player = videojs("live-video", {
        html5: {
          hls: {
            overrideNative: true
          }
        },
        autoplay: true,
        controls: true,
        sources: [
          {
            src: liveVideo.stream,
            type: "video/x-mpegURL"
          }
        ]
      });
    }
    return function cleanup() {
      if (player) player.dispose();
    };
  });

  useEffect(() => {
    fetchCurrentLive()
      .then(result => {
        setLiveVideo(result);
      })
      .catch(err => console.error(err));
  }, []);

  const fetchCurrentLive = async () => {
    const { data } = await axios.get("/.netlify/functions/current-live");
    return data.video;
  };

  return (
    <Layout>
      {liveVideo && liveVideo.title && liveVideo.stream ? (
        <Fragment>
          <Title>Currently live: {liveVideo.title}</Title>
          <Wrapper>
            <div data-vjs-player>
              <video id="live-video" className="video-js" ref={videoRef} />
            </div>
          </Wrapper>
        </Fragment>
      ) : (
        <Fragment>
          <Title>Nothing currently live</Title>
        </Fragment>
      )}
    </Layout>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  .video-js {
    width: 100%;
    height: 100%;
  }
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

export default Live;
