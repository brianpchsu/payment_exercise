var startIndex = 20;
var endIndex = 0;
var isFetchingData = false;
var topWindowY = 0;
var scrollDown = false;
var lastRequestTimeStamp;

window.onload = function() {
  document.getElementById('backToHome').onclick = routeToHome;

  getTransactions();

  window.onscroll = monitorScroll;
};

function routeToHome(){
  window.location = '/';
}

function getTransactions() {
  console.log('get new transactions!!');
  var transactionReq = new XMLHttpRequest();
  transactionReq.onreadystatechange = function processHttpResponse() {
    if(transactionReq.readyState === 4 && transactionReq.status === 200) {
      var allTransactions = JSON.parse(transactionReq.responseText);
      console.log('transactionArr from request is', allTransactions);
      showTransactions(allTransactions);
    }
  }

  transactionReq.open('GET', '/getTransactions?startIndex='+startIndex+'&endIndex='+endIndex, true);
  transactionReq.send();
  // update the start and end index for next scroll
  endIndex = startIndex;
  startIndex += 20;
}



function monitorScroll() {
  var transactionTable = document.getElementById("transactionTable");
  if(window.scrollY > topWindowY) {
    scrollDown = true;
    topWindowY = window.scrollY;
  } else {
    scrollDown = false;
  }

  // when user reaches to 70% of the table data, get next 20 records
  if (scrollDown && window.scrollY > transactionTable.offsetHeight * 0.7 && !isFetchingData && checkTrottle()) {
    // set isFetchingData to true to prevent multiple http calls before one result get inserted to table
    isFetchingData = true;
    getTransactions();
    // update last req time
    lastRequestTimeStamp = new Date();
  }
}

function showTransactions(allTransactions) {
  var targetTable = document.getElementById('transactionTable');
  var responseLength = allTransactions.length;

  for(var i = responseLength -1 ; i >= 0; i--) {
    // insert record to the end of the table
    var tableRow = targetTable.insertRow(-1);
    var cellTime = tableRow.insertCell(0);
    var cellRecipient = tableRow.insertCell(1);
    var cellAmount = tableRow.insertCell(2);

    cellTime.innerHTML = new Date(allTransactions[i].timestamp).toLocaleDateString();
    cellRecipient.innerHTML = allTransactions[i].name;
    cellAmount.innerHTML = allTransactions[i].amount;
  }
  // if respone contains record, toggle isFetchingData back to false for next fetch
  // if there is no data in response, then keep the isFetchingData true to prevent multiple unnecessary calls (not ideal)
  // TODO: refactor this logic to consider all the edge cases
  if(responseLength > 0) {
    // update boolean to allow next fetch
    isFetchingData = false;
  }
}

function checkTrottle() {
  var current = new Date();
  return current - checkTrottle > 500;
}
