// services.js
document.addEventListener('DOMContentLoaded', function () {
  const accordionToggles = document.querySelectorAll('.accordion-toggle');

  accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
      const content = this.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  });
});
