'use strict';

var express = require('express');
var app = express();
var requestHelpers = require('./server/requestHelpers.js');

app.use(express.static(__dirname + '/client'));

app.get('/getTransactions', requestHelpers.getTransactions);

app.listen(9000, function() {
  console.log('✔ Express server listening on port 9000.');
});

