$(document).ready(function() {
  // renderSignUpForm();
});

const renderSignUpForm = function() {
  console.log("inside render signup");
  document.querySelector("#form-append").innerHTML = `
  <form id="form-sign-up" oninput='up2.setCustomValidity(up2.value != up.value ? "Passwords do not match." : "")'><h2>Sign Up</h2><div class="form-group"><label for="exampleInputEmail1"></label><input type="text" class="form-control" id="userName" placeholder="Enter username"/></div><div class="form-group"><label for="exampleInputEmail1"></label><input type="email" class="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email"/></div><div class="form-group"><label for="userPassword"></label><input type="password" class="form-control" id="userPassword" placeholder="Enter Password" required name="up"/></div><div class="form-group"><label for="userPassword2"></label><input type="password" class="form-control" id="userPassword2" placeholder="Re-enter Password" name="up2"/></div><div class="form-group"><label for="exampleInputEmail1"></label><input type="text"class="form-control" id="userLocation" placeholder="Tell us what country you live in."/></div><button type="submit" class="btn btn-primary">Create Account</button><div class="g-signin2" data-onsuccess="onSignIn"></div></form>
  `;
};

const renderUserBucketMain = function() {};

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");
  });
}

$("#use-current").click(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      axios
        .get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            latlng: position.coords.latitude + "," + position.coords.longitude,
            key: "AIzaSyCtSbsFjj6trQtrUAd2xuDav76iXNZZEno"
          }
        })
        .then(function(response) {
          console.log(response.data.results[7].formatted_address);
        })
        .catch(function(err) {
          console.log(err);
        });
    });
  }
});
