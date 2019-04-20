import React, { useEffect, useRef, useState, Fragment } from "react";
import styled from "@emotion/styled";
import videojs from "video.js";
import "video.js/dist/video-js.min.css";
import axios from "axios";

import Layout from "../components/layout";

const Live = () => {
    const [liveVideo, setLiveVideo] = useState(null);
    let videoRef = useRef(null);

    useEffect(() => {
        let player = null;
        if (liveVideo && liveVideo.stream) {
            player = videojs("live-video", {
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
        const { video } = await axios.get("/.netlify/functions/current-live");
        return video;
    };

    return (
        <Layout>
            {liveVideo && liveVideo.title && liveVideo.stream ? (
                <Fragment>
                    <h1>Currently live: {liveVideo.title}</h1>
                    <Wrapper>
                        <div data-vjs-player>
                            <video
                                id="live-video"
                                className="video-js"
                                ref={videoRef}
                            />
                        </div>
                    </Wrapper>
                </Fragment>
            ) : (
                <h1>Nothing is currently Streaming :(</h1>
            )}
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
