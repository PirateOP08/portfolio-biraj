/* =====================================================
   Biraj Pokharel — Cybersecurity Portfolio
   script.js
   ===================================================== */

// ── Custom Cursor ──────────────────────────────────────
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top  = my - 6 + 'px';
});

function animateRing() {
  rx += (mx - rx - 18) * 0.12;
  ry += (my - ry - 18) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .skill-card, .cert-card, .badge-card, .exp-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    cursorRing.style.borderColor = 'var(--accent2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorRing.style.borderColor = 'var(--accent)';
  });
});


// ── Page Navigation ────────────────────────────────────
function showPage(id) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Deactivate all nav links
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  // Show target page
  const page = document.getElementById('page-' + id);
  const nav  = document.getElementById('nav-' + id);
  if (page) page.classList.add('active');
  if (nav)  nav.classList.add('active');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Trigger reveal animations on new page
  setTimeout(triggerReveal, 60);
}

// Make showPage global so onclick attributes work
window.showPage = showPage;


// ── Scroll Reveal ──────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

function triggerReveal() {
  document.querySelectorAll('.page.active .reveal').forEach(el => {
    revealObserver.observe(el);
  });
}

// Run on initial load
triggerReveal();


// ── Keyboard Shortcuts (optional easter egg) ──────────
document.addEventListener('keydown', e => {
  const map = {
    '1': 'home', '2': 'about', '3': 'skills',
    '4': 'experience', '5': 'education',
    '6': 'certifications', '7': 'tryhackme', '8': 'contact'
  };
  if (map[e.key]) showPage(map[e.key]);
});
