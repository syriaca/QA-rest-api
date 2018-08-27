'use strict';

const express = require('express');
const routes = require('./routes');
const jsonParser = require('body-parser').json;
const logger = require('morgan');
const app = express();

app.use(logger('dev'));
app.use(jsonParser());

app.use('/questions', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Express server is listening on port', port)
});