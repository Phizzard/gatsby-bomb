/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const axios = require("axios");

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;

  const processShow = show => {
    const nodeId = createNodeId(`giantbomb-show-${show.id}`);
    const nodeContent = JSON.stringify(show);
    const nodeData = Object.assign({}, show, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `GiantBombShow`,
        content: nodeContent,
        contentDigest: createContentDigest(show)
      }
    });

    return nodeData;
  };

  const { data } = await axios.get(
    "https://www.giantbomb.com/api/video_shows",
    {
      params: {
        format: "json",
        api_key: "09dc277eefa643ac45893ff6e2812e12a0335fd6"
      }
    }
  );

  data.results.forEach(show => {
    const nodeData = processShow(show);
    createNode(nodeData);
  });
};
