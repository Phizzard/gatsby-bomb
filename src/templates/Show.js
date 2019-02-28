import React, { useState, useEffect } from "react";
import injectSheet from "react-jss";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import VideoPlayer from "../components/videoPlayer";
import Videos from "../components/videos";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  seasons: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "35%"
  },
  season: {
    transition: ".1s ease-in",
    textAlign: "center",
    padding: ".25rem 0",
    marginBottom: "1rem",
    border: "3px solid #fff",
    borderRadius: ".15rem",
    cursor: "pointer",
    "&:hover": {
      color: "#242628",
      backgroundColor: "#fff"
    },
    "& h4": {
      margin: 0
    }
  }
};
export default injectSheet(styles)(({ classes, pageContext, data }) => {
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
      <div className={classes.wrapper}>
        <div className={classes.seasons}>
          {data.allGiantBombShowSeason.edges
            .map(({ node }) => (
              <div
                key={node.id}
                className={classes.season}
                onClick={() => setSeason(node.name)}
              >
                <h4>{node.name}</h4>
              </div>
            ))
            .reverse()}
        </div>
        <Videos flexBasis="60%" data={videos} />
      </div>
    </Layout>
  );
});

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
