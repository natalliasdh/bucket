$(document).ready(function() {
  var userId = localStorage.getItem("ID").trim();
  var greeting = localStorage.getItem("name").trim();
  $("#greeting").text(greeting.toUpperCase());
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
    $.ajax({
      url: "/api/buckets",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      method: "POST",
      data: userBuck,
      success: function(data) {
        console.log("succes: " + data);
        window.location.href = "/profile";
      }
    });
  });

  // add suggestion
  $("#render-suggest").on("click", ".add-suggest", function(event) {
    event.preventDefault();
    console.log("suggest click works");
    console.log("this", $(this).parents(".card"));
    var idSuggest = $(this).attr("data-id");
    console.log(idSuggest);
    var titleInput = $(this)
      .parent(".card-text")
      .attr("data-title");
    var catInput = $(this)
      .parent(".card-text")
      .attr("data-cat");
    var imgInput = $(this)
      .parent(".card-text")
      .attr("data-img");

    console.log("title input", titleInput);
    var userBuck = {
      title: titleInput,
      category: catInput,
      image: imgInput,
      UserId: userId,
      token: localStorage.getItem("token")
    };
    console.log("userBucket", userBuck.token, userBuck);
    $.ajax({
      url: "/api/buckets",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      method: "POST",
      data: userBuck,
      success: function(data) {
        console.log("succes: " + data);
        window.location.href = "/profile";
      }
    });
  });

  //
  $(".add-new-bucket").on("click", renderModal);
  $("#log-out").on("click", function() {
    localStorage.removeItem("ID");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    window.location.href = "/";
  });
  var n = localStorage.getItem("ID");

  //Show suggestions
  $("#suggest-show-btn").on("click", function() {
    console.log("click suggest");
    $("#render-suggest").empty();
    renderSuggestions(userId);
  });
});

// render modal
const renderModal = function() {
  console.log("add new bucket");
  $("#new-bucket-modal").modal();
  document.querySelector(".bucket-modal-body").innerHTML = `
  <form>
      <div class= "form-group">
        <input id="list-title" class="form-control" type="text" placeholder="Drop Title">
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
    $("#user-name-head").empty();
    $("#user-name-head").append(data.name.toUpperCase());
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
                <button type="submit" id="complete" class="completeBtn btn btn-success" data-id="${
                  elem.id
                }">Complete <i class="fas fa-check"></i></button>
                <button type="submit" class="deleteBtn btn btn-danger" data-id="${
                  elem.id
                }">Delete <i class="fas fa-tint-slash"></i> </button>
              </div>
            </div>
          </div>
        `
      );
    });
    $(".completeBtn").on("click", function(event) {
      console.log("click works");
      event.preventDefault();

      var idComplete = $(this).attr("data-id");
      console.log(idComplete);
      var completeUp = {
        completion: true
      };
      console.log(completeUp);
      $.ajax({
        method: "PUT",
        url: "/api/buckets/" + idComplete,
        data: completeUp
      }).then(function() {
        $(".buckets-listed").empty();
        renderBuckets(userId);
      });
    });

    //Option to delete

    $(".deleteBtn").on("click", function(event) {
      console.log("click works");
      event.preventDefault();
      const idDelete = $(this).attr("data-id");

      //console.log(completeUp);
      $.ajax({
        method: "DELETE",
        url: "/api/deleted/" + idDelete
      }).then(function() {
        $(".buckets-listed").empty();
        renderBuckets(userId);
      });
    });
  });

  // document.querySelector(".buckets-listed").innerHTML = `
};

function renderSuggestions(id) {
  console.log("inside render suggest");
  $.get("/api/suggest/", function(data) {
    console.log("suggest data:", data);
    data.forEach(function(elem) {
      $("#render-suggest").append(
        `
        <div class="card">
            <img class="card-img-top" src="${
              elem.image
            }" alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title">${elem.title}</h5>
              <div class="card-text" data-cat="${elem.category}" data-title="${
          elem.title
        }" data-img="${elem.image}">
                <p class="card-cat">Category: ${elem.category}</p>
                <button type="submit" class="btn btn-info add-suggest" data-id="${
                  elem.id
                }">ADD SUGGESTED 
                <i class="fas fa-tint"></i></button>
              </div>
            </div>
          </div>
        `
      );
    });
  });
}
