const axios = require("axios");

const livenessReport = async (name, location) => {
  // TODO upsert new agent
  try {
    await axios.put("../api/agent", {
      name,
      location,
    });
  } catch (error) {
    throw new Error(
      `could not report liveness for agent ${name} at ${location} caused by ${error}`
    );
  }
};
const main = () => {
  setInterval(livenessReport, 5000);
};

module.exports = {
  main,
};
