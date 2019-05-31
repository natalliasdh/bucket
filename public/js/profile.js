$(document).ready(function() {
  $("#list-Add").on("click", function(event) {
    event.preventDefault();
    var titleInput = $("#list-title")
      .val()
      .trim();
    var catInput = $("#list-category")
      .val()
      .trim();
    var imgInput = $("#list-img")
      .val()
      .trim();
    var userId = localStorage.getItem("ID").trim();
    console.log(titleInput);
    var userBuck = {
      title: titleInput,
      category: catInput,
      image: imgInput,
      UserId: userId
    };
    console.log("userBucket", userBuck);
    $.post("/api/buckets", userBuck, function() {});

    // function getId() {
    //   console.log("name input", nameInput);
    //   $.get("/api/names/" + nameInput, function(data) {
    //     idUser = data.id;
    //     localStorage.setItem("ID", data.id);
    //     console.log(localStorage.getItem("ID"));
    //     //console.log(data);
    //   }).then(profile);
    // }
  });

  var n = localStorage.getItem("ID");
  $("#hello").append("helllllooooooWS");
  console.log("hello");
  console.log(n);
});
