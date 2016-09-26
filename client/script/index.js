window.onload = function(){
  document.getElementById('sendMoney').onclick = function routeToSendMoney() {
    window.location = '/sendMoney.html';
  };
  document.getElementById('transHistory').onclick = function routeToTransaction() {
    window.location = '/transactions.html';
  };
};
