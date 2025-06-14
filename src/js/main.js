// Main JavaScript file for Hotel Big Dream website

// Initialize date pickers
document.addEventListener('DOMContentLoaded', function() {
  // Get date inputs
  const entradaInput = document.querySelector('.entrada');
  const salidaInput = document.querySelector('.salida');
  
  if (entradaInput && salidaInput) {
    // Set default dates (today and tomorrow)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format dates
    entradaInput.value = formatDate(today);
    salidaInput.value = formatDate(tomorrow);
    
    // Add click event listeners
    entradaInput.addEventListener('click', function() {
      // In a real implementation, this would open a date picker
      console.log('Open date picker for check-in');
    });
    
    salidaInput.addEventListener('click', function() {
      // In a real implementation, this would open a date picker
      console.log('Open date picker for check-out');
    });
  }
  
  // Initialize animations
  initAnimations();
  
  // Initialize navigation
  initNavigation();
  
  // Initialize recommendations carousel
  initRecommendationsCarousel();
  
  // Initialize mobile menu
  initMobileMenu();
});

// Format date as DD/MM/YYYY
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}

// Initialize scroll animations
function initAnimations() {
  // Add fade-in-up class to elements as they come into view
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate on scroll
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Initialize responsive navigation
function initNavigation() {
  // Add active class to current page link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.lista__item__ancla, .nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

// Recommendations carousel functionality
function initRecommendationsCarousel() {
  const prevButton = document.querySelector('.recomendaciones__angle:first-child');
  const nextButton = document.querySelector('.recomendaciones__angle:last-child');
  const recommendationImage = document.querySelector('.recomendaciones__img');
  
  if (prevButton && nextButton && recommendationImage) {
    // Sample recommendations (in a real implementation, this would be fetched from a database)
    const recommendations = [
      { src: './assets/images/tripadvisor.png', alt: 'Recomendación de TripAdvisor' },
      { src: './assets/images/gallery/p5.jpeg', alt: 'Recomendación de huéspedes' },
      { src: './assets/images/gallery/p8.jpeg', alt: 'Recomendación de expertos' }
    ];
    
    let currentIndex = 0;
    
    // Previous recommendation
    prevButton.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + recommendations.length) % recommendations.length;
      updateRecommendation();
    });
    
    // Next recommendation
    nextButton.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % recommendations.length;
      updateRecommendation();
    });
    
    function updateRecommendation() {
      // Fade out
      recommendationImage.style.opacity = '0';
      
      // Change image after fade out
      setTimeout(() => {
        recommendationImage.src = recommendations[currentIndex].src;
        recommendationImage.alt = recommendations[currentIndex].alt;
        
        // Fade in
        recommendationImage.style.opacity = '1';
      }, 300);
    }
    
    // Add transition for smooth fade
    recommendationImage.style.transition = 'opacity 0.3s ease-in-out';
  }
}

// Initialize mobile menu
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      
      // Toggle menu icon
      const spans = menuToggle.querySelectorAll('span');
      if (mainNav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (mainNav.classList.contains('active') && 
          !mainNav.contains(event.target) && 
          !menuToggle.contains(event.target)) {
        mainNav.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Reset menu icon
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Handle dropdown menus in mobile view
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      if (item.querySelector('.dropdown-menu')) {
        link.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            item.classList.toggle('active');
          }
        });
      }
    });
  }
}

// Gallery lightbox functionality
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  
  if (galleryItems.length > 0 && lightbox) {
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const images = [];
    
    // Collect all gallery images
    galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      images.push({
        src: img.src,
        alt: img.alt
      });
      
      // Open lightbox on click
      item.addEventListener('click', function() {
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });
    
    // Close lightbox
    if (lightboxClose) {
      lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
      });
    }
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Previous image
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage();
      });
    }
    
    // Next image
    if (lightboxNext) {
      lightboxNext.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage();
      });
    }
    
    // Update lightbox image
    function updateLightboxImage() {
      lightboxImage.src = images[currentIndex].src;
      lightboxImage.alt = images[currentIndex].alt;
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      } else if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage();
      } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage();
      }
    });
  }
}

// Initialize room booking functionality
function initRoomBooking() {
  const bookingForm = document.querySelector('.booking-form');
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(bookingForm);
      const bookingData = {
        checkIn: formData.get('check-in'),
        checkOut: formData.get('check-out'),
        adults: formData.get('adults'),
        children: formData.get('children'),
        roomType: formData.get('room-type')
      };
      
      // Validate form data
      if (!bookingData.checkIn || !bookingData.checkOut) {
        showNotification('Please select check-in and check-out dates', 'error');
        return;
      }
      
      // In a real implementation, this would send the data to a server
      console.log('Booking data:', bookingData);
      
      // Show success message
      showNotification('Your booking request has been submitted successfully!', 'success');
      
      // Reset form
      bookingForm.reset();
    });
  }
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('active');
  }, 10);
  
  // Hide and remove notification
  setTimeout(() => {
    notification.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Call additional initializations if needed
document.addEventListener('DOMContentLoaded', function() {
  // Initialize gallery lightbox if on gallery page
  if (document.querySelector('.gallery-item')) {
    initGalleryLightbox();
  }
  
  // Initialize room booking if on booking page
  if (document.querySelector('.booking-form')) {
    initRoomBooking();
  }
});