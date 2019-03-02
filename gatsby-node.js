/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const axios = require("axios");
const path = require("path");
const getYear = require("date-fns/get_year");
const getQuater = require("date-fns/get_quarter");

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const API_KEY = "09dc277eefa643ac45893ff6e2812e12a0335fd6";
  const { createNode } = actions;
  let showIds = [];

  const processShow = show => {
    show.slug = show.site_detail_url
      .replace("https://www.giantbomb.com/shows/", "")
      .slice(0, show.site_detail_url.length - 1);
    const nodeId = createNodeId(`giantbomb-show-${show.id}`);
    const nodeContent = JSON.stringify(show);
    const nodeData = Object.assign({}, show, {
      id: nodeId,
      show_id: show.id,
      parent: null,
      children: [],
      internal: {
        type: `GiantBombShow`,
        content: nodeContent,
        contentDigest: createContentDigest(show)
      }
    });

    showIds.push(show.id);
    return nodeData;
  };

  const { data } = await axios.get(
    "https://www.giantbomb.com/api/video_shows",
    {
      params: {
        format: "json",
        api_key: API_KEY,
        limit: 10 // Temporary limit while developing
      }
    }
  );

  data.results.forEach(show => {
    const nodeData = processShow(show);
    createNode(nodeData);
  });

  const processVideo = video => {
    video.slug = video.site_detail_url
      .replace("https://www.giantbomb.com/videos/", "")
      .slice(0, video.site_detail_url.length - 1);
    video.season = `${getYear(video.publish_date)} - Q${getQuater(
      video.publish_date
    )}`;
    const nodeId = createNodeId(`giantbomb-video-${video.id}`);
    const nodeContent = JSON.stringify(video);
    const nodeData = Object.assign({}, video, {
      id: nodeId,
      video_id: video.id,
      parent: null,
      children: [],
      internal: {
        type: `GiantBombVideo`,
        content: nodeContent,
        contentDigest: createContentDigest(video)
      }
    });

    const season = {
      name: video.season,
      show_id: video.video_show.id
    };
    const seasonNodeId = createNodeId(
      `giantbomb-show-season-${season.name}-${season.show_id}`
    );
    const seasonNodeContent = JSON.stringify(season);

    createNode(
      Object.assign({}, season, {
        id: seasonNodeId,
        parent: null,
        children: [],
        internal: {
          type: `GiantBombShowSeason`,
          content: seasonNodeContent,
          contentDigest: createContentDigest(season)
        }
      })
    );

    return nodeData;
  };

  let allShowVideos = [];

  for (let i = 0; i < showIds.length; i++) {
    const showVideos = await axios.get("https://www.giantbomb.com/api/videos", {
      params: {
        format: "json",
        api_key: API_KEY,
        filter: `video_show:${showIds[i]}`
      }
    });

    if (showVideos.data.results)
      allShowVideos = allShowVideos.concat(showVideos.data.results);
  }

  allShowVideos.forEach(video => {
    const nodeData = processVideo(video);
    createNode(nodeData);
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const giantBombShowTemplate = path.resolve("src/templates/Show.jsx");

  const result = await graphql(`
    {
      allGiantBombShow {
        edges {
          node {
            id
            show_id
            title
            slug
            image {
              screen_url
              screen_large_url
            }
            premium
          }
        }
      }
    }
  `);

  result.data.allGiantBombShow.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: giantBombShowTemplate,
      context: node
    });
  });
};
