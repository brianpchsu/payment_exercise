'use strict';

var request = require('request');
var url = require('url');
var transactionCache;

function initGetTransactions() {
  if(!transactionCache) {
    // TODO: constant-ize the url
    request.get('http://beta.json-generator.com/api/json/get/VJludYZTb', processTransactionRes);
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
  // checks to make sure the indexes won't go out of boundary
  var copyStart = transactionCache.length - start >= 0 ? transactionCache.length - start : 0;
  var coptyEnd = transactionCache.length - end >= 0 ? transactionCache.length - end : 0;
  transactionCopy = transactionCache.slice(copyStart, coptyEnd);

  res.setHeader('Content-Type', 'application/json');
  res.send(transactionCopy);
}

function processPayment(req, res) {
  var transaction = url.parse(req.url, true).query;
  var currentTime = new Date().toISOString();
  transaction.timestamp = currentTime;
  // Use the email as name for new transaction for now
  transaction.name = transaction.email;
  // TODO: Refactor the transaction object to have consistent format
  // add the processed transaction to the transaciton records
  transactionCache.push(transaction);
  res.setHeader('Content-Type', 'application/json');
  res.sendStatus(201);

}

exports.initGetTransactions = initGetTransactions;
exports.getTransactions = getTransactions;
exports.processPayment = processPayment;
