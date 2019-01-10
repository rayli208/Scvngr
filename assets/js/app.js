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


