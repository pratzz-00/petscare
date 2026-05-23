/* ================================================
   PET'S CARE SERVICE — SCRIPT v2
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── NAVBAR SCROLL ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── MOBILE NAV ──
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    const s = toggle.querySelectorAll('span');
    s[0].style.transform  = open ? 'rotate(45deg) translate(5px,5px)' : '';
    s[1].style.opacity    = open ? '0' : '1';
    s[2].style.transform  = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.querySelectorAll('span').forEach(s => {
        s.style.transform = ''; s.style.opacity = '1';
      });
    });
  });

  // ── REVEAL ON SCROLL ──
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Use custom --i for stagger if available
        const i = entry.target.style.getPropertyValue('--i');
        const delay = i !== '' ? parseFloat(i) * 80 : 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // ── COUNTER ANIMATION ──
  function animateCounter(el, target, duration = 1800) {
    const suffix = el.nextElementSibling; // .trust-stat__suf
    let start = null;
    const ease = t => t < 0.5 ? 2*t*t : -1+(4-2*t)*t; // easeInOut

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = ease(progress);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const statNums = document.querySelectorAll('.trust-stat__num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (!isNaN(target)) animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => counterObserver.observe(el));

  // ── PARALLAX HERO GEOS ──
  const geos = document.querySelectorAll('.geo');
  const speeds = [0.06, -0.04, 0.03, -0.07, 0.05];
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    geos.forEach((g, i) => {
      g.style.transform = `translateY(${sy * speeds[i % speeds.length]}px)`;
    });
  }, { passive: true });

  // ── 3D TILT ON HERO CARD ──
  const cardMain = document.querySelector('.card-stack__main');
  if (cardMain) {
    const heroVisual = document.querySelector('.hero__visual');
    if (heroVisual) {
      heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        cardMain.style.transform = `perspective(900px) rotateY(${dx * 10}deg) rotateX(${-dy * 6}deg)`;
      });
      heroVisual.addEventListener('mouseleave', () => {
        cardMain.style.transform = '';
        cardMain.style.transition = 'transform 0.6s ease';
        setTimeout(() => { cardMain.style.transition = ''; }, 600);
      });
    }
  }

  // ── 3D TILT ON ABOUT CARD ──
  const aboutCard = document.querySelector('.about__3d-card');
  if (aboutCard) {
    const aboutScene = document.querySelector('.about__3d-scene');
    if (aboutScene) {
      aboutScene.addEventListener('mousemove', (e) => {
        const rect = aboutScene.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        aboutCard.style.transform = `perspective(800px) rotateY(${dx * 12}deg) rotateX(${-dy * 8}deg)`;
        aboutCard.style.transition = 'transform 0.1s ease';
      });
      aboutScene.addEventListener('mouseleave', () => {
        aboutCard.style.transform = '';
        aboutCard.style.transition = 'transform 0.6s ease';
      });
    }
  }

  // ── SERVICE CARD 3D TILT ──
  document.querySelectorAll('.svc-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-8px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease, background 0.4s, border-color 0.4s, box-shadow 0.4s';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });

  // ── WHY CARD TILT ──
  document.querySelectorAll('.why-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(500px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── OFFER DIAL SPIN ON HOVER ──
  const dialSvg = document.querySelector('.offer__dial-svg');
  if (dialSvg) {
    dialSvg.addEventListener('mouseenter', () => {
      dialSvg.style.transform = 'scale(1.06) rotate(5deg)';
      dialSvg.style.transition = 'transform 0.5s cubic-bezier(.22,1,.36,1)';
    });
    dialSvg.addEventListener('mouseleave', () => {
      dialSvg.style.transform = '';
    });
  }

  // ── CONTACT FORM ──
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Request Sent — We\'ll Call You Shortly';
      btn.style.background = 'linear-gradient(135deg, #4ade80, #16a34a)';
      btn.style.boxShadow = '0 4px 0 #0a6020, 0 8px 24px rgba(22,163,74,0.35)';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.boxShadow = '';
        btn.disabled = false;
        form.reset();
      }, 5000);
    });
  }

  // ── SMOOTH ACTIVE NAV LINK ──
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav__links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navAs.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--gold-light)' : '';
    });
  }, { passive: true });

  // ── HEARTBEAT PATH RE-TRIGGER ──
  // Re-animate heartbeat every few seconds
  const hbPath = document.querySelector('.heartbeat-path');
  if (hbPath) {
    setInterval(() => {
      hbPath.style.animation = 'none';
      hbPath.getBoundingClientRect(); // reflow
      hbPath.style.animation = '';
      hbPath.style.strokeDashoffset = '500';
      hbPath.style.animation = 'draw-hb 3s ease forwards';
    }, 5000);
  }

  // ── CURSOR GLOW ON HERO ──
  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth > 768) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position:absolute; width:300px; height:300px; border-radius:50%;
      background:radial-gradient(circle, rgba(201,146,42,0.08) 0%, transparent 70%);
      pointer-events:none; transform:translate(-50%,-50%); z-index:0; transition:opacity 0.3s;
    `;
    hero.appendChild(glow);
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      glow.style.left = (e.clientX - rect.left) + 'px';
      glow.style.top  = (e.clientY - rect.top)  + 'px';
    });
    hero.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
    hero.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
  }

});
