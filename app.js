'use strict';

const express = require('express');
const jsonParser = require('body-parser').json;
const app = express();

app.use(jsonParser());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Express server is listening on port', port)
});