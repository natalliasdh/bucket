$(document).ready(function () {


    $("#userAdd").on("click", function (event) {
        event.preventDefault();
        var nameInput = $("#userName").val();
        var emailInput = $("#userEmail").val();
        var passwordInput = $("#userPassword").val();
        var locationInput = $("#userLocation").val();
        var idUser;
        console.log(nameInput);
        var userUp = {
            name: nameInput,
            email: emailInput,
            password: passwordInput,
            location: locationInput
        };
        $.post("/api/users", userUp, function () {

        }).then(getId);



        function getId() {
            console.log("name input", nameInput);
            $.get("/api/names/" + nameInput, function (data) {
                idUser = data.id;
                localStorage.setItem("ID", data.id);
                console.log(localStorage.getItem("ID"));
                //console.log(data);
            }).then(profile);
        };

    });

    function profile() {


        window.location.assign("/profile")
        //  $(window).load(view);

    };




    $("#signIn").on("click", function (event) {
        event.preventDefault();
        var nameExist = $("#nameExist").val();
        var passwordExist = $("#passwordExist").val();

        $.get("/api/users", function (data) {
            console.log("data", data);

            for (let i = 0; i < data.length; i++) {
                if (data[i].name == nameExist && data[i].password == passwordExist) {localStorage.setItem("ID", data[i].id); profile(); return }

            };
            console.log("username or password does not exist");

        }).then();



    });

});