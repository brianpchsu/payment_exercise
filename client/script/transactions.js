var startIndex = 20;
var endIndex = 0;
var isFetchingData = false;
var topWindowY = 0;
var scrollDown = false;
var count = 1;

window.onload = function(){
  document.getElementById('backToHome').onclick=function(){
    window.location = '/';
  };

  getTransactions();

  window.onscroll = monitorScroll;
};

function getTransactions() {
  console.log('get new transactions!!');
  var transactionReq = new XMLHttpRequest();
  transactionReq.onreadystatechange = function() {
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
  // when user reach to 70% of the table data, get next 20 records

  if(window.scrollY > topWindowY) {
    scrollDown = true;
    topWindowY = window.scrollY;
  } else {
    scrollDown = false;
  }
  if (scrollDown && window.scrollY > transactionTable.offsetHeight * 0.7 && !isFetchingData) {
    // set isFetchingData to true to prevent fetch multiple before data gets inserted to table
    isFetchingData = true;
    getTransactions();
  }
}

function showTransactions(allTransactions) {
  var targetTable = document.getElementById('transactionTable');
  var targetLen = allTransactions.length;

  for(var i = targetLen -1 ; i >= 0; i--) {
    // insert record to the end of the table
    var tableRow = targetTable.insertRow(-1);
    var cellTime = tableRow.insertCell(0);
    var cellRecipient = tableRow.insertCell(1);
    var cellAmount = tableRow.insertCell(2);

    cellTime.innerHTML = new Date(allTransactions[i].timestamp).toLocaleDateString();
    cellRecipient.innerHTML = allTransactions[i].name;
    cellAmount.innerHTML = '$' + allTransactions[i].amount;
    console.log('count is ', count++);
  }
  // update boolean to allow next fetch
  isFetchingData = false;
}
