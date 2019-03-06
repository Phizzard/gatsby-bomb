import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { VideoPlayer } from "../components/VideoPlayer";
import { Videos } from "../components/Videos";
import { MenuItem } from "../components/MenuItem";
import Sticky from "react-sticky-el";

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
      {/*<VideoPlayer
        title={videos.length && videos[0].node.name}
        src={videos.length && videos[0].node.embed_player}
      />*/}
      <h1>{title}</h1>
      <Wrapper>
        <SeasonsMenu
          holderProps={{
            style: {
              flexBasis: "30%"
            }
          }}
        >
          {data &&
            data.allGiantBombShowSeason &&
            data.allGiantBombShowSeason.edges &&
            data.allGiantBombShowSeason.edges.length &&
            data.allGiantBombShowSeason.edges
              .map(({ node }) => (
                <MenuItem key={node.id} onClick={() => setSeason(node.name)}>
                  {node.name}
                </MenuItem>
              ))
              .reverse()}
        </SeasonsMenu>
        <Videos flexBasis="60%" data={videos} />
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const SeasonsMenu = styled(Sticky)`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  width: 100%;
`;

export const query = graphql`
  query ShowVideos($show_id: Int!) {
    allGiantBombVideo(filter: { video_show: { id: { eq: $show_id } } }) {
      edges {
        node {
          id
          name
          slug
          season
          deck
          image {
            medium_url
            small_url
          }
          embed_player
          length_seconds
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
