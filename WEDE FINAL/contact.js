$(document).ready(function () {
  // Tabs functionality
  $(".tab-titles a").click(function(e) {
    e.preventDefault();
    $(".tab-titles a").removeClass("active");
    $(this).addClass("active");
    $(".tab-content").hide();
    $($(this).attr("href")).show();
  });

  // Accordion functionality
  $(".accordion-toggle").click(function() {
    $(this).next(".accordion-content").slideToggle();
  });

  // Modal functionality
  var modal = document.getElementById("messageModal");
  var span = document.getElementsByClassName("close")[0];

  $("#contactForm").submit(function(e) {
    e.preventDefault();
    modal.style.display = "block";
  });

  span.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Google Map Initialization
  window.initMap = function () {
    var officeLocation = { lat: -26.2041, lng: 28.0473 }; // Example coordinates for Johannesburg
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: officeLocation
    });
    var marker = new google.maps.Marker({
      position: officeLocation,
      map: map
    });
  };
});
