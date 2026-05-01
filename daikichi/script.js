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
  document.querySelectorAll('.flow-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.flow-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.flow-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('flow-' + tab.dataset.tab).classList.add('active');
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

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});
