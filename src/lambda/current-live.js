const axios = require("axios");

exports.handler = async (event, context) => {

  const {
    data
  } = await axios.get("https://www.giantbomb.com/api/video/current-live", {
    params: {
      api_key: "09dc277eefa643ac45893ff6e2812e12a0335fd6"
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};