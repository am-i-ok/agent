const posix = require("path");

const getUrl = (api, host = "localhost:3000") => {
  let origin = host || process.env.HOST;
  if (!origin.startsWith("http")) {
    origin = `http://${origin}`;
  }

  const url = new URL(origin);
  const [path, search = ""] = api.split("?");
  url.pathname = posix.join(url.pathname, path);
  url.search = search;
  return url.toString();
};

module.exports = {
  getUrl,
};
