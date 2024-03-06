$(document).ready(function() {

  // Sticky header
  $(window).scroll(function() {
      const scrollTop = $(this).scrollTop();

      // Add or remove sticky class based on scroll position
      $(".header-area").toggleClass("sticky", scrollTop > 1);

      // Update the active section in the header
      updateActiveSection();
  });

  // Smooth scrolling for anchor links
  $(".header ul li a").click(function(e) {
      e.preventDefault();

      const target = $(this).attr("href");

      if ($(target).hasClass("active-section")) {
          return;
      }

      const offset = target === "#home" ? 0 : $(target).offset().top - 40;

      $("html, body").animate({ scrollTop: offset }, 500);

      // Update active class in the header
      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
  });

  // Initial content revealing with ScrollReveal
  ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", { origin: "right" });
  ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" });
  ScrollReveal().reveal(".projects, .contact", { origin: "bottom" });

  // Contact form submission to Google Sheet
  const scriptURL = 'https://forms.gle/EVRaTYHK1etbJutF6';
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', handleFormSubmit);
  
  function handleFormSubmit(e) {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => {
              msg.innerHTML = "Message sent successfully";
              setTimeout(() => {
                  msg.innerHTML = "";
              }, 5000);
              form.reset();
          })
          .catch(error => console.error('Error!', error.message));
  }
});

function updateActiveSection() {
  const scrollPosition = $(window).scrollTop();

  // Checking if scroll position is at the top of the page
  if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
  }

  // Iterate through each section and update the active class in the header
  $("section").each(function() {
      const target = $(this).attr("id");
      const offset = $(this).offset().top;
      const height = $(this).outerHeight();

      if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
          $(".header ul li a").removeClass("active");
          $(".header ul li a[href='#" + target + "']").addClass("active");
      }
  });
}

    
  
    
   