document.addEventListener('DOMContentLoaded', function () {
  initNavScroll();
  initMobileNav();
  initRevealOnScroll();
  initSmoothScroll();
  initLightbox();
});

function initNavScroll() {
  var nav = document.getElementById('nav');
  if (!nav) return;

  var scrolled = false;
  window.addEventListener('scroll', function () {
    var shouldBeScrolled = window.scrollY > 40;
    if (shouldBeScrolled !== scrolled) {
      scrolled = shouldBeScrolled;
      nav.classList.toggle('nav--scrolled', scrolled);
    }
  }, { passive: true });
}

function initMobileNav() {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  links.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && links.classList.contains('is-open')) {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
}

function initRevealOnScroll() {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(function (el) { observer.observe(el); });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var navHeight = document.getElementById('nav').offsetHeight;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}

function initLightbox() {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');
  if (!lightbox || !lightboxImg || !lightboxClose) return;

  var galleryItems = document.querySelectorAll('.gallery__item, .design-work__item');
  var previousFocus = null;

  galleryItems.forEach(function (item) {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');

    function openFromItem() {
      var img = item.querySelector('img');
      if (!img) return;
      previousFocus = item;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'Full size image';
      lightbox.hidden = false;

      requestAnimationFrame(function () {
        lightbox.classList.add('is-active');
        lightboxClose.focus();
      });
      document.body.style.overflow = 'hidden';
    }

    item.addEventListener('click', openFromItem);
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFromItem();
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('is-active');
    document.body.style.overflow = '';

    lightbox.addEventListener('transitionend', function handler() {
      lightbox.hidden = true;
      lightboxImg.src = '';
      lightbox.removeEventListener('transitionend', handler);
      if (previousFocus) previousFocus.focus();
    });
  }

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox__content')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
      closeLightbox();
    }
  });
}
