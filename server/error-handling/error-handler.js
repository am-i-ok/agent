// eslint-disable-next-line no-unused-vars
const sendErrorResponse = (error, request, response, next) => {
  console.error(error.stack);
  const status = error.status ?? 500;
  response.status(status).send({
    error,
    description: error.toString(),
  });
};

module.exports = {
  sendErrorResponse,
};
