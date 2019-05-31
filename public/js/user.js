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

        function view() {

                var n=localStorage.getItem("ID");
            $("#hello").append("helllllooooooWS");
            console.log("hello");
        }
});