import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import VideoPlayer from "../components/videoPlayer";

export default ({ pageContext, data }) => {
  const { title } = pageContext;

  return (
    <Layout>
      <VideoPlayer
        title={
          data.allGiantBombVideo && data.allGiantBombVideo.edges[0].node.name
        }
        src={
          data.allGiantBombVideo &&
          data.allGiantBombVideo.edges[0].node.embed_player
        }
      />
      <h1>{title}</h1>
      <ul>
        {data.allGiantBombVideo &&
        data.allGiantBombVideo.edges &&
        data.allGiantBombVideo.edges.length ? (
          data.allGiantBombVideo.edges.map(({ node }) => (
            <li key={node.slug}>{node.name}</li>
          ))
        ) : (
          <li key={"blank-item"}>No Videos here duder...</li>
        )}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query ShowVideos($show_id: Int!) {
    allGiantBombVideo(filter: { video_show: { id: { eq: $show_id } } }) {
      edges {
        node {
          name
          slug
          embed_player
          video_show {
            id
          }
        }
      }
    }
  }
`;
