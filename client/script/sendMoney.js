window.onload = function(){
  document.getElementById('clearInput').onclick = function(){
    // get all the element and clear all their content
    document.getElementById('moneyForm').reset();
  };

  document.getElementById('transferMoney').onclick = function(){
    // post form to server
  };

  // check valid email
  var emailInput = document.moneyForm.recipient;
  emailInput.onchange = function() {
    var email = emailInput.value;
    console.log('email is ', email);

    if(checkValidEmail(email)) {
      console.log('valid email');
      emailInput.className = 'validInput';
      var checkMarkIcon = document.getElementById('checkmark');
      checkMarkIcon.style.visibility = 'visible';
    } else {
      console.log('Invalid email');
      emailInput.className = 'invalidInput';
      var checkMarkIcon = document.getElementById('checkmark');
      checkMarkIcon.style.visibility = 'hidden';
    }
  };

};

// Use regular expressions to check email, ref: http://stackoverflow.com/a/46181/3525493
function checkValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
