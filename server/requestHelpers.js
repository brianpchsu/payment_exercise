'use strict';

var request = require('request');
var transactionCache;

function getTransactions(req, res) {
  console.log('call getTransactions');
  if (transactionCache) {
    res.send(transactionCache);
  } else {
    request.get('http://beta.json-generator.com/api/json/get/4kFdw7gpb',
      sendTransactionResponse.bind(undefined, res));
  }
}

function sendTransactionResponse(res, error, response, body) {
  console.log('make http call to transaction');
  if (error) {
    console.error('Request transaction failed! Error is: ', error);
    res.status(404).end();
  }
  if (!error && response.statusCode == 200) {
    transactionCache = body;
    res.setHeader('Content-Type', 'application/json');
    res.send(body);
  }
}

exports.getTransactions = getTransactions;
