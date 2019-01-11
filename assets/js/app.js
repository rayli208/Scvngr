$(document).ready(function(){
  var giantContainer = localStorage.getItem('giantContainer');
  var counter = localStorage.getItem('counter') || 0;

  if(giantContainer){
    $("#giantContainer").html(giantContainer);
  }
  
  $("#saveUserInfo").click(function (e) {
    e.preventDefault();
    var company = $("#company").val().trim();
    var jobTitle = $("#title").val().trim();
    var phoneNumber = $("#phone").val().trim();
    var email = $("#email").val().trim();
    var location = $("#location").val().trim();
    var salary = $("#salary").val().trim();
    var info = $("#text-area").val().trim();
  
    var card = `<div class="card mx-auto mb-3" style="width: 18rem;">
    <div class="card">
      <button class="btn card-header" type="button" data-toggle="collapse" data-target="#cardCollapse${counter}"
        aria-expanded="false" aria-controls="cardCollapse${counter}">
        <h5 class="card-title">${company}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${jobTitle}</h6>
      </button>
    </div>
    <div class="card-body collapse" id="cardCollapse${counter}">
      <h6 class="text-center pb-2">Contact Info:</h6>
      <ul class="list-group">
        <li class="list-group-item">
          <i class="fas fa-phone"></i> <a href="tel:${phoneNumber}">${phoneNumber}</a>
        </li>
        <li class="list-group-item">
          <i class="fas fa-envelope"></i> <a href="mailto:${email}">${email}</a>
        </li>
        <li class="list-group-item">
          <i class="fas fa-map-pin"></i> ${location}
        </li>
        <li class="list-group-item">
          <i class="fas fa-dollar-sign"></i> ${salary}
        </li>
        <li class="list-group-item">
          <i class="fas fa-info-circle"></i> ${info}
        </li>
      </ul>
    </div>
    <div class="card-footer">
      <i class="fas fa-trash-alt trash"></i>
    </div>
  </div>`;
  
    var applied = $("#applied");
    applied.append(card);
    
    counter++;

    var giantContainer = $("#giantContainer").html();
    localStorage.setItem('giantContainer', giantContainer);
    localStorage.setItem('counter', counter);
  });
  
  $(document).on("click", ".trash", function(e) {
    e.preventDefault();
    console.log(this);
    if (confirm('You sure wanna delete this job?')) {
      ($(this).parent().parent()[0].remove());
    } else {
      false;
    }
    var giantContainer = $("#giantContainer").html();
    localStorage.setItem('giantContainer', giantContainer);
  });
})




//API Search
$("#search-user-input").click(function (e) {
  e.preventDefault();
 
//  var appID = 'd8d73b54';
//  var appKey = 'f48deeda8d68ea1d2e670db1346ab43f';
 var userSearch = $("#user-search-job").val().trim();
 var userCity = $("#user-search-city").val().trim();
 
 var queryURL = `http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=d8d73b54&app_key=f48deeda8d68ea1d2e670db1346ab43f&results_per_page=10&what=${userSearch}&where=${userCity}&content-type=application/json`;
 
 $.ajax({
  url: queryURL,
  method: "GET"
 }).then(function (response) {
  // console.log(response.results.length)
 
  // console.log(response.results[0])
 
  for (var i = 0; i < response.results.length; i++) {
 
    var title = response.results[i].title
    var company = response.results[i].company.display_name
    var location = response.results[i].location.display_name
    var jobLink = response.results[i].redirect_url
 
    var card =
    `<div class="card text-center mb-3">
   <div class="card-header  bg-dark text-white">
     <strong><span id="user-search-title">${title}</span></strong>
   </div>
   <div class="card-body">
     <p class="card-text"><strong>Company</strong>: <span id="user-search-company">${company}</span></p>
     <p class="card-text"><strong>Location</strong>: <span id="user-search-location">${location}</span></p>
   </div>
   <div class="card-footer text-white bg-dark">
     <a target="_blank" href="${jobLink}" class="btn btn-outline-light">Apply</a>
   </div>
 </div>`
 
 $("#box").append(card);
 
  }
 
 });
 
  });

