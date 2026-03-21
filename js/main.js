/* ============================================================
   NJC FILMWORKS — main.js
   Header scroll, scroll animations, video cards, modal
   ============================================================ */

(function () {
  'use strict';

  // ── Header: transparent → solid on scroll ──────────────────
  const header = document.getElementById('header');

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load

  // ── Mobile nav toggle ────────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMobile.classList.contains('open');
      navMobile.classList.toggle('open', !isOpen);
      navToggle.classList.toggle('active', !isOpen);
      // Show/hide via display
      navMobile.style.display = isOpen ? 'none' : 'flex';
    });

    // Close mobile nav when a link is clicked
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('open');
        navToggle.classList.remove('active');
        navMobile.style.display = 'none';
      });
    });
  }

  // ── Scroll-to anchor for hero CTA button ─────────────────────
  document.querySelectorAll('[data-scroll-to]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = document.getElementById(btn.dataset.scrollTo);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Intersection Observer: fade-in-up animations ─────────────
  const fadeEls = document.querySelectorAll('.fade-in-up');

  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay || '0', 10);
            setTimeout(function () {
              el.classList.add('visible');
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ── Video Modal ──────────────────────────────────────────────
  const modal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('videoPlayer');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');

  function openModal(videoId, title) {
    if (!modal || !videoPlayer) return;
    const src =
      'https://www.youtube.com/embed/' +
      videoId +
      '?autoplay=1&rel=0&modestbranding=1';
    videoPlayer.src = src;
    videoPlayer.title = title || 'Video';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal || !videoPlayer) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    // Slight delay so animation completes before iframe reset
    setTimeout(function () {
      videoPlayer.src = '';
    }, 350);
    document.body.style.overflow = '';
  }

  // Wire up all video cards
  document.querySelectorAll('.featured__card[data-video-id]').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card.dataset.videoId, card.dataset.title);
    });

    // Keyboard: Enter or Space triggers modal
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.videoId, card.dataset.title);
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // ── YouTube hero: try to reinforce autoplay after load ───────
  // Some browsers block autoplay on iframes until interaction.
  // We store user gesture to unlock if needed.
  const heroIframe = document.querySelector('.hero__iframe');
  if (heroIframe) {
    // Nudge playback when user first interacts with the page
    function unlockHeroVideo() {
      try {
        heroIframe.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          '*'
        );
      } catch (_) {}
      document.removeEventListener('touchstart', unlockHeroVideo);
      document.removeEventListener('click', unlockHeroVideo);
    }
    document.addEventListener('touchstart', unlockHeroVideo, { once: true });
    document.addEventListener('click', unlockHeroVideo, { once: true });
  }

})();    updateActiveNavLink();
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
