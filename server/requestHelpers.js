'use strict';

var request = require('request');
var url = require('url');
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
    transactionCache = JSON.parse(body);
  }
}

function getTransactions(req, res) {
  // get the url query string
  var query = url.parse(req.url, true).query;
  var start = parseInt(query.startIndex);
  var end = parseInt(query.endIndex);

  var transactionCopy;
  transactionCopy = transactionCache.slice(transactionCache.length - start, transactionCache.length - end);

  // console.log('transactionCopy is ', transactionCopy);
  res.setHeader('Content-Type', 'application/json');
  res.send(transactionCopy);
}

exports.initGetTransactions = initGetTransactions;
exports.getTransactions = getTransactions;