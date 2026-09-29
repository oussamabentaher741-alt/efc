// ===== EFC Website – script.js (Enhanced Animations) =====

// ── Navbar scroll effect ──────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile burger menu ────────────────────────────────────
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  burger.classList.toggle('active');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('active');
  });
});

// ── Smooth scroll ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  });
});

// ── Contact form ──────────────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✅ Demande envoyée !';
    btn.style.background = '#16a34a';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Envoyer ma demande';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// ── Scroll-reveal with stagger ────────────────────────────
function initScrollReveal() {
  const revealGroups = [
    { selector: '.formation-card',   dir: 'up',   delay: 120 },
    { selector: '.avantage-item',    dir: 'up',   delay: 80  },
    { selector: '.temoignage-item',  dir: 'up',   delay: 100 },
    { selector: '.contact-block',    dir: 'left', delay: 90  },
    { selector: '.lang-flag-item',   dir: 'up',   delay: 60  },
    { selector: '.lang-feat',        dir: 'left', delay: 70  },
    { selector: '.level-item',       dir: 'up',   delay: 80  },
    { selector: '.gallery-img-sm',   dir: 'up',   delay: 100 },
    { selector: '.hero-badge',       dir: 'down', delay: 0   },
    { selector: '.hero-title',       dir: 'up',   delay: 80  },
    { selector: '.hero-subtitle',    dir: 'up',   delay: 160 },
    { selector: '.hero-actions',     dir: 'up',   delay: 220 },
    { selector: '.hero-stats .stat', dir: 'up',   delay: 80  },
    { selector: '.lang-levels-card', dir: 'right',delay: 0   },
    { selector: '.lang-img-box',     dir: 'right',delay: 120 },
    { selector: '.section-header',   dir: 'up',   delay: 0   },
    { selector: '.gallery-feature',  dir: 'left', delay: 0   },
    { selector: '.contact-form-box', dir: 'right',delay: 0   },
  ];

  const getInitial = (dir) => ({
    up:    'translateY(40px)',
    down:  'translateY(-30px)',
    left:  'translateX(-40px)',
    right: 'translateX(40px)',
  }[dir] || 'translateY(40px)');

  revealGroups.forEach(({ selector, dir, delay }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      if (el.dataset.revealed) return;
      el.dataset.revealed = 'pending';
      el.style.opacity = '0';
      el.style.transform = getInitial(dir);
      el.style.transition = `opacity 0.65s cubic-bezier(.22,.68,0,1.2), transform 0.65s cubic-bezier(.22,.68,0,1.2)`;
      el.style.transitionDelay = `${i * delay}ms`;

      revealObserver.observe(el);
    });
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.dataset.revealed === 'pending') {
      entry.target.dataset.revealed = 'done';
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translate(0,0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// ── Animated counter for hero stats ──────────────────────
function animateCounter(el, target, suffix = '', duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start).toLocaleString('fr-FR') + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stats = entry.target.querySelectorAll('.stat strong');
      stats.forEach(stat => {
        const text = stat.dataset.target;
        if (!text) return;
        const num = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d,]/g, '');
        animateCounter(stat, num, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// ── Floating animation for hero visual ───────────────────
const visualCards = document.querySelectorAll('.visual-card');
visualCards.forEach((card, i) => {
  card.style.animation = `float ${2.5 + i * 0.5}s ease-in-out ${i * 0.4}s infinite alternate`;
});

// ── Typing effect for hero badge ─────────────────────────
function typeEffect(el, text, speed = 35) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

// ── Active nav link on scroll ─────────────────────────────
const sections = document.querySelectorAll('section[id], .langues[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ── Parallax on hero shapes ───────────────────────────────
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const s1 = document.querySelector('.hero-shape.s1');
  const s2 = document.querySelector('.hero-shape.s2');
  const s3 = document.querySelector('.hero-shape.s3');
  if (s1) s1.style.transform = `translateY(${y * 0.12}px)`;
  if (s2) s2.style.transform = `translateY(${y * -0.08}px)`;
  if (s3) s3.style.transform = `translateY(${y * 0.06}px)`;
}, { passive: true });

// ── Lang flag hover ripple ────────────────────────────────
document.querySelectorAll('.lang-flag-item').forEach(flag => {
  flag.addEventListener('mouseenter', () => {
    flag.style.transform = 'translateY(-6px) scale(1.06)';
  });
  flag.addEventListener('mouseleave', () => {
    flag.style.transform = '';
  });
});

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Set counter data-targets
  const statEls = document.querySelectorAll('.stat strong');
  statEls.forEach(el => {
    el.dataset.target = el.textContent;
    el.textContent = '0';
  });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  // Init scroll reveal after short delay
  setTimeout(initScrollReveal, 100);
});

// ── Video Player Controls ─────────────────────────────────
(function() {
  const video       = document.getElementById('promoVideo');
  const overlay     = document.getElementById('playOverlay');
  const playBtn     = document.getElementById('playBtn');
  const controls    = document.getElementById('videoControls');
  const muteBtn     = document.getElementById('muteBtn');
  const fullBtn     = document.getElementById('fullBtn');
  const progressBar = document.getElementById('progressBar');

  if (!video) return;

  // Play / pause toggle
  function togglePlay() {
    if (video.paused) {
      video.muted = false;
      video.play();
      overlay.classList.add('hidden');
      controls.classList.add('visible');
    } else {
      video.pause();
      overlay.classList.remove('hidden');
      controls.classList.remove('visible');
    }
  }

  overlay.addEventListener('click', togglePlay);

  // Mute toggle
  muteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? '🔇' : '🔊';
  });

  // Progress bar update
  video.addEventListener('timeupdate', () => {
    if (!video.duration) return;
    const pct = (video.currentTime / video.duration) * 100;
    progressBar.style.width = pct + '%';
  });

  // Seek on progress bar click
  document.querySelector('.vc-progress')?.addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
  });

  // Fullscreen
  fullBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const frame = document.querySelector('.vs-video-frame');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      frame.requestFullscreen?.() || frame.webkitRequestFullscreen?.();
    }
  });

  // Video ends → show overlay again
  video.addEventListener('ended', () => {
    overlay.classList.remove('hidden');
    controls.classList.remove('visible');
    progressBar.style.width = '0%';
  });

  // Autoplay muted when video enters viewport
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.muted = true;
        video.play().then(() => {
          overlay.classList.add('hidden');
          controls.classList.add('visible');
          muteBtn.textContent = '🔇';
        }).catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
        overlay.classList.remove('hidden');
        controls.classList.remove('visible');
      }
    });
  }, { threshold: 0.5 });

  videoObserver.observe(video);
})();
