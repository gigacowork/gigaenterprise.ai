// gigaenterprise.ai — main.js

document.addEventListener('DOMContentLoaded', function () {

  // ── Dropdown с задержкой скрытия ──────────────────────────────
  document.querySelectorAll('.nav-links > li').forEach(function (li) {
    if (!li.querySelector('.dropdown')) return;

    var timer;
    var pinned = false;

    li.addEventListener('mouseenter', function () {
      clearTimeout(timer);
      li.classList.add('open');
    });

    li.addEventListener('mouseleave', function () {
      if (pinned) return;
      timer = setTimeout(function () {
        li.classList.remove('open');
      }, 400);
    });

    var btn = li.querySelector('.nav-btn');
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = li.classList.contains('open');
        if (!isOpen || !pinned) {
          clearTimeout(timer);
          li.classList.add('open');
          pinned = true;
        } else {
          li.classList.remove('open');
          pinned = false;
        }
      });
    }

    document.addEventListener('click', function (e) {
      if (!li.contains(e.target)) {
        pinned = false;
        clearTimeout(timer);
        li.classList.remove('open');
      }
    });
  });


  // ── CTA Form ───────────────────────────────────────────────────
  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const form = ctaBtn.closest('.cta-form');
      const inputs = form.querySelectorAll('.cta-input');
      let valid = true;
      inputs.forEach(function (input) {
        if (!input.value.trim()) {
          input.style.borderColor = 'rgba(239,68,68,0.6)';
          valid = false;
        } else {
          input.style.borderColor = '';
        }
      });
      if (valid) {
        ctaBtn.textContent = 'Заявка отправлена ✓';
        ctaBtn.style.background = 'var(--accent-dk)';
        ctaBtn.disabled = true;
      }
    });
  }

  // ── Phone mask ─────────────────────────────────────────────────
  const phoneInput = document.querySelector('input[type="tel"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      let val = this.value.replace(/\D/g, '');
      if (val.startsWith('8')) val = '7' + val.slice(1);
      if (val.startsWith('7')) {
        val = '+7 (' + val.slice(1, 4) + ') ' + val.slice(4, 7) + '-' + val.slice(7, 9) + '-' + val.slice(9, 11);
      }
      this.value = val.trim().replace(/[-\s]+$/, '');
    });
  }

  // ── Scroll animations ──────────────────────────────────────────
  const animEls = document.querySelectorAll('.pillar-card, .case-card, .platform-card, .cert-item');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      observer.observe(el);
    });
  }

});
