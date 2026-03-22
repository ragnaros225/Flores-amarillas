/* ═══════════════════════════════════════════════════
   main.js · Flores Amarillas · 21 de Marzo
   - Animación de pétalos en canvas
   - Transición de intro screen
   - Fade-on-scroll con IntersectionObserver
   - Nav scroll effect
   ═══════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────
   CANVAS PÉTALOS
────────────────────────── */
(function initPetalCanvas() {
  const canvas = document.getElementById('petalCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = window.innerWidth;
  let H = window.innerHeight;
  let petals = [];
  let animFrame;
  let isIntroExited = false;

  // Reducir cantidad si prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MAX_PETALS = prefersReducedMotion ? 0 : 35;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Formas de pétalo SVG-like en canvas
  function drawPetal(ctx, x, y, size, rotation, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;

    // Petal shape: ellipse inclinada
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.4, size, 0, 0, Math.PI * 2);

    // Color dorado/amarillo suave
    const hue = 42 + Math.random() * 15; // 42–57 (amarillo–dorado)
    const sat = 80 + Math.random() * 15;
    const lig = 60 + Math.random() * 15;
    ctx.fillStyle = `hsla(${hue}, ${sat}%, ${lig}%, 1)`;
    ctx.fill();

    // Detalle interior con gradiente
    ctx.beginPath();
    ctx.ellipse(0, size * 0.15, size * 0.15, size * 0.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue - 5}, ${sat + 5}%, ${lig - 15}%, 0.25)`;
    ctx.fill();

    ctx.restore();
  }

  function createPetal() {
    const size = 8 + Math.random() * 14; // 8–22px
    return {
      x: Math.random() * W,
      y: -size * 2 - Math.random() * 200,
      size,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      speedX: (Math.random() - 0.5) * 1.2,
      speedY: 0.6 + Math.random() * 1.4,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      wobbleAmp: 1.5 + Math.random() * 2.5,
      opacity: 0.55 + Math.random() * 0.35,
    };
  }

  // Inicializar pétalos escalonados
  for (let i = 0; i < MAX_PETALS; i++) {
    const p = createPetal();
    p.y = Math.random() * H * 1.2; // distribución inicial
    petals.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];

      // Movimiento
      p.wobble += p.wobbleSpeed;
      p.x += p.speedX + Math.sin(p.wobble) * p.wobbleAmp;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      // Dibujar
      drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.opacity);

      // Reset si sale de pantalla
      if (p.y > H + p.size * 3) {
        petals[i] = createPetal();
      }
    }

    animFrame = requestAnimationFrame(animate);
  }

  if (MAX_PETALS > 0) {
    animate();
  }

  // Pausa animación si la página no está visible (perf)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animFrame);
    } else {
      if (MAX_PETALS > 0) {
        animate();
      }
    }
  });

  window._petalCanvas = { start: animate, stop: () => cancelAnimationFrame(animFrame) };
})();


/* ──────────────────────────
   INTRO TRANSITION
────────────────────────── */
(function initIntro() {
  const introScreen = document.getElementById('intro');
  const introBtn    = document.getElementById('introBtn');
  const mainContent = document.getElementById('mainContent');

  if (!introScreen || !introBtn || !mainContent) return;

  function exitIntro() {
    // Animar salida
    introScreen.classList.add('exit');

    // Mostrar contenido principal con retardo
    setTimeout(() => {
      introScreen.style.display    = 'none';
      mainContent.classList.add('visible');
      document.body.style.overflow = 'auto';

      // Trigger primer set de fade-on-scroll inmediatamente para el hero
      document.querySelectorAll('.fade-on-scroll').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.1) {
          el.classList.add('visible');
        }
      });
    }, 1000);
  }

  // Bloquear scroll en la intro
  document.body.style.overflow = 'hidden';

  // Botón de intro
  introBtn.addEventListener('click', exitIntro);

  // También con Enter o Space (accesibilidad)
  introBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      exitIntro();
    }
  });

  // Auto-exit después de 12 segundos (opcional, por experiencia)
  // setTimeout(exitIntro, 12000);
})();


/* ──────────────────────────
   SCROLL: FADE ON SCROLL
────────────────────────── */
(function initFadeOnScroll() {
  const elements = document.querySelectorAll('.fade-on-scroll');
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold:  0.12,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ──────────────────────────
   SCROLL: NAV SHADOW
────────────────────────── */
(function initNavScroll() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 40) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ──────────────────────────
   DESTELLOS en HOVER de flower tiles
────────────────────────── */
(function initFlowerGlitter() {
  const tiles = document.querySelectorAll('.flower-tile');

  tiles.forEach(tile => {
    tile.addEventListener('mouseenter', function () {
      spawnSparkles(tile);
    });
  });

  function spawnSparkles(parent) {
    const colors = ['#f5c842', '#fde06e', '#e6a817', '#fffdf5'];
    const count  = 8;

    for (let i = 0; i < count; i++) {
      const dot  = document.createElement('span');
      const size = 4 + Math.random() * 6;
      const x    = Math.random() * 100;
      const y    = Math.random() * 100;
      const vx   = (Math.random() - 0.5) * 60;
      const vy   = -20 - Math.random() * 40;
      const color = colors[Math.floor(Math.random() * colors.length)];

      dot.style.cssText = `
        position: absolute;
        width:  ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        left: ${x}%;
        top:  ${y}%;
        pointer-events: none;
        z-index: 10;
        transform: translate(0, 0);
        opacity: 1;
        transition: transform 0.7s ease, opacity 0.7s ease;
      `;

      parent.style.position = 'relative';
      parent.style.overflow = 'visible';
      parent.appendChild(dot);

      // Trigger animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dot.style.transform = `translate(${vx}px, ${vy}px)`;
          dot.style.opacity   = '0';
        });
      });

      setTimeout(() => dot.remove(), 750);
    }
  }
})();


/* ──────────────────────────
   EFECTO DE PARALLAX SUAVE en HERO
────────────────────────── */
(function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroBgBlobs = document.querySelector('.hero-bg-blobs');
  if (!heroBgBlobs) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const factor  = scrollY * 0.15;
        heroBgBlobs.style.transform = `translateY(${factor}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
