// ===========================
// Elmship Corporate Site JS - Rich Version
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // --- Header scroll effect ---
  const header = document.getElementById('header');

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Hamburger menu ---
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- Scroll animations with stagger ---
  const animateTargets = document.querySelectorAll(
    '.about-text, .value-item, .business-card, .company-table-wrapper, .contact-content, .stat-item, .shop-info, .shop-map, .section-title'
  );

  animateTargets.forEach((el, i) => {
    el.classList.add('fade-in');
    // Add stagger delay for grid items
    const parent = el.parentElement;
    if (parent) {
      const siblings = parent.querySelectorAll(':scope > .fade-in');
      siblings.forEach((sib, idx) => {
        sib.style.transitionDelay = `${idx * 0.1}s`;
      });
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  animateTargets.forEach(el => observer.observe(el));

  // --- Count-up animation ---
  const countUpTargets = document.querySelectorAll('.stat-number[data-target]');

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const startTime = performance.now();

          const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.round(easedProgress * target);

            el.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          countObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  countUpTargets.forEach(el => countObserver.observe(el));

  // --- Particle effect on hero canvas ---
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.opacitySpeed = (Math.random() - 0.5) * 0.005;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.opacitySpeed;

        if (this.opacity <= 0.05 || this.opacity >= 0.5) {
          this.opacitySpeed *= -1;
        }

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(104, 176, 77, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw lines between nearby particles
    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(104, 176, 77, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawLines();
      animationId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Pause animation when hero is not visible
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animationId) animateParticles();
        } else {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      },
      { threshold: 0 }
    );

    heroObserver.observe(document.getElementById('hero'));
  }

  // --- Smooth scroll for nav links ---
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
