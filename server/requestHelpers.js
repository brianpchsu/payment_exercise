'use strict';

var request = require('request');
var transactionCache;

function initGetTransactions() {
  if(!transactionCache) {
    // TODO: constant-ize the url
    request.get('http://beta.json-generator.com/api/json/get/4kFdw7gpb', processTransactionRes);
  }
}

function processTransactionRes(error, response, body) {
  if (error) {
    console.error('Request transaction failed! Error is: ', error);
  }
  if (!error && response.statusCode == 200) {
    console.log('In init, save transaction to cache');
    transactionCache = body;
  }
}

function getTransactions(req, res) {
  console.log('call getTransactions');
  if (transactionCache) {
    res.setHeader('Content-Type', 'application/json');
    res.send(transactionCache);
  } else {
    // TODO: Refactor the code to make it clean (DRY)
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

exports.initGetTransactions = initGetTransactions;
exports.getTransactions = getTransactions;
