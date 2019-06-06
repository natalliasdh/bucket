$.ajaxSetup({
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
});

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
      image: imgInput
    };
    console.log("userBucket", userBuck);
    $.ajax({
      url: "/api/buckets",
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
      image: imgInput
    };
    console.log("userBucket", userBuck.token, userBuck);
    $.ajax({
      url: "/api/buckets",
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
  //start of progress bar functions
  let completeNumber;
  let totalNumber;
  let progress;
  var currentUserId = localStorage.getItem("ID");

  function score() {
    $.get("/api/scores/" + currentUserId, function(data) {
      //console.log(data.count);
      completeNumber = data.count;
      console.log("complete", +completeNumber);
    }).then(total);
  }
  function total() {
    $.get("/api/percents/" + currentUserId, function(data) {
      // console.log(data.count);
      totalNumber = data.count;
      console.log("total", +totalNumber);
    }).then(countPercent);
  }

  function countPercent() {
    console.log("complete+++", +completeNumber);
    console.log("total+++", +totalNumber);
    if (completeNumber > 0) {
      progress = Math.floor((completeNumber * 100) / totalNumber);
    } else {
      progress = 0;
    }
    if (totalNumber == 0) {
      $(".progress").attr("style", "visibility:hidden");
    } else {
      $(".progress").attr(
        "style",
        "height: 15px; width: 70%; margin:5px auto; background-color:rgb(207, 201, 201); visibility:visible;text-align:center;"
      );
    }

    console.log("progress", +progress);
    $(".progress-bar").attr("aria-valuenow", progress);
    $(".progress-bar").attr("style", `width:${progress}%; padding:3px;`);
    $(".progress-bar").text(progress + "% completed");
  }
  score();
  //end of progress bar functions
  $.get("/api/users/" + userId, function(data) {
    console.log("users data:", data.BucketLists);
    $("#user-name-head").empty();
    $("#user-name-head").append(data.name.toUpperCase());
    data.BucketLists.forEach(function(elem) {
      const dateFormat = elem.createdAt.split("T");
      if (elem.completion === true) {
        $(".buckets-listed").append(
          `
          <div class="card shadow-other" style="opacity:0.5">
              <img class="card-img-top" src="${
                elem.image
              }" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">${elem.title}</h5>
                <div class="card-text">
                  <p>Category: ${elem.category}</p>
                  <p>Complete <i class="fas fa-check"></i></p>
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
      } else {
        $(".buckets-listed").append(
          `
          <div class="card shadow">
              <img class="card-img-top" src="${
                elem.image
              }" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">${elem.title}</h5>
                <div class="card-text">
                  <p>Category: ${elem.category}</p>
                  <p>Not Complete <i class="fas fa-hourglass-half"></i></p>
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
      }
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
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        url: "/api/buckets/" + idComplete,
        data: completeUp
      }).then(function() {
        $(".buckets-listed").empty();
        renderBuckets(userId);
      });
    });
    score();
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
        <div class="card shadow">
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
