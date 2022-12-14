const axios = require("axios");
const helper = require("./helper");

const livenessReport = async () => {
  const name = process.env.AGENT_NAME;
  const icon = process.env.AGENT_ICON;
  try {
    const newAgent = await axios.put(helper.getUrl(`/api/agent/${name}`), {
      name,
      icon,
    });
    console.log(newAgent.data);
  } catch (error) {
    throw new Error(
      `could not report liveness for agent ${name} caused by ${error}`
    );
  }
};
const main = () => {
  setInterval(livenessReport, 1000);
};

module.exports = {
  main,
};
