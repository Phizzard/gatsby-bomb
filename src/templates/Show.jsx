import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Layout from "../components/layout";
import { graphql } from "gatsby";
//import { VideoPlayer } from "../components/VideoPlayer";
import { Videos } from "../components/Videos";
import { MenuItem } from "../components/MenuItem";
import { MdReorder } from "react-icons/md";

const Show = ({ pageContext, data }) => {
  const { title, image } = pageContext;
  const [videos, setVideos] = useState([]);
  const [season, setSeason] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

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
  }, [season]);

  return (
    <Layout>
      {/*<VideoPlayer
        title={videos.length && videos[0].node.name}
        src={videos.length && videos[0].node.embed_player}
      />*/}
      <Wrapper>
        <SeasonsMenu expand={isExpanded}>
          <MenuHeader>
            <img src={image.medium_url} alt={title} />
          </MenuHeader>
          {data &&
            data.allGiantBombShowSeason &&
            data.allGiantBombShowSeason.edges &&
            data.allGiantBombShowSeason.edges.length &&
            data.allGiantBombShowSeason.edges
              .map(({ node }) => (
                <MenuItem
                  key={node.id}
                  onClick={() => {
                    setSeason(node.name);
                    setIsExpanded(false);
                  }}
                >
                  {node.name}
                </MenuItem>
              ))
              .reverse()}
        </SeasonsMenu>
        <SeasonVideos data={videos} />
      </Wrapper>
      <SeasonButton onClick={() => setIsExpanded(!isExpanded)}>
        <MdReorder />
      </SeasonButton>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`;

const SeasonsMenu = styled.div`
  position: fixed;
  background-color: #000;
  left: ${props => (props.expand ? "0" : "-150%")};
  display: flex;
  flex-direction: column;
  z-index: 9999;
  transition: ease-in 0.3s;
  top: 0;
  bottom: 0;
  @media screen and (min-width: ${props => props.theme.screens.tablet}) {
    position: relative;
    left: 0;
    flex-basis: 30%;
  }
`;

const SeasonVideos = styled(Videos)`
  padding: 0;
  @media screen and (min-width: ${props => props.theme.screens.tablet}) {
    padding: 0 1rem;
  }
`;

const SeasonButton = styled.button`
  position: fixed;
  background-color: #fff;
  border: none;
  padding: 0.6rem;
  margin: 0;
  right: 3rem;
  bottom: 3rem;
  line-height: 0;
  z-index: 9999;
  border-radius: 50%;
  box-shadow: 2px 2px 13px -1px rgba(0, 0, 0, 1);
  svg {
    font-size: 1.5rem;
  }
  @media screen and (min-width: ${props => props.theme.screens.tablet}) {
    display: none;
  }
`;

const MenuHeader = styled.div`
  img {
    height: 100%;
    width: 100%;
  }
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
            super_url
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
