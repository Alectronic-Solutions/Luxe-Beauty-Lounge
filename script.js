// ── Active nav link ───────────────────────────────────────────
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    const href = a.getAttribute('href').split('#')[0].split('/').pop() || 'index.html';
    if (href === path && !a.classList.contains('nav__cta')) {
      a.classList.add('nav--active');
    }
  });
})();

// ── Scroll progress bar ───────────────────────────────────────
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  }, { passive: true });
}

// ── Nav scroll state ──────────────────────────────────────────
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Back to top ───────────────────────────────────────────────
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 500);
}, { passive: true });
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Mobile sticky Book CTA ────────────────────────────────────
const mobileBookCta = document.getElementById('mobile-book-cta');
if (mobileBookCta) {
  window.addEventListener('scroll', () => {
    const heroBottom = document.querySelector('.hero')?.getBoundingClientRect().bottom ?? 0;
    const nearFooter = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 120);
    mobileBookCta.classList.toggle('show', heroBottom < 0 && !nearFooter);
    mobileBookCta.setAttribute('aria-hidden', String(!mobileBookCta.classList.contains('show')));
  }, { passive: true });
}

// ── Hamburger ─────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
});
navMenu.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }
});


// ── Reviews carousel (fade) ───────────────────────────────────
const slides  = Array.from(document.querySelectorAll('.review-slide'));
const dots    = Array.from(document.querySelectorAll('.reviews__dot'));
const prevBtn = document.getElementById('reviews-prev');
const nextBtn = document.getElementById('reviews-next');
const carousel = document.getElementById('reviews-carousel');
let   current = 0;
let   timer;

// Lock carousel height to tallest slide so layout never shifts
function lockCarouselHeight() {
  if (!carousel || !slides.length) return;
  // Temporarily make all slides visible & in-flow to measure natural height
  slides.forEach(s => {
    s.style.position = 'static';
    s.style.opacity  = '1';
    s.style.display  = 'flex';
  });
  const tallest = Math.max(...slides.map(s => s.offsetHeight));
  slides.forEach(s => {
    s.style.position = '';
    s.style.opacity  = '';
    s.style.display  = '';
  });
  carousel.style.height = tallest + 'px';
}

function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  dots[current].setAttribute('aria-selected', 'false');

  current = (index + slides.length) % slides.length;

  slides[current].classList.add('active');
  dots[current].classList.add('active');
  dots[current].setAttribute('aria-selected', 'true');
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => goTo(current + 1), 6000);
}

if (slides.length) {
  // Run after fonts are loaded so measurement is accurate
  if (document.fonts) {
    document.fonts.ready.then(lockCarouselHeight);
  } else {
    window.addEventListener('load', lockCarouselHeight);
  }
  window.addEventListener('resize', lockCarouselHeight);

  prevBtn?.addEventListener('click', () => { goTo(current - 1); startTimer(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); startTimer(); });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });
  startTimer();
}

// Pause on hover/focus
carousel?.addEventListener('mouseenter', () => clearInterval(timer));
carousel?.addEventListener('mouseleave', startTimer);
carousel?.addEventListener('focusin',    () => clearInterval(timer));
carousel?.addEventListener('focusout',   startTimer);

// ── Contact form (EmailJS) ────────────────────────────────────
const contactForm   = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');
const contactSubmit = document.getElementById('contact-submit');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const SERVICE_ID  = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

    contactSubmit.disabled    = true;
    contactSubmit.textContent = 'Sending...';
    contactStatus.textContent = '';
    contactStatus.className   = '';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm)
      .then(() => {
        contactStatus.textContent = "Message sent! We'll be in touch within 24 hours.";
        contactStatus.className   = 'success';
        contactForm.reset();
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        contactStatus.textContent = 'Something went wrong. Please call us at (916) 555-0100.';
        contactStatus.className   = 'error';
      })
      .finally(() => {
        contactSubmit.disabled    = false;
        contactSubmit.textContent = 'Send Message';
      });
  });
}

// ── Scroll reveal ─────────────────────────────────────────────
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Individual reveals
  document.querySelectorAll(
    '.svc, .contact__trust-item, .hours__row, .section-header, ' +
    '.about__body, .about__text .btn, .footer__brand, .footer__nav, .footer__contact'
  ).forEach(el => {
    el.classList.add('reveal');
    revealObs.observe(el);
  });

  // Group reveals (children stagger)
  document.querySelectorAll('.hero__bottom, .footer__inner').forEach(el => {
    el.classList.add('reveal-group');
    revealObs.observe(el);
  });
}
