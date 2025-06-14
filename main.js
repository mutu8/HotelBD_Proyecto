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
  document.querySelectorAll('.content__item, .aboutus__container').forEach(el => {
    observer.observe(el);
  });
}

// Initialize responsive navigation
function initNavigation() {
  // This would be expanded in a real implementation to handle mobile navigation
  console.log('Navigation initialized');
  
  // Add active class to current page link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.lista__item__ancla').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

// Recommendations carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const prevButton = document.querySelector('.recomendaciones__angle:first-child');
  const nextButton = document.querySelector('.recomendaciones__angle:last-child');
  const recommendationImage = document.querySelector('.recomendaciones__img');
  
  if (prevButton && nextButton && recommendationImage) {
    // Sample recommendations (in a real implementation, this would be fetched from a database)
    const recommendations = [
      { src: './Imagenes/Home/tripadvisor.png', alt: 'Recomendación de TripAdvisor' },
      { src: './Imagenes/Galeria/p5.jpeg', alt: 'Recomendación de huéspedes' },
      { src: './Imagenes/Galeria/p8.jpeg', alt: 'Recomendación de expertos' }
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
});