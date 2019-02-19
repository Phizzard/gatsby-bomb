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
  const [seasons, setSeasons] = useState(new Set());
  const [season, setSeason] = useState(null);

  // initialize seasons list
  useEffect(() => {
    if (!seasons.length) {
      const videos = [...data.allGiantBombVideo.edges];
      let newSeasons = new Set();

      videos.forEach(({ node }) => {
        let season =
          node.associations &&
          node.associations.length > 0 &&
          node.associations[0].name;
        if (season) newSeasons.add(season);
      });

      setSeasons(newSeasons);
    }
  }, [data.allGiantBombVideo.edges]);

  // initialize & handle video list
  useEffect(() => {
    let filteredVideos = [...data.allGiantBombVideo.edges];

    if (season) {
      filteredVideos = filteredVideos.filter(
        ({ node }) =>
          node.associations &&
          node.associations.length > 0 &&
          node.associations[0].name === season
      );
    } else {
      setSeason(seasons[0]);
    }

    setVideos(filteredVideos);
  });

  return (
    <Layout>
      <VideoPlayer
        title={videos.length && videos[0].node.name}
        src={videos.length && videos[0].node.embed_player}
      />
      <h1>{title}</h1>
      <div className={classes.wrapper}>
        <div className={classes.seasons}>
          {Array.from(seasons, item => (
            <div
              key={item}
              className={classes.season}
              onClick={() => setSeason(item)}
            >
              <h4>{item}</h4>
            </div>
          ))}
        </div>
        <Videos flexBasis="60%" data={videos} />
      </div>
    </Layout>
  );
});

export const query = graphql`
  query ShowVideos($show_id: Int!) {
    allGiantBombVideo(
      filter: { video_show: { id: { eq: $show_id } } }
      limit: 9999
    ) {
      edges {
        node {
          id
          name
          slug
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
  }
`;
