/* eslint-disable no-unused-vars */
const config = require('./utils/config.js');
const express = require('express');
const personRouter = require('./controllers/Persons.js');
const middleware = require('./utils/middleware.js');
const logger = require('./utils/logger');
const cors  = require('cors');
const app = express();
var morgan = require('morgan');

const mongoose = require('mongoose');
logger.info('connecting to ', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(result => {
    logger.info('connected to MongoDB');
  }).catch((error => {
    logger.info('error connecting to MongoDB',  error.message);
  }));

morgan.token('bodydata', (req , res) => {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use('', personRouter);
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodydata'));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;