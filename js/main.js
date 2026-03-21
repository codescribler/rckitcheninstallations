/* RC Kitchen Installations — Main Script */

(function () {
    'use strict';

    /* ----------------------------------------
       NAV: Scroll Effect
       ---------------------------------------- */
    var nav = document.getElementById('nav');
    var lastScroll = 0;

    function onScroll() {
        var y = window.scrollY;
        if (y > 60) {
            nav.classList.add('nav--solid');
        } else {
            nav.classList.remove('nav--solid');
        }
        lastScroll = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ----------------------------------------
       NAV: Mobile Toggle
       ---------------------------------------- */
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');

    toggle.addEventListener('click', function () {
        var open = menu.classList.toggle('active');
        toggle.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    /* ----------------------------------------
       MODAL
       ---------------------------------------- */
    var modal = document.getElementById('modal');
    var backdrop = document.getElementById('modalBackdrop');
    var closeBtn = document.getElementById('modalClose');
    var triggers = document.querySelectorAll('[data-modal]');
    var previousFocus = null;

    function openModal() {
        previousFocus = document.activeElement;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (previousFocus) previousFocus.focus();
    }

    triggers.forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            openModal();
        });
    });

    backdrop.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Focus trap
    modal.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') return;
        var focusable = modal.querySelectorAll('button, [href], input, select, textarea');
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) { last.focus(); e.preventDefault(); }
        } else {
            if (document.activeElement === last) { first.focus(); e.preventDefault(); }
        }
    });

    /* ----------------------------------------
       SCROLL REVEAL
       ---------------------------------------- */
    var reveals = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        reveals.forEach(function (el) { observer.observe(el); });
    } else {
        // Fallback: show everything immediately
        reveals.forEach(function (el) { el.classList.add('revealed'); });
    }

    /* ----------------------------------------
       SMOOTH SCROLL for anchor links
       ---------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            var target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            var navH = nav.offsetHeight || 80;
            var y = target.getBoundingClientRect().top + window.scrollY - navH;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });

})();
