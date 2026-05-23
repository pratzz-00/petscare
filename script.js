/* =============================================
   PET'S CARE SERVICE — SCRIPTS
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ---- NAVBAR SCROLL ----
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ---- MOBILE NAV TOGGLE ----
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    const isOpen = links.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  // Close nav when clicking a link
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
    });
  });

  // ---- INTERSECTION OBSERVER FOR REVEALS ----
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));

  // ---- SERVICE CARD STAGGERED REVEAL ----
  const serviceCards = document.querySelectorAll('.service-card');
  const svcObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.getPropertyValue('--delay') || '0s';
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add('visible');
        svcObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  serviceCards.forEach(c => svcObserver.observe(c));

  // ---- COUNTER ANIMATION ----
  function animateCounter(el, target, duration = 1500) {
    let start = 0;
    const isFloat = target % 1 !== 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = isFloat ? start.toFixed(1) : Math.floor(start) + (el.dataset.suffix || '');
    }, 16);
  }
  const counters = document.querySelectorAll('.trust-item strong');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseFloat(text.replace(/[^\d.]/g, ''));
        const suffix = text.replace(/[\d.]/g, '');
        el.dataset.suffix = suffix;
        if (!isNaN(num)) animateCounter(el, num);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ---- CONTACT FORM ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = '✅ Request Sent! We\'ll Call You Soon';
      btn.style.background = '#2d7a4f';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 4000);
    });
  }

  // ---- SMOOTH ACTIVE LINK HIGHLIGHT ----
  const sections = document.querySelectorAll('section[id], div[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navAnchors.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });

  // ---- PARALLAX BLOBS ----
  const blob1 = document.querySelector('.hero__blob--1');
  const blob2 = document.querySelector('.hero__blob--2');
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (blob1) blob1.style.transform = `translateY(${sy * 0.2}px)`;
    if (blob2) blob2.style.transform = `translateY(${-sy * 0.15}px)`;
  });

  // ---- OFFER BADGE SPARKLE ----
  const badge = document.querySelector('.offer__badge');
  if (badge) {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'scale(1.06) rotate(-3deg)';
      badge.style.transition = 'transform 0.3s ease';
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = '';
    });
  }

});
