window.onload = function(){
  document.getElementById('clearInput').onclick = resetForm;

  document.getElementById('transferMoney').onclick = submitMoneyForm;

  initEmailCheck();
  initAmountCheck();
};

function resetForm(){
  // get all the element and clear all their content
  document.getElementById('moneyForm').reset();
  var checkMarkIcon = document.getElementById('checkmark');
  checkMarkIcon.style.visibility = 'hidden';
}

function submitMoneyForm() {
  // post form to server

};

function initEmailCheck() {
  var emailInput = document.moneyForm.recipient;
  emailInput.onchange = function() {
    var email = emailInput.value;
    if(checkValidEmail(email)) {
      emailInput.className = 'validInput';
      var checkMarkIcon = document.getElementById('checkmark');
      checkMarkIcon.style.visibility = 'visible';
    } else {
      emailInput.className = 'invalidInput';
      var checkMarkIcon = document.getElementById('checkmark');
      checkMarkIcon.style.visibility = 'hidden';
    }
  };
}

// Use regular expressions to check email, ref: http://stackoverflow.com/a/46181/3525493
function checkValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function initAmountCheck() {
 var amountInput = document.moneyForm.amount;
 amountInput.onchange = function() {
  var moneyAmount = amountInput.value;
  if(moneyAmount < 0) {
    amountInput.className = 'invalidInput';
    // document.moneyForm.amount.value = 0;
  } else {
    amountInput.className = 'validInput';
  }
 };
}
