const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { sendErrorResponse } = require("./server/error-handling/error-handler");
const healthCheck = require("./src/healthcheck");
const runner = require("./src/runner");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(sendErrorResponse);

async function main() {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  healthCheck.main();
  runner.main();
}

main().catch((err) => {
  console.log(err);
  console.log("exiting");
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error(err.stack);
  process.exit(1);
});
