'use strict';

var express = require('express');
var app = express();
var requestHelpers = require('./server/requestHelpers.js');

requestHelpers.initGetTransactions();
app.use(express.static(__dirname + '/client'));

app.get('/getTransactions', requestHelpers.getTransactions);

app.post('/submitPayment', requestHelpers.processPayment);

app.listen(9000, function() {
  console.log('✔ Express server listening on port 9000.');
});

