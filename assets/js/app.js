$(document).ready(function() {
  // // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyAVgI5vETbO659VZCyMclGYY8ROBwSw5Hw",
  //   authDomain: "scvngr-f10ad.firebaseapp.com",
  //   databaseURL: "https://scvngr-f10ad.firebaseio.com",
  //   projectId: "scvngr-f10ad",
  //   storageBucket: "scvngr-f10ad.appspot.com",
  //   messagingSenderId: "851938769349"
  // };
  // firebase.initializeApp(config);

  // $(".scvngr").hide();
  // $(".background-gradient").show();

  // var provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope('profile');
  // provider.addScope('email');

  // $(document).on("click", "#btn-login", function (e) {
  //   e.preventDefault();
  //   firebase.auth().signInWithPopup(provider).then(function (result) {
  //     // This gives you a Google Access Token.
  //     var token = result.credential.accessToken;
  //     // The signed-in user info.
  //     var user = result.user;
  //     userID = user.uid;
  //     console.log(userID);
  //     $(".background-gradient").hide();
  //     $(".scvngr").show();

  //   });
  // });

  // $(document).on("click", "#btn-signout", function () {
  //   firebase.auth().signOut().then(function () {
  //     $(".background-gradient").show();
  //     $(".scvngr").hide();
  //   });
  // });

  var giantContainer = localStorage.getItem("giantContainer");
  var counter = localStorage.getItem("counter") || 0;

  if (giantContainer) {
    $("#giantContainer").html(giantContainer);
  }
  //Make cards
  $("#saveUserInfo").click(function(e) {
    e.preventDefault();
    var stamp = moment().format("L");
    var company = $("#company")
      .val()
      .trim();
    var jobTitle = $("#title")
      .val()
      .trim();
    var phoneNumber = $("#phone")
      .val()
      .trim();
    var email = $("#email")
      .val()
      .trim();
    var location = $("#location")
      .val()
      .trim();
    var link = $("#link")
      .val()
      .trim();
    var salary = $("#salary")
      .val()
      .trim();
    var info = $("#text-area")
      .val()
      .trim();
    var id = "card-" + counter;

    var card = `<div id="${id}" class="shadow-lg card mx-auto mb-3 mt-2" style="width: 18rem;">
    <div class="card-top">
      <button class="btn card-header bg-purple" type="button" data-toggle="collapse" data-target="#cardCollapse${counter}"
        aria-expanded="false" aria-controls="cardCollapse${counter}">
        <h5 class="card-title">${company}</h5>
        <h6 class="card-subtitle mb-2 text-dimmed">${jobTitle}</h6>
      </button>
    </div>
    <div class="card-body collapse text-center" id="cardCollapse${counter}">
      <h6 class="pb-1">Contact Info:</h6>
      <div class="btn-group pb-2" role="group" aria-label="Basic example">
        <a class="btn btn-pink side-borders" href="tel:${phoneNumber}"> <i class="fas fa-phone"></i></a>
        <a class="btn btn-pink side-borders" href="mailto:${email}""> <i class="fas fa-envelope"></i></a> 
        <a class="btn btn-pink side-borders" target="_blank" href="https://${link}"> <i class="fas fa-link"></i></a>
      </div>
      <ul class="list-group">
        <li class="list-group-item">
          <i class="fas fa-map-pin"></i> ${location}
        </li>
        <li class="list-group-item">
          <i class="fas fa-dollar-sign"></i> <span class="salary">${salary}</span>
        </li>
        <li class="list-group-item">
          <i class="fas fa-info-circle"></i><span class="info">${info}</span>
        </li>
      </ul>
    </div>
    <div class="card-footer">
    <span class="text-muted"> Applied:  ${stamp} </span>
      <i class="fas fa-trash-alt trash"></i>
      <i class="fas fa-angle-double-right move"></i>
      <i class="fas fa-edit edit"></i>
    </div>
  </div>`;

    var applied = $("#applied");
    applied.append(card);

    $("#" + id)
      .addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
      .find(".card-header")
      .addClass("ui-widget-header ui-corner-all");

    $("#company").val("");
    $("#title").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#location").val("");
    $("#link").val("");
    $("#salary").val("");
    $("#text-area").val("");

    counter++;
    persist();
  });

  //SAVE TO LOCAL STORAGE
  function persist() {
    var giantContainer = $("#giantContainer").html();
    localStorage.setItem("giantContainer", giantContainer);
    localStorage.setItem("counter", counter);
  }

  //DELETE CARDS USING TRASH CAN
  $(document).on("click", ".trash", function(e) {
    e.preventDefault();
    var targetCard = $(this)
      .parent()
      .parent()[0];
    console.log(targetCard);

    //Use custom modals with SWAL
    swal(
      {
        title: "Are you sure you want to delete this job!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: true
      },
      function(isConfirm) {
        if (isConfirm) {
          swal(
            "Job Has Been Removed!",
            "I hope you find a cool job :)",
            "success"
          );
          targetCard.remove();
          persist();
        }
      }
    );
  });

  //MOVE CARDS USING YELLOW ARROW
  $(document).on("click", ".move", function(e) {
    e.preventDefault();
    var button = $(this);

    var targetCard = $(this)
      .parent()
      .parent()[0];

    var parentOfCard = $(this)
      .parent()
      .parent()
      .parent()[0];

    // Use custom modals with SWAL
    swal(
      {
        title: "Are you sure you want to push this job into the next stage?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: true
      },
      function(isConfirm) {
        if (isConfirm) {
          swal(
            "Congratulations on moving one step closer to getting your dream job!",
            "Keep Killing It",
            "success"
          );
          if (parentOfCard.getAttribute("id") == "applied") {
            $("#heardBack").append(targetCard);
            persist();
          } else if (parentOfCard.getAttribute("id") == "heardBack") {
            $("#offer").append(targetCard);
            button.hide();
            persist();
          }
        }
      }
    );
  });
  //EDITTI
  var edit = false;

  //DELETE CARDS USING TRASH CAN
  $(document).on("click", ".edit", function(e) {
    e.preventDefault();
    var targetCard = $(this)
      .parent()
      .parent()[0];
    var salary = $(targetCard).find(".salary")[0];
    var info = $(targetCard).find(".info")[0];
    if (edit === false) {
      $(salary).html(
        `<input type="number" class="form-control newSalary" aria-describedby="newSalary" placeholder="update salary">`
      );
      $(info).html(
        `<textarea class="form-control newInfo" rows="3" placeholder="update info"></textarea>`
      );
      edit = true;
    }else if (edit === true) {
      $(salary).html($(".newSalary").val());
      $(info).html(($(".newInfo").val()));
      edit = false;
      persist();
    }
  });

  //Use sortable for pulling cards around
  $(function() {
    $(".jobList").sortable({
      connectWith: ".jobList",
      handle: ".card-title",
      cancel: ".portlet-toggle",
      placeholder: "portlet-placeholder ui-corner-all",
      stop: function(event, ui) {
        persist();
      }
    });
  });
});

//API Search
$("#search-user-input").click(function(e) {
  e.preventDefault();
  $("#box").empty();

  //  var appID = 'd8d73b54';
  //  var appKey = 'f48deeda8d68ea1d2e670db1346ab43f';
  var userSearch = $("#user-search-job")
    .val()
    .trim();
  var userCity = $("#user-search-city")
    .val()
    .trim();

  var queryURL = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=d8d73b54&app_key=f48deeda8d68ea1d2e670db1346ab43f&results_per_page=10&what=${userSearch}&where=${userCity}&content-type=application/json`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for (var i = 0; i < response.results.length; i++) {
      var title = response.results[i].title;
      var company = response.results[i].company.display_name;
      var location = response.results[i].location.display_name;
      var jobLink = response.results[i].redirect_url;
      //Create API cards
      var card = `<div class="shadow-lg card card-border text-center mb-3">
   <div class="card-header card-header-purple bg-purple text-white">
     <strong><span id="user-search-title">${title}</span></strong>
   </div>
   <div class="card-body">
     <p class="card-text"><strong>Company</strong>: <span id="user-search-company">${company}</span></p>
     <p class="card-text"><strong>Location</strong>: <span id="user-search-location">${location}</span></p>
   </div>
   <div class="card-footer card-footer-purple text-white bg-pink">
     <a target="_blank" href="${jobLink}" class="btn btn-pink btn-block">Apply</a>
   </div>
 </div>`;

      $("#box").append(card);
    }
  });
});

//Function for resizing the columns
(function() {
  function resize() {
    var height = $(window).height();
    height = height - $(".navbar")[0].offsetHeight;
    height = height - $(".jumbotron")[0].offsetHeight;
    $("#giantContainer").attr("style", "min-height:" + height + "px;");
    height =
      height -
      $("#giantContainer")
        .find(".row")
        .first()[0].offsetHeight;
    $("#applied").attr("style", "min-height:" + height + "px;");
  }

  $(document).ready(function() {
    resize();
  });
  $(window).resize(function() {
    resize();
  });
})();
