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
      var transactionArr = JSON.parse(transactionReq.responseText);
      console.log('transactionArr from request is', transactionArr);
    }
  }

  transactionReq.open("GET", "/getTransactions", true);
  transactionReq.send();
}
