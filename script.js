// Define scrollToTop in the global scope
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Smooth scroll
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');

  // Show/hide the button based on scroll position
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    // Add click event listener to the back-to-top button
    backToTopButton.addEventListener('click', scrollToTop);
  }

  // Modal functionality
  const modals = document.querySelectorAll('.modal');
  const learnMoreButtons = document.querySelectorAll('.learn-more');
  const closeButtons = document.querySelectorAll('.close');
  const orderButtons = document.querySelectorAll('.order-button');

  // Open modal
  if (learnMoreButtons) {
    learnMoreButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.style.display = 'flex';
        }
      });
    });
  }

  // Open order modal
  if (orderButtons) {
    orderButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.style.display = 'flex';
        }
      });
    });
  }

  // Close modal
  if (closeButtons) {
    closeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
          modal.style.display = 'none';
        }
      });
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });

  // Function to close modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Footer Contact Form Submission
  const footerContactForm = document.getElementById('footer-contact-form');
  if (footerContactForm) {
    footerContactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }

  // Order form submission
  const orderForms = document.querySelectorAll('.order-form');
  if (orderForms) {
    orderForms.forEach((form) => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your order! We will contact you shortly.');
        form.reset();
        const modal = form.closest('.modal');
        if (modal) {
          modal.style.display = 'none';
        }
      });
    });
  }

  // Reviews Carousel
  const reviewItems = document.querySelectorAll('.review-item');
  let currentReviewIndex = 0;

  if (reviewItems.length > 0) {
    function showReview(index) {
      // Hide all reviews
      reviewItems.forEach((item) => item.classList.remove('active'));

      // Show the selected review
      reviewItems[index].classList.add('active');
    }

    function showNextReview() {
      currentReviewIndex = (currentReviewIndex + 1) % reviewItems.length;
      showReview(currentReviewIndex);
    }

    // Auto-rotate carousel every 7 seconds
    let carouselInterval = setInterval(showNextReview, 7000);

    // Ensure the first review is visible initially
    showReview(currentReviewIndex);
  }

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Check for saved dark mode preference in localStorage
  const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

  // Apply dark mode if previously enabled
  if (isDarkMode) {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
  }

  // Toggle dark mode
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDarkModeEnabled = body.classList.contains('dark-mode');

      // Save preference in localStorage
      if (isDarkModeEnabled) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
      } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
      }
    });
  }

  // Hamburger Menu Functionality
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');

  // Only proceed if the elements exist
  if (hamburgerMenu && navMenu) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    // Append the overlay to the body
    document.body.appendChild(overlay);

    // Toggle the mobile menu
    hamburgerMenu.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    // Close the menu when clicking outside or on a link
    overlay.addEventListener('click', () => {
      navMenu.classList.remove('active');
      overlay.classList.remove('active');
    });

    navMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
      }
    });
  }

  // Add click event listener to the privacy-terms section
  const privacySection = document.querySelector('.privacy-terms');
  if (privacySection) {
    privacySection.addEventListener('click', function () {
      console.log('Privacy section clicked!'); // Debugging
      this.classList.toggle('privacy-dark');
    });
  }
});