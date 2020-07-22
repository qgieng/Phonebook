const morgan = require('morgan');


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }else if(error.name === 'ValidationError'){
    return response.status(404).send({
      error: error.message
    });
  }
  next(error);
};

morgan.token('bodydata', (req , res) => {
  return JSON.stringify(req.body);
});

const morgan_logger = morgan(':method :url :status :res[content-length] - :response-time ms :bodydata');

module.exports = {
  unknownEndpoint,
  errorHandler,
  morgan_logger
};