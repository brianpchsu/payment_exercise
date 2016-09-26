window.onload = function(){
  document.getElementById('clearInput').onclick = resetForm;

  document.getElementById('transferMoney').onclick = submitMoneyForm;

  document.getElementById('backToHome').onclick = routeToHome;

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
  var email = document.moneyForm.recipient.value;
  var amount = document.moneyForm.amount.value;
  var message = document.moneyForm.message.value;
  var transactionType = document.querySelector('input[name="paymentType"]:checked').value;

  if (checkValidEmail(email) && parseFloat(amount) > 0) {
    // assemble the param and decorate the url
    var params = generateParams(email, amount, message, transactionType);
    var url = document.getElementById("moneyForm").action + params;
    var submitFormReq = new XMLHttpRequest();

    var spinnerObj = document.getElementById("spinner");
    submitFormReq.onreadystatechange = function processHttpResponse() {
      if (submitFormReq.readyState === 1) {
        // TODO: maybe add the transition time to 0.5s to at least see the transition for better UX
        // Show the hidden spinner
        spinnerObj.style.display = 'block';
      }
      if (submitFormReq.readyState === 4 && submitFormReq.status === 201) {
        // hide the spinner
        console.log('Returned from server ');
        document.getElementById("sentAmount").innerHTML = amount;
        document.getElementById("sentPerson").innerHTML = email;

        document.getElementById("successSection").style.display = 'block';
        document.getElementById("sendMoneySection").style.display = 'none';
        spinnerObj.style.display = 'none';
      }
    }
    submitFormReq.open('POST', url, true);
    submitFormReq.send();
  } else {
    alert('Please enter valid email address and amount.');
  }

};

function initEmailCheck() {
  var emailInput = document.moneyForm.recipient;
  emailInput.onchange = function() {
    var email = emailInput.value;
    if (checkValidEmail(email)) {
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
  if (moneyAmount < 0) {
    amountInput.className = 'invalidInput';
  } else {
    // correct the input amount to 2 decimal points
    document.moneyForm.amount.value = Number(moneyAmount).toFixed(2);
    amountInput.className = 'validInput';
  }
 };
}

function generateParams(email, amount, message, transactionType) {
  return '?email=' + email + '&amount=' + amount + '&message=' + message + '&type=' + transactionType;
}

function routeToHome(){
  window.location = '/';
}
