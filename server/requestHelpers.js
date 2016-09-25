'use strict';

var request = require('request');

function getTransactions(req, res) {
  console.log('call getTransactions');
  request.get('http://beta.json-generator.com/api/json/get/4kFdw7gpb', function (error, response, body) {
    if (error) {
      console.error('Request transaction failed! Error is: ', error);
      res.status(404).end();
    }
    if (!error && response.statusCode == 200) {
      res.setHeader('Content-Type', 'application/json');
      res.send(body);
    }
  })
}

exports.getTransactions = getTransactions;
