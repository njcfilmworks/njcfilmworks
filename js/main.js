/* =====================================================
   NJCFILMWORKS - MAIN JAVASCRIPT
   Header, navigation, scroll animations
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initNavigation();
    initScrollAnimations();
    initScrollButtons();
    initParallax();
});

/**
 * Initialize header scroll behavior
 */
function initHeader() {
    const header = document.getElementById('header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > scrollThreshold) {
            addClass(header, 'scrolled');
        } else {
            removeClass(header, 'scrolled');
        }
    }, 10));
}

/**
 * Initialize mobile navigation
 */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navList = document.querySelector('.nav__list');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!navToggle) return;

    // Toggle menu
    navToggle.addEventListener('click', function() {
        toggleClass(navToggle, 'active');
        toggleClass(navList, 'active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            removeClass(navToggle, 'active');
            removeClass(navList, 'active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.header')) {
            removeClass(navToggle, 'active');
            removeClass(navList, 'active');
        }
    });

    // Update active link based on current page
    updateActiveNavLink();
}

/**
 * Update active navigation link
 */
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            addClass(link, 'active');
        } else {
            removeClass(link, 'active');
        }
    });
}

/**
 * Initialize scroll animations (Intersection Observer)
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                addClass(entry.target, 'in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize scroll to buttons
 */
function initScrollButtons() {
    const scrollButtons = document.querySelectorAll('[data-scroll-to]');

    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const selector = this.getAttribute('data-scroll-to');
            const target = document.getElementById(selector);
            
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize parallax effect
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', throttle(function() {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            const parallaxElements = hero.querySelectorAll('.hero__image');
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${scrollY * 0.5}px)`;
            });
        }
    }, 10));
}

/**
 * Log initialization
 */
logStyled('✨ NJCFilmworks Website Initialized');
