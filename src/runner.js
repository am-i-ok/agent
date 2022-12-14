const _ = require("lodash");
const axios = require("axios");

const currentChecks = {};

const reportToPlatform = (myCheck, status) =>
  axios.post(`http://localhost:3000/api/check/report`, {
    name: myCheck.name,
    status,
  });

const runCheck = async (myCheck) => {
  try {
    await axios.get(myCheck.endpoint);
    return reportToPlatform(myCheck, "healthy");
  } catch (err) {
    return reportToPlatform(myCheck, "unhealthy");
  }
};

const getNewChecks = async () => {
  const { data } = await axios.get("http://localhost:3000/api/check");
  const myChecks = _.filter(data, (c) =>
    _.find(c.agents, (a) => a.name === process.env.NAME)
  );

  _.forEach(myChecks, (myCheck) => {
    if (!currentChecks[myCheck.name]) {
      currentChecks[myCheck.name] = myCheck;
      setInterval(() => {
        runCheck(myCheck);
      }, parseInt(myCheck.interval, 10) * 1000);
    }
  });
};

const main = () => {
  setInterval(getNewChecks, 5000);
};

module.exports = {
  main,
};
