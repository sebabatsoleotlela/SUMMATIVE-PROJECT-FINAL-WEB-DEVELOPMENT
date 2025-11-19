// inquiry.js
document.addEventListener('DOMContentLoaded', function () {

  // Google Map initialization
  window.initMap = function() {
    const location = { lat: -33.9249, lng: 18.4241 }; // Coordinates for Cape Town, South Africa (Change as per your location)
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: location
    });
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "LaunchPAD Office"
    });
  };

  // Form Submission and Modal Handling
  const form = document.getElementById("inquiryForm");
  const modal = document.getElementById("thankYouModal");
  const closeBtn = document.querySelector(".close-btn");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Show thank you modal
    modal.style.display = "block";

    // Reset form
    form.reset();
  });

  // Close the modal when clicking the close button
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close the modal when clicking anywhere outside of it
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

});
