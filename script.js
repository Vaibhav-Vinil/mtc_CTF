// Constants
const CONFIG = {
  observer: {
    threshold: 0.1,
    rootMargin: "50px"
  },
  animations: {
    glitch: {
      duration: 300,
      interval: 5000
    },
    flicker: {
      interval: 2000,
      probability: 0.2
    }
  },
  audio: {
    volume: 0.1,
    url: 'https://freesound.org/data/previews/463/463583_4056105-lq.mp3'
  },
  navigation: {
    transitionDelay: 300,
    clickSound: 'https://freesound.org/data/previews/320/320654_5260872-lq.mp3'
  }
};

// DOM Elements
const elements = {
  cards: document.querySelectorAll('.challenge-card, .stat-card'),
  challengeCards: document.querySelectorAll('.challenge-card'),
  root: document.documentElement,
  navItems: document.querySelectorAll('.nav-item'),
  body: document.body
};

// Audio
const ambientSound = new Audio(CONFIG.audio.url);
ambientSound.loop = true;
ambientSound.volume = CONFIG.audio.volume;

// Navigation Handler
function handleNavigation() {
  // Set active state based on current page
  const currentPath = window.location.pathname;
  elements.navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath || (href === 'index.html' && currentPath === '/')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Add click handlers
  elements.navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Add a subtle transition effect
      elements.body.style.opacity = '0';
      
      // Play a subtle click sound
      const clickSound = new Audio(CONFIG.navigation.clickSound);
      clickSound.volume = 0.1;
      clickSound.play().catch(e => console.log('Click sound failed:', e));
      
      // Add a small delay before navigation
      setTimeout(() => {
        window.location.href = item.getAttribute('href');
      }, CONFIG.navigation.transitionDelay);
    });
  });
}

// Intersection Observer for scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.setProperty('--card-index', index + 1);
      entry.target.style.animationPlayState = 'running';
    }
  });
}, CONFIG.observer);

// Initialize animations
function initializeAnimations() {
  elements.cards.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

// Glitch effect
function applyGlitchEffect() {
  const randomCard = elements.challengeCards[Math.floor(Math.random() * elements.challengeCards.length)];
  randomCard.style.animation = 'glitch 0.3s infinite';
  
  setTimeout(() => {
    randomCard.style.animation = '';
  }, CONFIG.animations.glitch.duration);
}

// Flicker effect
function applyFlickerEffect() {
  if (Math.random() > (1 - CONFIG.animations.flicker.probability)) {
    elements.root.style.setProperty('--neon-glow-red', '0 0 5px rgba(255, 0, 0, 0.3)');
    
    setTimeout(() => {
      elements.root.style.setProperty('--neon-glow-red', '0 0 10px rgba(255, 0, 0, 0.7), 0 0 20px rgba(255, 0, 0, 0.5), 0 0 30px rgba(255, 0, 0, 0.3)');
    }, 50);
  }
}

// Event Listeners
document.addEventListener('click', () => {
  ambientSound.play().catch(e => console.log('Audio play failed:', e));
});

// Initialize
function init() {
  // Add fade-in effect when page loads
  elements.body.style.opacity = '1';
  
  initializeAnimations();
  handleNavigation();
  
  // Set up intervals
  setInterval(applyGlitchEffect, CONFIG.animations.glitch.interval);
  setInterval(applyFlickerEffect, CONFIG.animations.flicker.interval);
}

// Start the application
init(); 