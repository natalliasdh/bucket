$(document).ready(function() {
  // renderSignUpForm();
  $(".add-new-bucket").on("click", renderModal);
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

// render modal
const renderModal = function() {
  console.log("add new bucket");
  $("#new-bucket-modal").modal();
  document.querySelector(".modal-body").innerHTML = `
  <form>
      <div class= "form-group">
        <input id="list-title" class="form-control" type="text" placeholder="Bucket Title">
      </div>
      <div class="form-group">
        <label for="list-category">Category</label>
        <select class="form-control" id="list-category">
          <option>Travel</option>
          <option>Adventure</option>
          <option>Educational</option>
          <option>Family</option>
          <option>Volunteer</option>
          <option>Financial</option>
          <option>Health</option>
          <option>Personal</option>
        </select>
      </div>
      <div class= "form-group">
        <input id="list-img" class="form-control" type="text" placeholder="Img URL">
      </div>
  </form>
  `;

  
};
