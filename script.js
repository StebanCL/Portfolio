document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     0. LLUVIA DE ESTRELLAS DE PÍXELES (pantalla de inicio)
     ========================================================= */
  const starsCanvas = document.getElementById('falling-stars');
  const sctx = starsCanvas.getContext('2d');
  const orangeTones = ['#ff6a1a', '#ffb347', '#ff8c42', '#ffd27f', '#e85d04'];
  let starParticles = [];

  function resizeCanvas() {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
  }
  function spawnStar() {
    const size = 2 + Math.random() * 3;
    return {
      x: Math.random() * starsCanvas.width,
      y: -10,
      size,
      speed: 0.6 + Math.random() * 1.6,
      color: orangeTones[Math.floor(Math.random() * orangeTones.length)],
      drift: (Math.random() - 0.5) * 0.4
    };
  }
  resizeCanvas();
  for (let i = 0; i < 46; i++) {
    const s = spawnStar();
    s.y = Math.random() * starsCanvas.height;
    starParticles.push(s);
  }
  window.addEventListener('resize', resizeCanvas);

  function drawStars() {
    const landingEl = document.getElementById('landing');
    if (!landingEl.classList.contains('hidden')) {
      sctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
      starParticles.forEach(s => {
        s.y += s.speed;
        s.x += s.drift;
        if (s.y > starsCanvas.height + 10) {
          Object.assign(s, spawnStar());
        }
        sctx.fillStyle = s.color;
        sctx.fillRect(s.x, s.y, s.size, s.size);
      });
    }
    requestAnimationFrame(drawStars);
  }
  drawStars();

  /* =========================================================
     1. TEMA (dark / light)
     ========================================================= */
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const applyTheme = (t) => {
    root.setAttribute('data-theme', t);
    themeBtn.textContent = t === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', t);
  };
  applyTheme(localStorage.getItem('theme') || 'dark');
  themeBtn.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* =========================================================
     1.b COLOR DE ACENTO — los 7 colores del arcoíris
     ========================================================= */
  const RAINBOW = [
    { name: 'rojo',    accent: '#ff3b3b', accent2: '#ff8a8a', glow: 'rgba(255, 59, 59, 0.55)' },
    { name: 'naranja', accent: '#ff6a1a', accent2: '#ffb347', glow: 'rgba(255, 106, 26, 0.55)' },
    { name: 'amarillo',accent: '#ffcc1a', accent2: '#fff08a', glow: 'rgba(255, 204, 26, 0.5)' },
    { name: 'verde',   accent: '#2ecc71', accent2: '#8af0b0', glow: 'rgba(46, 204, 113, 0.5)' },
    { name: 'azul',    accent: '#2e8bff', accent2: '#8ac2ff', glow: 'rgba(46, 139, 255, 0.5)' },
    { name: 'indigo',  accent: '#5b3eea', accent2: '#a996f7', glow: 'rgba(91, 62, 234, 0.5)' },
    { name: 'violeta', accent: '#c23eea', accent2: '#eaa4f7', glow: 'rgba(194, 62, 234, 0.5)' }
  ];

  const colorBtn = document.getElementById('color-toggle');

  function applyAccent(i) {
    const c = RAINBOW[i];
    root.style.setProperty('--accent', c.accent);
    root.style.setProperty('--accent-2', c.accent2);
    root.style.setProperty('--accent-glow', c.glow);
    root.style.setProperty('--border', c.accent.replace('#', 'rgba-placeholder'));
    // el borde usa el mismo tono de acento con transparencia, calculado desde el hex
    const hex = c.accent.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    root.style.setProperty('--border', `rgba(${r}, ${g}, ${b}, 0.28)`);
    localStorage.setItem('accentIndex', String(i));
  }

  let accentIndex = localStorage.getItem('accentIndex');
  accentIndex = accentIndex === null ? Math.floor(Math.random() * RAINBOW.length) : parseInt(accentIndex, 10);
  applyAccent(accentIndex);

  colorBtn.addEventListener('click', () => {
    accentIndex = (accentIndex + 1) % RAINBOW.length;
    applyAccent(accentIndex);
  });

  /* =========================================================
     2. IDIOMA (ES / EN) — data-i18n dictionary
     ========================================================= */
  const dict = {
    es: {
      land_eyebrow: "Aprendiz ADSO · Bogotá, Colombia",
      land_sub: "Desarrollador fullstack construyendo software con lógica sólida y asistencia de IA — a esto le llamo <strong>Vibecoding</strong>.",
      mode_reading_title: "Modo Lectura",
      mode_reading_desc: "Recorre el portafolio con scroll normal, o arrastra con el mouse para moverte a los lados.",
      mode_explore_title: "Modo Exploración",
      mode_explore_desc: "Controla a un mapache pixelado con las flechas del teclado (o el joystick en celular) y descubre el contenido caminando.",
      land_hint: "Elige un modo para entrar al portafolio ↑",
      back_btn: "← Volver",
      music_sub: "Ambiente del taller de código",
      badge_active: "Activo",
      badge_role: "Aprendiz ADSO",
      badge_method: "Vibecoding",
      tag_about: "Sobre mí",
      about_title: "Análisis + código + IA",
      about_text: "Soy Aprendiz SENA del Tecnólogo en Análisis y Desarrollo de Software (ADSO). Trabajo con HTML5, CSS3, JavaScript, Python y Django, y complemento cada proyecto con levantamiento de requerimientos, modelado UML/MER y documentación técnica. Mi sello es el <strong>Vibecoding</strong>: usar herramientas de IA para depurar más rápido, explorar arquitecturas y mantener la calidad del código sin perder de vista el negocio detrás del software.",
      about_text_short: "Aprendiz ADSO enfocado en desarrollo web con Python, Django y JavaScript, apoyado en IA (Vibecoding).",
      stat_english: "Inglés técnico",
      stat_formacion: "Formación ADSO",
      stat_ia: "Vibecoding diario",
      tag_skills: "Habilidades",
      skills_title: "Caja de herramientas",
      skill_ia_title: "IA aplicada",
      skill_ia_desc: "Debugging asistido, generación de código, MediaPipe / visión por computador",
      tag_projects: "Proyectos",
      projects_title: "Lo que he construido",
      projects_sub: "Haz clic en una tarjeta para expandirla y ver el detalle técnico.",
      proj_barberia_p1: "Proyecto grupal SENA: sistema completo de agendamiento de citas para una barbería. Diseñé modelos como <code>ConfiguracionHorario</code> (singleton de horario del negocio), <code>DiaHabilitado</code> y <code>BarberoDiaHabilitado</code> para que cada barbero administre su disponibilidad de forma independiente.",
      proj_barberia_p2: "El flujo de reserva usa AJAX con validaciones en capas (frontend y backend) para evitar choques de horario y dobles envíos. Integramos además un módulo de <strong>análisis de forma de rostro</strong> con MediaPipe Face Mesh, calibrado con proporciones faciales confiables (largo/pómulo, mandíbula/pómulo) en vez de depender de puntos de la frente, que fallaban por oclusión del cabello.",
      proj_barberia_l1: "Panel de administración de horarios por barbero y por día",
      proj_barberia_l2: "Reservas AJAX con validación de disponibilidad en tiempo real",
      proj_barberia_l3: "Recomendación de corte según forma de rostro (visión por computador)",
      proj_barberia_l4: "Migración de entorno: Python 3.11, Django 4.2 para compatibilidad con MariaDB 10.4",
      proj_barberia_short: "Agendamiento con Django + MediaPipe para análisis facial.",
      proj_crud_p1: "Sistema de gestión desarrollado en PHP nativo aplicando Programación Orientada a Objetos. Trabajé el mapeo de IDs entre entidades, sesiones seguras y la conversión de consultas SQL en interfaces dinámicas con Bootstrap.",
      proj_crud_short: "PHP + MySQL, POO y sesiones seguras.",
      proj_yt_p1: "Reto de lógica pura: un dispatcher de animaciones en JavaScript que coordina más de 30 efectos (clip-path, cubic-bezier) para \"destruir\" la interfaz de YouTube de forma controlada, sin perder rendimiento.",
      proj_yt_short: "Animaciones JS a gran escala.",
      proj_color_title: "Cheatsheet de Psicología del Color",
      proj_color_p1: "Guía interactiva sobre teoría del color aplicada a interfaces, construida para practicar composición visual y jerarquía tipográfica con Bootstrap.",
      proj_google_p1: "Maquetación pixel a pixel del buscador de Google, enfocada en precisión visual, grid y componentes interactivos con JavaScript nativo.",
      proj_clones_title: "Clones visuales (Facebook / Laika)",
      proj_clones_p1: "Serie de réplicas de interfaz para practicar maquetación real: la estructura de feed de Facebook y el landing de Laika, enfocadas en fidelidad visual, responsive design y buenas prácticas de Bootstrap.",
      btn_visit_laika: "Ver clon de Laika ↗",
      proj_astro_title: "Astro-Tracker · Radar Heliocéntrico",
      proj_astro_p1: "Aplicación full-stack tipo \"Command Center\" que visualiza la posición real de los planetas del sistema solar usando Skyfield y efemérides de la NASA (<code>de421.bsp</code>), servidas por una API en Flask y dibujadas en tiempo real sobre un Canvas.",
      proj_astro_p2: "Incluye un sistema Tierra-Luna con órbita visual real, un monitor que predice el próximo eclipse analizando la alineación de nodos lunares y solares con historial anual, y un reloj mundial con indicador día/noche según la zona horaria elegida.",
      proj_astro_l1: "Radar heliocéntrico con cálculo dinámico del centro según el tamaño del canvas",
      proj_astro_l2: "Predicción e historial de eclipses solares y lunares del año en curso",
      proj_astro_l3: "Reloj mundial con actualización asíncrona cada 2 segundos",
      proj_astro_l4: "Interfaz \"glassmorphism\" con <code>backdrop-filter</code> y gradientes radiales",
      btn_visit_repo: "Ver repositorio ↗",
      proj_modals_title: "Modals Class Example",
      proj_modals_p1: "Proyecto de práctica enfocado en dominar el sistema de modales de Bootstrap: distintos disparadores, tamaños y comportamientos, organizados con clases reutilizables para entender bien su ciclo de vida en el DOM.",
      proj_feline_title: "Feline Society · AstroShop Admin Panel",
      proj_feline_p1: "Panel administrativo para AstroShop (tienda de equipos de astronomía) con una identidad visual \"Soft UI\" inspirada en gatos: bordes redondeados, paleta pastel y tipografías cálidas (Chelsea Market / Dancing Script).",
      proj_feline_p2: "Estructurado en módulos independientes (usuarios, inventario y sistema) dentro de un panel <code>ADMIN</code>, separando estilos globales de estilos de formularios para mantener el proyecto organizado y escalable.",
      proj_magna_title: "Magna Solutions S.A.S · Portafolio Corporativo",
      proj_magna_p1: "Sitio web oficial para una microempresa en formación, diseñado para exponer sus servicios integrales (Contabilidad, SST, Bienestar y Eventos) con una interfaz profesional enfocada en generar contactos y solicitudes de cotización.",
      btn_visit: "Visitar sitio ↗",
      tag_future: "Enfoque a futuro",
      future_title: "IA como acelerador, no como atajo",
      future_text: "Quiero seguir construyendo software combinando fundamentos sólidos de análisis con herramientas de IA que aceleren la depuración, la investigación de arquitecturas y la adaptación a nuevas tecnologías. Mi meta en la etapa práctica es aplicar este enfoque en proyectos reales, midiendo impacto en calidad y velocidad de entrega.",
      future_text_short: "IA como acelerador del desarrollo de software.",
      tag_contact: "Contacto",
      contact_title: "Hablemos",
      footer_note: "Portafolio profesional · Juan Esteban Parra Rodríguez · 2026",
      explore_hint: "Flechas ↑ ↓ ← → para caminar · clic en una tarjeta para verla completa",
      tree_root: "Desarrollo<br>de Software",
      zone_hint: "Clic para ver más ✦",
      interact_btn: "Ver ✦"
    },
    en: {
      land_eyebrow: "ADSO Apprentice · Bogotá, Colombia",
      land_sub: "Fullstack developer building software with solid logic and AI assistance — I call this <strong>Vibecoding</strong>.",
      mode_reading_title: "Reading Mode",
      mode_reading_desc: "Browse the portfolio with normal scroll, or drag with your mouse to move sideways.",
      mode_explore_title: "Exploration Mode",
      mode_explore_desc: "Control a pixel raccoon with the arrow keys (or the on-screen joystick on mobile) and discover the content by walking around.",
      land_hint: "Pick a mode to enter the portfolio ↑",
      back_btn: "← Back",
      music_sub: "Code-workshop ambience",
      badge_active: "Active",
      badge_role: "ADSO Apprentice",
      badge_method: "Vibecoding",
      tag_about: "About me",
      about_title: "Analysis + code + AI",
      about_text: "I'm a SENA apprentice in the Software Analysis & Development program (ADSO). I work with HTML5, CSS3, JavaScript, Python and Django, and I back every project with requirements gathering, UML/ERD modeling and technical documentation. My signature is <strong>Vibecoding</strong>: using AI tools to debug faster, explore architectures and keep code quality high without losing sight of the business behind the software.",
      about_text_short: "ADSO apprentice focused on web development with Python, Django and JavaScript, backed by AI (Vibecoding).",
      stat_english: "Technical English",
      stat_formacion: "ADSO training",
      stat_ia: "Daily vibecoding",
      tag_skills: "Skills",
      skills_title: "Toolbox",
      skill_ia_title: "Applied AI",
      skill_ia_desc: "AI-assisted debugging, code generation, MediaPipe / computer vision",
      tag_projects: "Projects",
      projects_title: "What I've built",
      projects_sub: "Click a card to expand it and see the technical detail.",
      proj_barberia_p1: "Group SENA project: a full appointment-scheduling system for a barbershop. I designed models like <code>ConfiguracionHorario</code> (a singleton for business hours), <code>DiaHabilitado</code> and <code>BarberoDiaHabilitado</code> so each barber manages their own availability independently.",
      proj_barberia_p2: "The booking flow uses AJAX with layered validation (frontend and backend) to avoid schedule clashes and double submissions. We also integrated a <strong>face-shape analysis</strong> module with MediaPipe Face Mesh, calibrated to rely on reliable facial ratios (length/cheekbone, jaw/cheekbone) instead of forehead landmarks, which failed due to hair occlusion.",
      proj_barberia_l1: "Admin panel for per-barber, per-day availability",
      proj_barberia_l2: "AJAX bookings with real-time availability validation",
      proj_barberia_l3: "Haircut recommendation based on face shape (computer vision)",
      proj_barberia_l4: "Environment migration: Python 3.11, Django 4.2 for MariaDB 10.4 compatibility",
      proj_barberia_short: "Scheduling app with Django + MediaPipe for face analysis.",
      proj_crud_p1: "Management system built in native PHP applying Object-Oriented Programming. I worked on ID mapping between entities, secure sessions, and turning SQL queries into dynamic Bootstrap interfaces.",
      proj_crud_short: "PHP + MySQL, OOP and secure sessions.",
      proj_yt_p1: "A pure-logic challenge: a JavaScript animation dispatcher that coordinates over 30 effects (clip-path, cubic-bezier) to \"destroy\" the YouTube UI in a controlled way, without losing performance.",
      proj_yt_short: "Large-scale JS animations.",
      proj_color_title: "Color Psychology Cheatsheet",
      proj_color_p1: "Interactive guide on color theory applied to interfaces, built to practice visual composition and typographic hierarchy with Bootstrap.",
      proj_google_p1: "Pixel-perfect layout of the Google search engine, focused on visual precision, grid and interactive components with vanilla JavaScript.",
      proj_clones_title: "Visual clones (Facebook / Laika)",
      proj_clones_p1: "A series of interface replicas to practice real-world layout: Facebook's feed structure and the Laika landing page, focused on visual fidelity, responsive design and Bootstrap best practices.",
      btn_visit_laika: "See the Laika clone ↗",
      proj_astro_title: "Astro-Tracker · Heliocentric Radar",
      proj_astro_p1: "A \"Command Center\"-style full-stack app that visualizes the real position of the solar system's planets using Skyfield and NASA ephemeris data (<code>de421.bsp</code>), served by a Flask API and drawn in real time on a Canvas.",
      proj_astro_p2: "Includes an Earth-Moon system with a real visual orbit, a monitor that predicts the next eclipse by analyzing lunar and solar node alignment with a yearly history, and a world clock with a day/night indicator based on the chosen time zone.",
      proj_astro_l1: "Heliocentric radar with a center that's dynamically recalculated from the canvas size",
      proj_astro_l2: "Prediction and yearly history of solar and lunar eclipses",
      proj_astro_l3: "World clock with async updates every 2 seconds",
      proj_astro_l4: "\"Glassmorphism\" interface with <code>backdrop-filter</code> and radial gradients",
      btn_visit_repo: "View repository ↗",
      proj_modals_title: "Modals Class Example",
      proj_modals_p1: "A practice project focused on mastering Bootstrap's modal system: different triggers, sizes and behaviors, organized with reusable classes to really understand its lifecycle in the DOM.",
      proj_feline_title: "Feline Society · AstroShop Admin Panel",
      proj_feline_p1: "An admin panel for AstroShop (an astronomy-equipment store) with a cat-inspired \"Soft UI\" identity: rounded corners, a pastel palette and warm typefaces (Chelsea Market / Dancing Script).",
      proj_feline_p2: "Structured into independent modules (users, inventory and system) inside an <code>ADMIN</code> panel, separating global styles from form styles to keep the project organized and scalable.",
      proj_magna_title: "Magna Solutions S.A.S · Corporate Portfolio",
      proj_magna_p1: "The official website for a microenterprise in formation, built to showcase its full range of services (Accounting, Workplace Safety, Wellness and Events) with a professional interface focused on generating leads and quote requests.",
      btn_visit: "Visit site ↗",
      tag_future: "Looking ahead",
      future_title: "AI as an accelerator, not a shortcut",
      future_text: "I want to keep building software combining solid analysis fundamentals with AI tools that speed up debugging, architecture research and adaptation to new technologies. My goal for my internship is to apply this approach to real projects, measuring impact on quality and delivery speed.",
      future_text_short: "AI as an accelerator for software development.",
      tag_contact: "Contact",
      contact_title: "Let's talk",
      footer_note: "Professional portfolio · Juan Esteban Parra Rodriguez · 2026",
      explore_hint: "Arrow keys ↑ ↓ ← → to walk · click a card to read it fully",
      tree_root: "Software<br>Development",
      zone_hint: "Click for more ✦",
      interact_btn: "View ✦"
    }
  };

  let currentLang = localStorage.getItem('lang') || 'es';
  const langBtn = document.getElementById('lang-toggle');

  function translate() {
    const t = dict[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.innerHTML = t[key];
    });
    document.documentElement.setAttribute('lang', currentLang);
    localStorage.setItem('lang', currentLang);
  }
  translate();

  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    translate();
  });

  /* =========================================================
     3. NAVEGACIÓN: landing -> modo lectura / modo exploración
     ========================================================= */
  const landing = document.getElementById('landing');
  const content = document.getElementById('content');
  const explore = document.getElementById('explore');
  const backBtn = document.getElementById('back-btn');

  function enterMode(target) {
    landing.classList.add('leave-up');
    setTimeout(() => {
      landing.classList.add('hidden');
      target.classList.remove('hidden');
      backBtn.classList.remove('hidden');
      if (target === explore) startExploreLoop();
    }, 650);
  }

  document.getElementById('btn-reading').addEventListener('click', () => enterMode(content));
  document.getElementById('btn-explore').addEventListener('click', () => enterMode(explore));

  backBtn.addEventListener('click', () => {
    content.classList.add('hidden');
    explore.classList.add('hidden');
    backBtn.classList.add('hidden');
    landing.classList.remove('hidden');
    requestAnimationFrame(() => landing.classList.remove('leave-up'));
  });

  /* =========================================================
     4. MODO LECTURA: scroll horizontal por rueda + arrastre
     ========================================================= */
  const track = document.getElementById('track-container');
  const contentEl = document.getElementById('content');

  // El contenido ya es un flujo vertical normal (overflow-y: auto en
  // #content), así que la rueda del ratón funciona sola sin necesitar JS.
  // Solo se ofrece arrastre vertical con el mouse como alternativa al scroll.
  let isDown = false, startY = 0, scrollStart = 0;
  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('dragging');
    startY = e.pageY;
    scrollStart = contentEl.scrollTop;
  });
  window.addEventListener('mouseup', () => { isDown = false; track.classList.remove('dragging'); });
  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    contentEl.scrollTop = scrollStart - (e.pageY - startY);
  });

  /* =========================================================
     5. TARJETAS DE PROYECTO EXPANDIBLES
     ========================================================= */
  document.querySelectorAll('.proj-card .proj-head').forEach(head => {
    head.addEventListener('click', () => {
      head.closest('.proj-card').classList.toggle('open');
    });
  });

  /* =========================================================
     6. REPRODUCTOR DE MÚSICA (vinilo)
     ========================================================= */
  // Coloca hasta 3 archivos de audio en la carpeta assets/audio/
  // con estos nombres exactos, o cambia las rutas/títulos aquí abajo.
  const playlist = [
    { title: "Pista 1", src: "assets/audio/cancion1.mp3" },
    { title: "Pista 2", src: "assets/audio/cancion2.mp3" },
    { title: "Pista 3", src: "assets/audio/cancion3.mp3" }
  ];

  const audioEl = document.getElementById('audio-el');
  const musicPanel = document.getElementById('music-panel');
  const musicTab = document.getElementById('music-tab');
  const musicClose = document.getElementById('music-close');
  const vinylDisc = document.getElementById('vinyl-disc');
  const tonearm = document.getElementById('tonearm');
  const playPauseBtn = document.getElementById('play-pause');
  const prevBtn = document.getElementById('prev-track');
  const nextBtn = document.getElementById('next-track');
  const scrub = document.getElementById('scrub');
  const volume = document.getElementById('volume');
  const trackTitle = document.getElementById('track-title');
  const timeCurrent = document.getElementById('time-current');
  const timeTotal = document.getElementById('time-total');

  let trackIndex = 0;

  function fmt(t) {
    if (!isFinite(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function loadTrack(i, autoplay) {
    trackIndex = (i + playlist.length) % playlist.length;
    const t = playlist[trackIndex];
    audioEl.src = t.src;
    trackTitle.textContent = t.title;
    if (autoplay) {
      audioEl.play().catch(() => { /* autoplay bloqueado hasta interacción del usuario */ });
    }
  }

  function setPlayingState(playing) {
    vinylDisc.classList.toggle('spinning', playing);
    tonearm.classList.toggle('playing', playing);
    playPauseBtn.textContent = playing ? '⏸' : '▶';
  }

  playPauseBtn.addEventListener('click', () => {
    if (audioEl.paused) { audioEl.play().catch(() => {}); }
    else { audioEl.pause(); }
  });
  audioEl.addEventListener('play', () => setPlayingState(true));
  audioEl.addEventListener('pause', () => setPlayingState(false));
  audioEl.addEventListener('ended', () => loadTrack(trackIndex + 1, true));

  prevBtn.addEventListener('click', () => loadTrack(trackIndex - 1, true));
  nextBtn.addEventListener('click', () => loadTrack(trackIndex + 1, true));

  audioEl.addEventListener('timeupdate', () => {
    if (!isFinite(audioEl.duration)) return;
    scrub.value = (audioEl.currentTime / audioEl.duration) * 100;
    timeCurrent.textContent = fmt(audioEl.currentTime);
    timeTotal.textContent = fmt(audioEl.duration);
  });
  scrub.addEventListener('input', () => {
    if (!isFinite(audioEl.duration)) return;
    audioEl.currentTime = (scrub.value / 100) * audioEl.duration;
  });
  volume.addEventListener('input', () => { audioEl.volume = volume.value; });
  audioEl.volume = volume.value;

  musicTab.addEventListener('click', () => {
    musicPanel.classList.add('open');
    musicTab.classList.add('hidden-tab');
  });
  musicClose.addEventListener('click', () => {
    musicPanel.classList.remove('open');
    musicTab.classList.remove('hidden-tab');
  });

  loadTrack(0, false);
  // Abre el panel y arranca la reproducción apenas el usuario interactúa
  // por primera vez con la página (los navegadores bloquean el autoplay con sonido).
  let musicStarted = false;
  function tryAutostart() {
    if (musicStarted) return;
    musicStarted = true;
    musicPanel.classList.add('open');
    musicTab.classList.add('hidden-tab');
    audioEl.play().catch(() => {});
    window.removeEventListener('click', tryAutostart);
    window.removeEventListener('keydown', tryAutostart);
  }
  window.addEventListener('click', tryAutostart, { once: true });
  window.addEventListener('keydown', tryAutostart, { once: true });

  /* =========================================================
     7. MAPACHE — sprite pixel-art procedural (SVG generado en JS)
     ========================================================= */
  // Paleta compartida por todos los frames.
  const RC_PALETTE = {
    D: '#211c17',   // contorno / orejas / patas / cola (bandas oscuras)
    G: '#9b9186',   // gris medio (pelaje)
    S: '#706860',   // sombra sutil (lomo / cola clara)
    C: '#f2e2cf',   // crema (cara / hocico / pecho)
    M: '#181410',   // máscara / pupila
    W: '#fdf6ee',   // blanco del ojo / pecho
    A: '#ff7a26',   // antifaz visible en estado activo
    O: '#ffb066'    // boca abierta (activo)
  };

  // Cada frame es un arreglo de filas; cada carácter = 1 "pixel".
  const RC_FRAMES = {
    down0: [
      "......................",
      "....DDD........DDD....",
      "...DDGDD......DDGDD...",
      "...DGGGD.GGGG.DGGGD...",
      "...DGGGGGGGGGGGGGGD...",
      "....DGGGGGGGGGGGGD....",
      "....GGGGCCCCCCGGGG....",
      "....GGGMMCCCCMMGGG....",
      "...GGGMMWMCCMWMMGGG...",
      ".WWGGGMMWMCCMWMMGGGWW.",
      ".WWGGGMMMCCCCMMMGGGWW.",
      ".WW.GGCCCCCCCCCCGG.WW.",
      "....GGCCCCDDCCCCGG....",
      ".....GGCCCDDCCCGG.....",
      "......GGGGGGGGGG......",
      "....GGGGGGGGGGGGGG....",
      "...GGGGGGGGGGGGGGGG...",
      "..DDGGGGWWWWWWGGGGDD..",
      "..DDGGGWWCCCCWWGGGDD..",
      "..DDGGGWCCCCCCWGGGDD..",
      "..DDGGWWCCCCCCWWGGDD..",
      "..DDGGGWCCCCCCWGGGDD..",
      "...GGGDDDDCCDDDDGGG...",
      "......DDDDCCDDDD......",
      "......DDDD..DDDD......",
      "......DDDD............"
    ],
    down1: [
      "......................",
      "....DDD........DDD....",
      "...DDGDD......DDGDD...",
      "...DGGGD.GGGG.DGGGD...",
      "...DGGGGGGGGGGGGGGD...",
      "....DGGGGGGGGGGGGD....",
      "....GGGGCCCCCCGGGG....",
      "....GGGMMCCCCMMGGG....",
      "...GGGMMWMCCMWMMGGG...",
      ".WWGGGMMWMCCMWMMGGGWW.",
      ".WWGGGMMMCCCCMMMGGGWW.",
      ".WW.GGCCCCCCCCCCGG.WW.",
      "....GGCCCCDDCCCCGG....",
      ".....GGCCCDDCCCGG.....",
      "......GGGGGGGGGG......",
      "....GGGGGGGGGGGGGG....",
      "...GGGGGGGGGGGGGGGG...",
      "..DDGGGGWWWWWWGGGGDD..",
      "..DDGGGWWCCCCWWGGGDD..",
      "..DDGGGWCCCCCCWGGGDD..",
      "..DDGGWWCCCCCCWWGGDD..",
      "..DDGGGWCCCCCCWGGGDD..",
      "...GGGDDDDCCDDDDGGG...",
      "......DDDDCCDDDD......",
      "......DDDD..DDDD......",
      "............DDDD......"
    ],
    up0: [
      "......................",
      "....DDD........DDD....",
      "...DDDDD......DDDDD...",
      "...DDDDD.GGGG.DDDDD...",
      "...DDDDGGGSSGGGDDDD...",
      "....DGGGGGSSGGGGGD....",
      "....GGGGGGSSGGGGGG....",
      "....GGGGGGSSGGGGGG....",
      "...GGGGGGGSSGGGGGGG...",
      "...GGGGGGGSSGGGGGGG...",
      "...GGGGGGGSSGGGGGGG...",
      "....GGGGGGSSGGGGGG....",
      "....GGGGGGSSGGGGGG....",
      ".....GGGGGSSGGGGG.....",
      "......GGGGGGGGGG......",
      "....GGGGGGGGGGGGGG....",
      "...GGGGGGGGGGGGGGGG...",
      "..DDGGGGGSSSSGGGGGDD..",
      "..DDGGGGGSSSSGGGGGDD..",
      "..DDGGGGGSSSSGGGGGDD..",
      "..DDGGGGGSSSSGGGGGDD..",
      "..DDGGGGGSSSSGGGGGDD..",
      "...GGGDDDGGGGGDDGGG...",
      "......DDDGGGGGDD......",
      "......DDDDDDDDDD......",
      "......DDDDDDDD........"
    ],
    up1: [
      "......................",
      "....DDD........DDD....",
      "...DDDDD......DDDDD...",
      "...DDDDD.GGGG.DDDDD...",
      "...DDDDGGGSSGGGDDDD...",
      "....DGGGGGSSGGGGGD....",
      "....GGGGGGSSGGGGGG....",
      "....GGGGGGSSGGGGGG....",
      "...GGGGGGGSSGGGGGGG...",
      "...GGGGGGGSSGGGGGGG...",
      "...GGGGGGGSSGGGGGGG...",
      "....GGGGGGSSGGGGGG....",
      "....GGGGGGSSGGGGGG....",
      ".....GGGGGSSGGGGG.....",
      "......GGGGGGGGGG......",
      "....GGGGGGGGGGGGGG....",
      "...GGGGGGGGGGGGGGGG...",
      "..DDGGGGGSSSSGGGGGDD..",
      "..DDGGGGGSSSSGGGGGDD..",
      "..DDGGGGGSSSSGGGGGDD..",
      "..DDGGGGGSSSSGGGGGDD..",
      "..DDGGGGGSSSSGGGGGDD..",
      "...GGGDDDGGGGGDDGGG...",
      "......DDDGGGGGDD......",
      "......DDDDDDDDDD......",
      ".........DDDDDDD......"
    ],
    left0: [
      "......................",
      ".............D........",
      "...........DDDDD......",
      "...........GGGGD......",
      "........GGGGGGGD......",
      ".......GGGGGGGGG......",
      "......GGGGGGGGGGG.....",
      ".....GGMMMGGGGGGGG....",
      "....CCGMWMMGGGGGGG....",
      "..CCCCCMWMMGGGGGGG....",
      "WDDDCCCCMMGGGGGGGG.GGG",
      "WDDDCCCCCGGGGGGGGG.GGG",
      "..DCCCCCGGGGGGGGG..GGG",
      "....CC.GGGGGGGGG...DDD",
      "........GGGGGGGGG..DDD",
      "......GGGGGGGGGGGGGGG.",
      ".....GGGGGGGGGGGGGGGG.",
      "......GGGGWWWWWGGGGDD.",
      "......GGGWWCCCWWGGGDD.",
      "......GGWWCCCCCWWGGDD.",
      "......GGWCCCCCCCWGGDD.",
      "......GGWCCCCCCCWGGDD.",
      "......GGDDDDCCDDDDGGG.",
      "........DDDDCCDDDD....",
      "........DDDD..DDDD....",
      "........DDDD.........."
    ],
    left1: [
      "......................",
      ".............D........",
      "...........DDDDD......",
      "...........GGGGD......",
      "........GGGGGGGD......",
      ".......GGGGGGGGG......",
      "......GGGGGGGGGGG.....",
      ".....GGMMMGGGGGGGG....",
      "....CCGMWMMGGGGGGG....",
      "..CCCCCMWMMGGGGGGG....",
      "WDDDCCCCMMGGGGGGGG.GGG",
      "WDDDCCCCCGGGGGGGGG.GGG",
      "..DCCCCCGGGGGGGGG..GGG",
      "....CC.GGGGGGGGG...DDD",
      "........GGGGGGGGG..DDD",
      "......GGGGGGGGGGGGGGG.",
      ".....GGGGGGGGGGGGGGGG.",
      "......GGGGWWWWWGGGGDD.",
      "......GGGWWCCCWWGGGDD.",
      "......GGWWCCCCCWWGGDD.",
      "......GGWCCCCCCCWGGDD.",
      "......GGWCCCCCCCWGGDD.",
      "......GGDDDDCCDDDDGGG.",
      "........DDDDCCDDDD....",
      "........DDDD..DDDD....",
      "..............DDDD...."
    ],
    active: [
      "......................",
      "....DDD........DDD....",
      "...DDGDD......DDGDD...",
      "...DGGGD.GGGG.DGGGD...",
      "...DGGGGGGGGGGGGGGD...",
      "....DGGGGGGGGGGGGD....",
      "....GGGGCCCCCCGGGG....",
      "....GGGAACCCCAAGGG....",
      "...GGGAMWACCAWMAGGG...",
      ".WWGGGAMWACCAWMAGGGWW.",
      ".WWGGGAAACCCCAAAGGGWW.",
      ".WW.GGCCCCCCCCCCGG.WW.",
      "....GGCCCCDDCCCCGG....",
      ".....GGCCCOOCCCGG.....",
      "......GGGGGGGGGG......",
      "....GGGGGGGGGGGGGG....",
      "...GGGGGGGGGGGGGGGG...",
      "..DDGGGGWWWWWWGGGGDD..",
      "..DDGGGWWCCCCWWGGGDD..",
      "..DDGGGWCCCCCCWGGGDD..",
      "..DDGGWWCCCCCCWWGGDD..",
      "..DDGGGWCCCCCCWGGGDD..",
      "...GGGDDDDCCDDDDGGG...",
      "......DDDDCCDDDD......",
      "......DDDD..DDDD......",
      "......DDDD............"
    ]
  };

  function buildRaccoonSVG(rows) {
    const h = rows.length;
    const w = Math.max(...rows.map(r => r.length));
    let rects = '';
    rows.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const ch = row[x];
        if (ch !== '.' && RC_PALETTE[ch]) {
          rects += `<rect x="${x}" y="${y}" width="1.05" height="1.05" fill="${RC_PALETTE[ch]}"/>`;
        }
      }
    });
    return `<svg viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
  }

  // Cachea el SVG de cada frame para no regenerarlo en cada cambio.
  const RC_SVG_CACHE = {};
  Object.keys(RC_FRAMES).forEach(key => {
    RC_SVG_CACHE[key] = buildRaccoonSVG(RC_FRAMES[key]);
  });

  // ---- props decorativos (árbol, roca, seta, poste) — mismo método que el mapache ----
  const PROP_PALETTE = {
    T: '#5a3d22', F: '#4f8f52', D: '#33682f',
    R: '#8b8a86', K: '#6b6a66',
    M: '#e2453f', W: '#fdf6ee', S: '#5a3d22',
    B: '#8a5a2e', N: '#5a3d22'
  };
  const PROP_FRAMES = {
    tree: [
      "............",
      "....DDDD....",
      "...DDDDDD...",
      "..FDDDDDDF..",
      "..FDDDDDDF..",
      "..FFDDDDFF..",
      ".FFFFFFFFFF.",
      ".FFFFFFFFFF.",
      ".FFFF....FF.",
      "...F.TT.F...",
      ".....TT.....",
      ".....TT.....",
      ".....TT.....",
      ".....TT....."
    ],
    rock: [
      "............",
      "....K.......",
      "..KKKKKRRR..",
      ".KKKKKKKRRR.",
      "RRKKKKKRRRRR",
      ".RRRKRRRRRR.",
      "..RRRRRRRR.."
    ],
    mush: [
      "............",
      "............",
      "............",
      "...MMWMMM...",
      "..MWMMMWMM..",
      ".MMMMMMMMMM.",
      "..WMMMMMMW..",
      "...MMMMMM...",
      ".....SS.....",
      ".....SS.....",
      ".....SS.....",
      "............"
    ],
    sign: [
      "............",
      "............",
      ".NNNNNNNNNN.",
      ".BBBBBBBBBB.",
      ".BBBBBBBBBB.",
      ".BBBBBBBBBB.",
      ".BBBBBBBBBB.",
      ".....TT.....",
      ".....TT.....",
      ".....TT.....",
      ".....TT.....",
      ".....TT.....",
      ".....TT.....",
      ".....TT.....",
      ".....TT.....",
      "............"
    ]
  };

  function buildPropSVG(rows, palette) {
    const h = rows.length;
    const w = Math.max(...rows.map(r => r.length));
    let rects = '';
    rows.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const ch = row[x];
        if (ch !== '.' && palette[ch]) {
          rects += `<rect x="${x}" y="${y}" width="1.05" height="1.05" fill="${palette[ch]}"/>`;
        }
      }
    });
    return `<svg viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
  }

  const PROP_CLASS_MAP = { 'prop-tree': 'tree', 'prop-rock': 'rock', 'prop-mush': 'mush', 'prop-sign': 'sign' };
  Object.keys(PROP_CLASS_MAP).forEach(cls => {
    const svg = buildPropSVG(PROP_FRAMES[PROP_CLASS_MAP[cls]], PROP_PALETTE);
    document.querySelectorAll(`.${cls}`).forEach(el => { el.innerHTML = svg; });
  });

  const raccoonEl = document.getElementById('raccoon');
  let raccoonDir = 'down';     // 'up' | 'down' | 'left' | 'right'
  let raccoonFrame = 0;        // 0 | 1 toggles every 1s while walking
  let raccoonMoving = false;
  let raccoonNearZone = false;
  let raccoonFrameTimer = null;

  function renderRaccoon() {
    if (raccoonNearZone) {
      raccoonEl.classList.remove('face-right');
      raccoonEl.innerHTML = RC_SVG_CACHE.active;
      return;
    }
    const dirKey = raccoonDir === 'right' ? 'left' : raccoonDir;
    raccoonEl.classList.toggle('face-right', raccoonDir === 'right');
    const frameKey = `${dirKey}${raccoonFrame}`;
    raccoonEl.innerHTML = RC_SVG_CACHE[frameKey] || RC_SVG_CACHE.down0;
  }

  function startRaccoonWalkClock() {
    if (raccoonFrameTimer) return;
    raccoonFrameTimer = setInterval(() => {
      if (raccoonMoving && !raccoonNearZone) {
        raccoonFrame = raccoonFrame === 0 ? 1 : 0;
        renderRaccoon();
      }
    }, 1000);
  }
  startRaccoonWalkClock();
  renderRaccoon();

  /* =========================================================
     8. MODO EXPLORACIÓN: movimiento, cámara, zonas y burbujas
     ========================================================= */
  const world = document.getElementById('world');
  const zones = Array.from(document.querySelectorAll('.world-zone'));
  const bubbleLayer = document.getElementById('bubble-layer');
  const worldW = 2600, worldH = 1500;
  let worldX = worldW / 2, worldY = worldH / 2;
  const speed = 10;
  const keys = {};
  let currentActiveZone = null;
  let bubbleClearTimer = null;

  window.addEventListener('keydown', (e) => {
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
      keys[e.key] = true;
      if (!explore.classList.contains('hidden')) e.preventDefault();
    }
  });
  window.addEventListener('keyup', (e) => { keys[e.key] = false; });

  // clic en una tarjeta: la expande para mostrar el detalle completo
  zones.forEach(z => {
    z.addEventListener('click', () => {
      const wasExpanded = z.classList.contains('expanded');
      zones.forEach(other => other.classList.remove('expanded'));
      if (!wasExpanded) z.classList.add('expanded');
    });
  });

  function spawnBubbles(zone) {
    const bubblesContainer = zone.querySelector('.zone-bubbles');
    if (!bubblesContainer) return;
    bubblesContainer.innerHTML = '';

    const tags = (zone.dataset.bubbles || '').split(',').map(t => t.trim()).filter(Boolean);
    if (!tags.length) return;

    const colors = ['#ff6a1a', '#ffb347', '#a37bff', '#2bff8a', '#ffe082', '#ff7eb6'];
    tags.forEach((tag, i) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const b = document.createElement('span');
      b.className = 'bubble';
      b.textContent = tag;
      b.style.background = `${color}22`;
      b.style.borderColor = color;
      b.style.boxShadow = `0 0 12px ${color}55`;
      b.style.animationDelay = `${i * 60}ms`;
      bubblesContainer.appendChild(b);
    });
  }

  function clearBubbles() {
    zones.forEach(zone => {
      const bubblesContainer = zone.querySelector('.zone-bubbles');
      if (bubblesContainer) bubblesContainer.innerHTML = '';
    });
  }

  // ---- controles móviles: joystick virtual + botón de interacción ----
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  if (isTouchDevice) document.body.classList.add('show-mobile-controls');

  const joystickBase = document.getElementById('joystick-base');
  const joystickKnob = document.getElementById('joystick-knob');
  const interactBtn = document.getElementById('interact-btn');
  let joystickTouchId = null;
  const JOY_RADIUS = 40;
  const JOY_DEADZONE = 12;

  function resetJoystickKeys() {
    keys['ArrowUp'] = keys['ArrowDown'] = keys['ArrowLeft'] = keys['ArrowRight'] = false;
  }

  function handleJoystickMove(clientX, clientY) {
    const rect = joystickBase.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = clientX - cx;
    let dy = clientY - cy;
    const dist = Math.hypot(dx, dy);
    const clamped = Math.min(dist, JOY_RADIUS);
    const angle = Math.atan2(dy, dx);
    const kx = Math.cos(angle) * clamped;
    const ky = Math.sin(angle) * clamped;
    joystickKnob.style.left = `${33 + kx}px`;
    joystickKnob.style.top = `${33 + ky}px`;

    resetJoystickKeys();
    if (dist > JOY_DEADZONE) {
      if (dx > JOY_DEADZONE * 0.5) keys['ArrowRight'] = true;
      if (dx < -JOY_DEADZONE * 0.5) keys['ArrowLeft'] = true;
      if (dy > JOY_DEADZONE * 0.5) keys['ArrowDown'] = true;
      if (dy < -JOY_DEADZONE * 0.5) keys['ArrowUp'] = true;
    }
  }

  function resetJoystickKnob() {
    joystickKnob.style.left = '33px';
    joystickKnob.style.top = '33px';
    resetJoystickKeys();
  }

  joystickBase.addEventListener('touchstart', (e) => {
    const t = e.changedTouches[0];
    joystickTouchId = t.identifier;
    handleJoystickMove(t.clientX, t.clientY);
    e.preventDefault();
  }, { passive: false });

  joystickBase.addEventListener('touchmove', (e) => {
    for (const t of e.changedTouches) {
      if (t.identifier === joystickTouchId) handleJoystickMove(t.clientX, t.clientY);
    }
    e.preventDefault();
  }, { passive: false });

  function endJoystickTouch(e) {
    for (const t of e.changedTouches) {
      if (t.identifier === joystickTouchId) {
        joystickTouchId = null;
        resetJoystickKnob();
      }
    }
  }
  joystickBase.addEventListener('touchend', endJoystickTouch);
  joystickBase.addEventListener('touchcancel', endJoystickTouch);

  interactBtn.addEventListener('click', () => {
    if (!currentActiveZone) return;
    const wasExpanded = currentActiveZone.classList.contains('expanded');
    zones.forEach(other => other.classList.remove('expanded'));
    if (!wasExpanded) currentActiveZone.classList.add('expanded');
  });

  // La cámara (offset del mundo) es independiente de la posición del mapache:
  // solo se mueve cuando el mapache se acerca al borde de una "zona muerta"
  // central, así el mapache se ve caminar de verdad por la pantalla en vez
  // de quedar pegado siempre en el centro.
  let camX = 0, camY = 0;
  const DEAD_ZONE_W_RATIO = 0.30; // % del ancho de pantalla que el mapache puede recorrer sin mover cámara
  const DEAD_ZONE_H_RATIO = 0.28;

  function updateWorld() {
    if (!explore.classList.contains('hidden')) {
      let moveX = 0, moveY = 0;
      if (keys['ArrowUp'])    { worldY -= speed; moveY -= 1; }
      if (keys['ArrowDown'])  { worldY += speed; moveY += 1; }
      if (keys['ArrowLeft'])  { worldX -= speed; moveX -= 1; }
      if (keys['ArrowRight']) { worldX += speed; moveX += 1; }

      raccoonMoving = (moveX !== 0 || moveY !== 0);
      if (raccoonMoving) {
        let newDir = raccoonDir;
        // prioriza el eje con mayor intención de movimiento para elegir la dirección visible
        if (Math.abs(moveX) > 0 && Math.abs(moveY) === 0) newDir = moveX > 0 ? 'right' : 'left';
        else if (Math.abs(moveY) > 0 && Math.abs(moveX) === 0) newDir = moveY > 0 ? 'down' : 'up';
        else if (Math.abs(moveX) > 0) newDir = moveX > 0 ? 'right' : 'left';
        if (newDir !== raccoonDir) { raccoonDir = newDir; renderRaccoon(); }
      }

      const raccoonHalfW = 52;
      const raccoonHalfH = 62;
      worldX = Math.max(raccoonHalfW, Math.min(worldW - raccoonHalfW, worldX));
      worldY = Math.max(raccoonHalfH, Math.min(worldH - raccoonHalfH, worldY));

      const vw = window.innerWidth, vh = window.innerHeight;
      const deadW = vw * DEAD_ZONE_W_RATIO;
      const deadH = vh * DEAD_ZONE_H_RATIO;
      const centerX = vw / 2, centerY = vh / 2;

      // posición del mapache en pantalla si la cámara no se moviera
      const screenX = worldX - camX;
      const screenY = worldY - camY;

      // si se sale de la zona muerta central, desplaza la cámara lo justo
      // para volver a dejarlo en el borde de esa zona (cámara "sigue" al jugador)
      if (screenX > centerX + deadW) camX = worldX - (centerX + deadW);
      else if (screenX < centerX - deadW) camX = worldX - (centerX - deadW);
      if (screenY > centerY + deadH) camY = worldY - (centerY + deadH);
      else if (screenY < centerY - deadH) camY = worldY - (centerY - deadH);

      // no revelar zonas fuera del mapa: limitar el paneo de la cámara
      let tx = -camX;
      let ty = -camY;
      tx = Math.max(-(worldW - vw < 0 ? 0 : worldW - vw), Math.min(0, tx));
      ty = Math.max(-(worldH - vh < 0 ? 0 : worldH - vh), Math.min(0, ty));
      if (worldW <= vw) tx = -(worldW - vw) / 2;
      if (worldH <= vh) ty = -(worldH - vh) / 2;
      camX = -tx;
      camY = -ty;
      world.style.transform = `translate(${tx}px, ${ty}px)`;

      // el mapache se dibuja en coordenadas del mundo (es hijo de #world),
      // así que al moverse worldX/worldY realmente se ve caminar en pantalla.
      raccoonEl.style.left = `${worldX}px`;
      raccoonEl.style.top = `${worldY}px`;

      let nearest = null, nearestDist = Infinity;
      const raccoonHitboxSize = 105;
      const raccoonHitboxHalf = raccoonHitboxSize / 2;
      const hitboxLeft = worldX - raccoonHitboxHalf;
      const hitboxTop = worldY - raccoonHitboxHalf;
      const hitboxRight = worldX + raccoonHitboxHalf;
      const hitboxBottom = worldY + raccoonHitboxHalf;

      zones.forEach(z => {
        const zoneLeft = z.offsetLeft;
        const zoneTop = z.offsetTop;
        const zoneRight = z.offsetLeft + z.offsetWidth;
        const zoneBottom = z.offsetTop + z.offsetHeight;
        const isActive = hitboxRight >= zoneLeft && hitboxLeft <= zoneRight && hitboxBottom >= zoneTop && hitboxTop <= zoneBottom;
        z.classList.toggle('active', isActive);
        if (isActive) {
          const zx = z.offsetLeft + z.offsetWidth / 2;
          const zy = z.offsetTop + z.offsetHeight / 2;
          const dist = Math.hypot(zx - worldX, zy - worldY);
          if (dist < nearestDist) { nearest = z; nearestDist = dist; }
        }
      });

      if (nearest !== currentActiveZone) {
        currentActiveZone = nearest;
        raccoonNearZone = !!nearest;
        interactBtn.classList.toggle('hidden', !nearest);
        renderRaccoon();
        if (nearest) {
          clearTimeout(bubbleClearTimer);
          spawnBubbles(nearest);
        } else {
          clearTimeout(bubbleClearTimer);
          bubbleClearTimer = setTimeout(() => {
            if (!currentActiveZone) clearBubbles();
          }, 2000);
        }
      }
    }
    requestAnimationFrame(updateWorld);
  }

  function startExploreLoop() {
    worldX = worldW / 2;
    worldY = worldH / 2;
    camX = worldX - window.innerWidth / 2;
    camY = worldY - window.innerHeight / 2;
    currentActiveZone = null;
    raccoonNearZone = false;
    raccoonDir = 'down';
    raccoonFrame = 0;
    interactBtn.classList.add('hidden');
    renderRaccoon();
    clearBubbles();
  }

  updateWorld();
});