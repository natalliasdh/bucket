$(document).ready(function() {
  $("#userAdd").on("click", function(event) {
    event.preventDefault();
    var nameInput = $("#userName").val();
    var emailInput = $("#userEmail").val();
    var passwordInput = $("#userPassword").val();
    var locationInput = $("#userLocation").val();
    var idUser;
    var nameUser;
    console.log(nameInput);
    var userUp = {
      name: nameInput,
      email: emailInput,
      password: passwordInput,
      location: locationInput
    };

    $.get("/api/users", function(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name == nameInput.toLowerCase()) {
          console.log("The user with this login already exists!");
          return false;
        }
      }

      addUser();
    });

    function addUser() {
      $.post("/api/users", userUp, function() {}).then(getId);
    }

    function getId() {
      console.log("name input", nameInput);
      $.get("/api/names/" + nameInput, function(data) {
        idUser = data.id;
        nameUser = data.name;
        localStorage.setItem("ID", data.id);
        localStorage.setItem("name", data.name);
        console.log(localStorage.getItem("ID"));

        //console.log(data);
      }).then(profile);
    }
  });

  function profile() {
    window.location.assign("/profile");
    //  $(window).load(view);
  }

  $("#signIn").on("click", function(event) {
    event.preventDefault();
    console.log("sign in clicked");
    var nameExist = $("#nameExist").val();
    var passwordExist = $("#passwordExist").val();

    var userAuth = {
      name: nameExist,
      password: passwordExist
    };
    console.log("userAuth", userAuth);
    $.post("/api/login", userAuth, function() {
      window.location.href = "/profile";
    }).then(function(data) {
      console.log(data);
      localStorage.setItem("ID", data.id);
      localStorage.setItem("name", data.name);
      localStorage.setItem("token", data.token);
    });

    // $.get("/api/users", function (data) {
    //     console.log("data", data);

    //     for (let i = 0; i < data.length; i++) {
    //         if (data[i].name == nameExist && data[i].password == passwordExist) { localStorage.setItem("ID", data[i].id); localStorage.setItem("name", data[i].name); profile(); return }

    //     };
    //     console.log("username or password does not exist");

    // }).then();
  });
});
