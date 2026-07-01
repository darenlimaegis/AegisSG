// AEGIS SINGAPORE — main.js
document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('.has-dropdown > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 980) {
          e.preventDefault();
          a.parentElement.classList.toggle('open');
        }
      });
    });
  }

  // Product shelf tabs (used on products.html)
  var shelfButtons = document.querySelectorAll('.shelf-nav button');
  shelfButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-target');
      document.querySelectorAll('.shelf-nav button').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.shelf-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // Animated counters
  var counters = document.querySelectorAll('[data-count]');
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(function (c) { counterObserver.observe(c); });

  function animateCount(el) {
    var end = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = 0;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var val = start + (end - start) * eased;
      el.textContent = (end % 1 !== 0 ? val.toFixed(1) : Math.floor(val)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = end + suffix;
    }
    requestAnimationFrame(step);
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  // Contact form (static demo — no backend)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = 'Message sent ✓';
      btn.disabled = true;
      form.reset();
      setTimeout(function () { btn.textContent = original; btn.disabled = false; }, 3200);
    });
  }
});
