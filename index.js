'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/client'));

app.listen(9000, function() {
  console.log('✔ Express server listening on port 9000.');
});

