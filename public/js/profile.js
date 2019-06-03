$(document).ready(function() {
  var userId = localStorage.getItem("ID").trim();
  renderBuckets(userId);
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

    console.log(titleInput);
    var userBuck = {
      title: titleInput,
      category: catInput,
      image: imgInput,
      UserId: userId
    };
    console.log("userBucket", userBuck);
    $.post("/api/buckets", userBuck, function() {
      window.location.href = "/profile";
    });
  });

  $(".add-new-bucket").on("click", renderModal);

  var n = localStorage.getItem("ID");
  $("#hello").append("helllllooooooWS");
  console.log("hello");
  console.log(n);
});

// render modal
const renderModal = function() {
  console.log("add new bucket");
  $("#new-bucket-modal").modal();
  document.querySelector(".bucket-modal-body").innerHTML = `
  <form>
      <div class= "form-group">
        <input id="list-title" class="form-control" type="text" placeholder="Bucket Title">
      </div>
      <div class="form-group">
        <select class="form-control" id="list-category" required = "required">
          <option value="" selected disabled>Choose a Category...</option>
          <option value="Travel">Travel</option>
          <option value="Adventure">Adventure</option>
          <option value="Educational">Educational</option>
          <option value="Family">Family</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Financial">Financial</option>
          <option value="Health">Health</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div class= "form-group">
        <input id="list-img" class="form-control" type="text" placeholder="Img URL">
      </div>
      
  </form>
  `;
};

const renderBuckets = function(userId) {
  console.log("buckets rendered");

  $.get("/api/users/" + userId, function(data) {
    console.log("users data:", data.BucketLists);
    data.BucketLists.forEach(function(elem) {
      const dateFormat = elem.createdAt.split("T");

      $(".buckets-listed").append(
        `
        <div class="card">
            <img class="card-img-top" src="${
              elem.image
            }" alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title">${elem.title}</h5>
              <div class="card-text">
                <p>Category: ${elem.category}</p>
                <p>Completed: ${elem.completion}</p>
                <p>Created on: ${dateFormat[0]}</p>
                <button type="submit" id="complete" data-id="${elem.id}">Complete</button>
              </div>
            </div>
          </div>
        `
      );
    });
    $("#complete").on("click", function(event){
      console.log("click works");
      event.preventDefault();
  
    var idComplete= $(this).attr("data-id");
    console.log(idComplete);
    var completeUp = {
      title: data.title,
      category: data.category,
      image: data.image,
      completion: true,
      userId: userId
    };
console.log(completeUp);
    $.ajax({
      method: "PUT",
      url: "/api/buckets/"+ idComplete,
      data: completeUp
    }).then();
  });
  });

  // document.querySelector(".buckets-listed").innerHTML = `
  
};
