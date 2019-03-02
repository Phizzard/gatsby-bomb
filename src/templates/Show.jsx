import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { VideoPlayer } from "../components/VideoPlayer";
import { Videos } from "../components/Videos";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Seasons = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 35%;
`;
const Season = styled.div`
  transition: 0.1s ease-in;
  text-align: center;
  padding: 0.25rem 0;
  margin-bottom: 1rem;
  border: 3px solid #fff;
  border-radius: 0.15rem;
  cursor: pointer;
  &:hover {
    color: #242628;
    background-color: #fff;
  }
`;
const SeasonName = styled.h4`
  margin: 0;
`;

const Show = ({ pageContext, data }) => {
  const { title } = pageContext;
  const [videos, setVideos] = useState([]);
  const [season, setSeason] = useState(null);

  // initialize & handle video list
  useEffect(() => {
    let filteredVideos = [...data.allGiantBombVideo.edges];

    if (season) {
      filteredVideos = filteredVideos.filter(({ node }) => {
        return node.season === season;
      });
    } else {
      setSeason(data.allGiantBombShowSeason.edges[0].name);
    }

    setVideos(filteredVideos);
  }, [season, videos]);

  return (
    <Layout>
      <VideoPlayer
        title={videos.length && videos[0].node.name}
        src={videos.length && videos[0].node.embed_player}
      />
      <h1>{title}</h1>
      <Wrapper>
        <Seasons>
          {data &&
            data.allGiantBombShowSeason &&
            data.allGiantBombShowSeason.edges &&
            data.allGiantBombShowSeason.edges.length &&
            data.allGiantBombShowSeason.edges
              .map(({ node }) => (
                <Season key={node.id} onClick={() => setSeason(node.name)}>
                  <SeasonName>{node.name}</SeasonName>
                </Season>
              ))
              .reverse()}
        </Seasons>
        <Videos flexBasis="60%" data={videos} />
      </Wrapper>
    </Layout>
  );
};

export const query = graphql`
  query ShowVideos($show_id: Int!) {
    allGiantBombVideo(filter: { video_show: { id: { eq: $show_id } } }) {
      edges {
        node {
          id
          name
          slug
          season
          image {
            medium_url
          }
          embed_player
          video_show {
            id
          }
          associations {
            id
            name
          }
        }
      }
    }
    allGiantBombShowSeason(filter: { show_id: { eq: $show_id } }) {
      edges {
        node {
          id
          show_id
          name
        }
      }
    }
  }
`;

export default Show;
