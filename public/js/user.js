$(document).ready(function(){
   

$("#userAdd").on("click", function(event){
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
    $.post("/api/users", userUp, function(){

    }).then(getId);



    function getId (){
        console.log("name input",nameInput);
        $.get("/api/users/" + nameInput, function(data){
        //idUser = data.id;
            console.log(data);
        }).then(profile);
    };
    function profile (){
        $.get("/profile", function(data){
            console.log(idUser);
        }).then();
    };
});
});