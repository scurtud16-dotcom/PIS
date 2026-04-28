/* ════════════════════════════════════════════
   DaHouse – script.js  (shared across all pages)
════════════════════════════════════════════ */

/* ── Burger / Mobile Menu ── */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

/* ── Header shadow on scroll ── */
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── Mark active nav link based on current page ── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-list .nav-link, .mobile-menu .nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (
    href === currentPage ||
    (currentPage === '' && href === 'index.html') ||
    (currentPage === 'index.html' && href === 'index.html')
  ) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

/* ── Reveal animations (IntersectionObserver) ── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
if (revealEls.length) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObs.observe(el));
}

/* ── Counter animation ── */
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
if (statNumbers.length) {
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      const inc    = target / (1600 / 16);
      let   cur    = 0;
      const tick   = () => {
        cur += inc;
        if (cur >= target) { el.textContent = target + '+'; counterObs.unobserve(el); return; }
        el.textContent = Math.floor(cur);
        requestAnimationFrame(tick);
      };
      tick();
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => counterObs.observe(el));
}

/* ── Parallax on hero image (index only) ── */
const heroImg = document.getElementById('hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight)
      heroImg.style.transform = `scale(1) translateY(${window.scrollY * 0.18}px)`;
  }, { passive: true });
}

/* ── Project filter (proiecte.html) ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-cat]');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      projectCards.forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

/* ── Contact form (contact.html) ── */
const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const requiredFields = [
      document.getElementById('name'),
      document.getElementById('email'),
      document.getElementById('message')
    ];
    let valid = true;
    requiredFields.forEach(f => {
      if (!f || !f.value.trim()) {
        if (f) {
          f.style.borderColor = '#c0392b';
          f.addEventListener('input', () => f.style.borderColor = '', { once: true });
        }
        valid = false;
      }
    });
    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]');
    const origHtml = btn.innerHTML;
    btn.textContent = 'Se trimite…';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.innerHTML = origHtml;
      btn.disabled = false;
      if (formSuccess) {
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }
    }, 1200);
  });
}

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 80,
      behavior: 'smooth'
    });
  });
});
