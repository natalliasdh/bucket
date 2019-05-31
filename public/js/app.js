$(document).ready(function() {
  renderSignUpForm();
});

const renderSignUpForm = function() {
  console.log("inside render signup");
  document.querySelector("#form-append").innerHTML = `
  <form id="form-sign-up" oninput='up2.setCustomValidity(up2.value != up.value ? "Passwords do not match." : "")'><h2>Sign Up</h2><div class="form-group"><label for="exampleInputEmail1"></label><input type="text" class="form-control" id="userName" placeholder="Enter username"/></div><div class="form-group"><label for="exampleInputEmail1"></label><input type="email" class="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email"/></div><div class="form-group"><label for="userPassword"></label><input type="password" class="form-control" id="userPassword" placeholder="Enter Password" required name="up"/></div><div class="form-group"><label for="userPassword2"></label><input type="password" class="form-control" id="userPassword2" placeholder="Re-enter Password" name="up2"/></div><div class="form-group"><label for="exampleInputEmail1"></label><input type="text"class="form-control" id="userLocation" placeholder="Tell us what country you live in."/></div><button type="submit" class="btn btn-primary" id="userAdd">Create Account</button></form>
  `;
};

const renderUserBucketMain = function() {};
