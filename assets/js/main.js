/* Loop / Notebook — interactions. No dependencies beyond Bootstrap's bundle. */
(function () {
  'use strict';

  /* 1. Reading progress -------------------------------------------------- */
  var bar = document.getElementById('readingBar');
  if (bar) {
    var ticking = false;
    var update = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = pct.toFixed(2) + '%';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* 2. Highlight the section you're reading ------------------------------ */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav .nav-link'));
  var watched = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (watched.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-current', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    watched.forEach(function (s) { spy.observe(s); });
  }

  /* 3. Close the mobile menu after tapping a link ------------------------ */
  var menu = document.getElementById('navLinks');
  if (menu && window.bootstrap) {
    navLinks.forEach(function (a) {
      a.addEventListener('click', function () {
        if (menu.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });
  }

  /* 4. Linear ↔ circular lifecycle diagram ------------------------------- */
  var diagram = document.getElementById('flowDiagram');
  var note = document.getElementById('diagramNote');
  var notes = {
    linear: 'In the linear version every arrow points one way. Once the device stops being wanted, the aluminium, gold and cobalt inside it stop being available to anyone.',
    circular: 'The redesign keeps the same five stages but adds three return routes. Reuse feeds distribution, refurbishment feeds manufacturing, and recycled metals feed the material supply — so end of life becomes a supplier rather than a bin.'
  };

  document.querySelectorAll('.mode-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var mode = btn.dataset.mode;
      document.querySelectorAll('.mode-btn').forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', String(on));
      });
      if (diagram) diagram.dataset.mode = mode;
      if (note && notes[mode]) note.textContent = notes[mode];
    });
  });

  /* 5. Material filter ---------------------------------------------------- */
  var cards = Array.prototype.slice.call(document.querySelectorAll('.mat'));
  var empty = document.getElementById('materialEmpty');

  document.querySelectorAll('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filter = chip.dataset.filter;
      document.querySelectorAll('.chip').forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-pressed', String(on));
      });

      var shown = 0;
      cards.forEach(function (card) {
        var tags = (card.dataset.tags || '').split(' ');
        var show = filter === 'all' || tags.indexOf(filter) !== -1;
        card.hidden = !show;
        if (show) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    });
  });

  /* 6. Fill the emissions bar when it comes into view --------------------- */
  var split = document.querySelector('.split[data-fill]');
  if (split) {
    if ('IntersectionObserver' in window) {
      var fill = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.setAttribute('data-filled', ''); obs.unobserve(e.target); }
        });
      }, { threshold: 0.35 });
      fill.observe(split);
    } else {
      split.setAttribute('data-filled', '');
    }
  }

  /* 7. If a photo is missing, show a labelled placeholder instead of a break */
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    var flag = function () {
      var slot = img.closest('.figure-slot');
      if (slot) slot.classList.add('is-missing');
    };
    img.addEventListener('error', flag);
    if (img.complete && img.naturalWidth === 0) flag();
  });
})();
