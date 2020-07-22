/* eslint-disable no-unused-vars */
const express = require('express');
const app = express();
const cors  = require('cors');

const personRouter = require('./controllers/Persons.js');
const middleware = require('./utils/middleware.js');
const logger = require('./utils/logger');
const config = require('./utils/config.js');


const mongoose = require('mongoose');

logger.info('connecting to ', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(result => {
    logger.info('connected to MongoDB');
  }).catch((error => {
    logger.info('error connecting to MongoDB',  error.message);
  }));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.morgan_logger);

app.use('', personRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;