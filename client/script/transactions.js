window.onload = function(){
  document.getElementById('backToHome').onclick=function(){
    window.location = '/';
  };

  getTransaction();
};


function getTransaction() {
  var transactionReq = new XMLHttpRequest();
  transactionReq.onreadystatechange = function() {
    if(transactionReq.readyState === 4 && transactionReq.status === 200) {
      var allTransactions = JSON.parse(transactionReq.responseText);
      console.log('transactionArr from request is', allTransactions);
      showTransactions(allTransactions);
    }
  }

  transactionReq.open('GET', '/getTransactions', true);
  transactionReq.send();
}

function showTransactions(allTransactions) {
  var targetTable = document.getElementById('transactionTable');
  var targetLen = allTransactions.length;
  for(var i = 0; i < targetLen; i++) {
    var tableRow = targetTable.insertRow(0);
    var cellTime = tableRow.insertCell(0);
    var cellRecipient = tableRow.insertCell(1);
    var cellAmount = tableRow.insertCell(2);

    cellTime.innerHTML = new Date(allTransactions[i].timestamp).toLocaleDateString();
    cellRecipient.innerHTML = allTransactions[i].name;
    cellAmount.innerHTML = allTransactions[i].amount;
  }
}
