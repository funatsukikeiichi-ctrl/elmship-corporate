// 買取大吉 西宮夙川2号線店 HP
document.addEventListener('DOMContentLoaded', () => {

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // Close mobile nav on link click
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    });
  });

  // Flow tabs
  function activateFlowTab(tabName) {
    document.querySelectorAll('.flow-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.flow-content').forEach(c => c.classList.remove('active'));
    const targetTab = document.querySelector(`.flow-tab[data-tab="${tabName}"]`);
    const targetContent = document.getElementById('flow-' + tabName);
    if (targetTab) targetTab.classList.add('active');
    if (targetContent) targetContent.classList.add('active');
  }

  document.querySelectorAll('.flow-tab').forEach(tab => {
    tab.addEventListener('click', () => activateFlowTab(tab.dataset.tab));
  });

  // Hero service buttons → scroll to flow + activate tab
  document.querySelectorAll('.service-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      activateFlowTab(btn.dataset.tab);
      document.getElementById('flow')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Contact form (placeholder - sends to store email)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value;
      const phone = form.querySelector('#phone').value;
      const email = form.querySelector('#email').value;
      const message = form.querySelector('#message').value;

      const subject = encodeURIComponent('【HP問い合わせ】' + name + '様');
      const body = encodeURIComponent(
        'お名前: ' + name + '\n' +
        'お電話: ' + phone + '\n' +
        'メール: ' + email + '\n' +
        '内容:\n' + message
      );
      window.location.href = 'mailto:nishinomiya-shukugawa2@kaitoridaikichi.jp?subject=' + subject + '&body=' + body;
    });
  }

  // --- Hero title: character-by-character fade-in ---
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const html = heroTitle.innerHTML;
    // Split text while preserving <br> tags
    let charIndex = 0;
    const newHtml = html.replace(/(<br\s*\/?>)|([^<])/g, (match, br, char) => {
      if (br) return br;
      const span = `<span class="char" style="transition-delay: ${0.8 + charIndex * 0.05}s">${char}</span>`;
      charIndex++;
      return span;
    });
    heroTitle.innerHTML = newHtml;

    // Trigger after short delay
    setTimeout(() => {
      heroTitle.querySelectorAll('.char').forEach(c => c.classList.add('visible'));
    }, 300);
  }

  // --- Scroll animations with stagger for individual elements ---
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Section-level fade-in
  document.querySelectorAll('.section').forEach(el => {
    el.classList.add('fade-in');
    itemObserver.observe(el);
  });

  // Individual card stagger (items, flow steps, service chips)
  const staggerTargets = document.querySelectorAll(
    '.item-card-img, .flow-step, .feature, .service-chip, .faq-item, .about-grid > *, .required-card, .greeting-content > *'
  );
  staggerTargets.forEach((el, i) => {
    el.classList.add('fade-in-item');
    // Stagger within same parent
    const parent = el.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(c => c.classList.contains('fade-in-item'));
      const idx = siblings.indexOf(el);
      el.style.transitionDelay = `${idx * 0.08}s`;
    }
    itemObserver.observe(el);
  });

  // About image: slide from left, text: slide from right
  const aboutImage = document.querySelector('.about-image');
  const aboutText = document.querySelector('.about-text');
  if (aboutImage) { aboutImage.classList.add('fade-in-left'); itemObserver.observe(aboutImage); }
  if (aboutText) { aboutText.classList.add('fade-in-right'); itemObserver.observe(aboutText); }

  // Greeting image + text
  const greetingImg = document.querySelector('.greeting-image');
  const greetingText = document.querySelector('.greeting-text');
  if (greetingImg) { greetingImg.classList.add('fade-in-scale'); itemObserver.observe(greetingImg); }
  if (greetingText) { greetingText.classList.add('fade-in-right'); itemObserver.observe(greetingText); }

  // Section titles
  document.querySelectorAll('.section-title').forEach(el => {
    el.classList.add('fade-in-item');
    itemObserver.observe(el);
  });

  // --- 3D Tilt on item cards (desktop only) ---
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.item-card-img').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // --- Smooth scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
