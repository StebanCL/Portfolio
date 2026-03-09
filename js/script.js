document.addEventListener('DOMContentLoaded', () => {
    // === 1. GESTIÓN DEL TEMA (Dark/Light) ===
    const themeToggler = document.getElementById('theme-toggler');
    const htmlElement = document.documentElement;

    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        if (themeToggler) {
            themeToggler.textContent = theme === 'dark' ? '🌙 Switch Theme' : '☀️ Switch Theme';
        }
        localStorage.setItem('theme', theme);
    };

    if (themeToggler) {
        themeToggler.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Cargar preferencia inicial
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // === 2. MARQUEE INFINITO ===
    const marqueeContent = document.querySelector('.marquee-content');
    
    if (marqueeContent) {
        // Clonamos el contenido original
        const originalCards = marqueeContent.innerHTML;
        marqueeContent.innerHTML += originalCards; 

        // Calculamos la duración
        const totalCards = marqueeContent.children.length / 2;
        const speedPerCard = 8; 
        marqueeContent.style.animationDuration = `${totalCards * speedPerCard}s`;
        
        // Pausa al pasar el mouse
        marqueeContent.addEventListener('mouseenter', () => {
            marqueeContent.style.animationPlayState = 'paused';
        });
        marqueeContent.addEventListener('mouseleave', () => {
            marqueeContent.style.animationPlayState = 'running';
        });
    }

    // === 3. REVEAL ON SCROLL OBSERVER (DENTRO DEL DOMCONTENTLOADED) ===
    const observerOptions = {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: "0px 0px -50px 0px" // Un pequeño margen para que se vea natural
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Opcional: imprimir en consola para debuguear si quieres ver cuando sale la 5ta
                // console.log('Elemento revelado:', entry.target);
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Buscamos todos los elementos con la clase y empezamos a observar
    const scrollElements = document.querySelectorAll('.reveal-on-scroll');
    scrollElements.forEach(el => {
        observer.observe(el);
    });
});

const langToggler = document.getElementById('lang-toggler');
let currentLang = 'es'; 

const dictionary = {
    en: {
        // Hero & Header
        badgeAge: "19 Years Old",
        badgeRole: "_CL",
        heroSubtitle: "Software Analyst & Fullstack Developer",
        heroDesc: "Focused on building software through <strong>Vibecoding</strong>, combining logic and AI-assisted debugging to create functional solutions.",
        skillFront: "Layout with <strong>HTML5, CSS3 & Bootstrap</strong>. Experience with <strong>React</strong> and dynamic logic using JavaScript.",
        skillBack: "Backend logic with <strong>Python and PHP</strong>. Requirements analysis, ERD models and database management in MySQL/XAMPP.",
        skillAI: "Error correction and logic flow through AI. Analysis of server behavior and remote data.",
        btnContact: "Contact Me",

        // Section: Featured Projects (Marquee)
        marqueeTitle: "Featured Projects",
        marqueeSub: "Click on any card to visit the live site.",
        jsLogic: "JavaScript Logic",
        ytChaos: "YouTube Chaos 🌪️",
        ytDesc: "Advanced DOM logic and manipulation.",
        uxStudy: "UX/UI Study",
        colorPsych: "Color Psychology 🎨",
        colorDesc: "Color theory logic applied.",
        fsDb: "Fullstack & DB",
        crudDesc: "PHP and MySQL development.",
        htmlCss: "HTML/CSS",
        googleDesc: "Visual precision layout.",
        vibeNext: "Vibecoding Next",
        loadingProj: "Loading Project 🏗️",
        comingSoon: "Coming soon",

        // Section: Project Deep Dive
        deepTitle: "Project Deep Dive",
        deepYT: "Technical Challenge: YouTube Chaos",
        deepYTDesc: "Implemented an <strong>Animation Dispatcher</strong> in JS to coordinate over 30 effects using <em>clip-path</em> and <em>cubic-bezier</em>, focusing on logical execution.",
        deepCRUD: "Architecture: CRUD Management",
        deepCRUDDesc: "Developed a management system using <strong>OOP</strong> in PHP. Focused on secure session logic and MySQL data flow optimization.",
        deepInfra: "Infrastructure & Data",
        deepInfraDesc: "Mastered <strong>PHP-MySQL connection</strong> and ID mapping. Transforming SQL queries into dynamic variables for Bootstrap interfaces.",
        deepADSO: "Analysis & Requirements (ADSO)",
        deepADSODesc: "Specialist in the analysis phase: requirements elicitation, <strong>ERD modeling</strong> and class diagramming for scalable logic.",

        // Section: Featured Projects (Detailed List)
        detailedTitle: "Featured Projects",
        detailedSub: "Recent developments and the logic applied in each.",
        fsMysql: "Fullstack & MySQL",
        crudLongDesc: "Management system developed with PHP. Implements ID logic and conversion of SQL data to dynamic HTML components.",
        ytLongDesc: "A logic experiment where the DOM is manipulated applying Vibecoding principles for creative error correction.",
        colorLongDesc: "Interactive guide built with Bootstrap and CSS, optimizing the visualization of technical color data.",
        googleLongDesc: "Development focused on visual structure and interactive component architecture with JS logic.",
        comingSoonTitle: "Coming Soon",
        mvcTitle: "Fullstack MVC Project...",
        mvcDesc: "New development based on <strong>MVC</strong> architecture. Applying logic analysis and advanced data models for full integration.",
        btnInDev: "In development",
        btnVisit: "Visit Site",
        btnChaos: "View Chaos",
        btnLearn: "Learn Colors",
        btnPrecision: "View Precision",

        // Footer
        footerName: "Professional Portfolio | <strong>Juan Esteban Parra Rodriguez</strong> | 2026",
        footerInfo: "Technical English B2-C1 | ADSO Analyst | Vibecoding Expert"
    },
    es: {
        badgeAge: "19 Años",
        badgeRole: "_CL",
        heroSubtitle: "Analista de Software & Desarrollador Fullstack",
        heroDesc: "Enfocado en la construcción de software mediante <strong>Vibecoding</strong>, combinando lógica y resolución de errores asistida por IA para crear soluciones funcionales.",
        skillFront: "Maquetación con <strong>HTML5, CSS3 & Bootstrap</strong>. Experiencia en <strong>React</strong> y lógica dinámica con JavaScript.",
        skillBack: "Lógica de servidor en <strong>Python y PHP</strong>. Análisis de requisitos, modelos Entidad-Relación y gestión de DB en MySQL/XAMPP.",
        skillAI: "Corrección de errores y flujos lógicos mediante IA. Análisis de comportamiento de servidor y datos remotos.",
        btnContact: "Contactar",
        marqueeTitle: "Proyectos Destacados",
        marqueeSub: "Haz clic en cualquier tarjeta para visitar el sitio.",
        jsLogic: "Lógica de JavaScript",
        ytChaos: "YouTube Chaos 🌪️",
        ytDesc: "Lógica y manipulación del DOM.",
        uxStudy: "Estudio UX/UI",
        colorPsych: "Psicología del Color 🎨",
        colorDesc: "Lógica de color aplicada.",
        fsDb: "Fullstack & DB",
        crudDesc: "Desarrollo con PHP y MySQL.",
        htmlCss: "HTML/CSS",
        googleDesc: "Maquetación con precisión visual.",
        vibeNext: "Vibecoding Next",
        loadingProj: "Cargando Proyecto 🏗️",
        comingSoon: "Próximamente",
        deepTitle: "Análisis de Proyectos",
        deepYT: "Reto Técnico: YouTube Chaos",
        deepYTDesc: "Implementé un <strong>Dispatcher de Animaciones</strong> en JS para coordinar efectos complejos, priorizando la ejecución lógica del código.",
        deepCRUD: "Arquitectura: CRUD Management",
        deepCRUDDesc: "Desarrollé un sistema de gestión bajo <strong>POO</strong> en PHP. Enfoque en lógica de sesiones y flujo de datos en MySQL.",
        deepInfra: "Infraestructura & Datos",
        deepInfraDesc: "Dominé la <strong>conexión PHP-MySQL</strong> y el mapeo de IDs para vincular lógica con interfaces en Bootstrap.",
        deepADSO: "Análisis & Requisitos (ADSO)",
        deepADSODesc: "Especialista en la fase de análisis: requisitos, modelado <strong>MER</strong> y diagramas de clases para una lógica escalable.",
        detailedTitle: "Proyectos Destacados",
        detailedSub: "Explora mis desarrollos recientes y la lógica aplicada en cada uno.",
        fsMysql: "Fullstack & MySQL",
        crudLongDesc: "Sistema de gestión desarrollado con PHP. Implementa lógica de IDs y conversión de datos SQL a componentes dinámicos.",
        ytLongDesc: "Experimento de lógica pura donde se manipula el DOM usando principios de Vibecoding para resolver errores de forma creativa.",
        colorLongDesc: "Guía interactiva con Bootstrap y CSS, optimizando la visualización de datos técnicos de color.",
        googleLongDesc: "Desarrollo enfocado en estructura visual y arquitectura de componentes con lógica JS.",
        comingSoonTitle: "Próximamente",
        mvcTitle: "Proyecto Fullstack MVC...",
        mvcDesc: "Nuevo desarrollo bajo arquitectura <strong>MVC</strong>. Aplicando análisis lógico y modelos de datos para una integración completa.",
        btnInDev: "En desarrollo",
        btnVisit: "Visitar Sitio",
        btnChaos: "Ver Caos",
        btnLearn: "Aprender Colores",
        btnPrecision: "Ver Precisión",
        footerName: "Portafolio Profesional | <strong>Juan Esteban Parra Rodriguez</strong> | 2026",
        footerInfo: "Inglés Técnico B2-C1 | Analista ADSO | Vibecoding Expert"
    }
};

langToggler.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    const t = dictionary[currentLang];

    // 1. Header & Hero
    document.querySelector('.badge.bg-neon-soft').innerText = t.badgeAge;
    document.querySelector('.text-neon').innerText = t.badgeRole;
    document.querySelector('h3.h5.text-secondary').innerText = t.heroSubtitle;
    document.querySelector('p.lead.text-secondary').innerHTML = t.heroDesc;
    document.querySelector('a[href^="mailto"]').innerText = t.btnContact;

    // 2. Skill Cards
    const skillPs = document.querySelectorAll('header .col-md-4 p');
    if (skillPs.length >= 3) {
        skillPs[0].innerHTML = t.skillFront;
        skillPs[1].innerHTML = t.skillBack;
        skillPs[2].innerHTML = t.skillAI;
    }

    // 3. Marquee Section
    const sectionTitles = document.querySelectorAll('section h3.fw-bold');
    const sectionSubs = document.querySelectorAll('section p.text-secondary.small');
    
    if (sectionTitles[0]) sectionTitles[0].innerText = t.marqueeTitle;
    if (sectionSubs[0]) sectionSubs[0].innerText = t.marqueeSub;
    
    const marqueeCards = document.querySelectorAll('.marquee-content .card-body');
    marqueeCards.forEach((card, index) => {
        const h6 = card.querySelector('h6');
        const h5 = card.querySelector('h5');
        const p = card.querySelector('p');
        const btn = card.querySelector('.btn');

        if(index === 0) { h6.innerText = t.jsLogic; h5.innerText = t.ytChaos; p.innerText = t.ytDesc; if(btn) btn.innerText = t.btnVisit; }
        if(index === 1) { h6.innerText = t.uxStudy; h5.innerText = t.colorPsych; p.innerText = t.colorDesc; if(btn) btn.innerText = t.btnVisit; }
        if(index === 2) { h6.innerText = t.fsDb; h5.innerText = "Management CRUD 📊"; p.innerText = t.crudDesc; if(btn) btn.innerText = t.btnVisit; }
        if(index === 3) { h6.innerText = t.htmlCss; h5.innerText = "Google Clone 🔍"; p.innerText = t.googleDesc; if(btn) btn.innerText = t.btnVisit; }
        if(index === 4) { h6.innerText = t.vibeNext; h5.innerText = t.loadingProj; p.innerText = t.comingSoon; }
    });

    // 4. Project Deep Dive
    document.querySelector('h4.text-neon.uppercase').innerText = t.deepTitle;
    const deepDivs = document.querySelectorAll('.reveal-on-scroll');
    if (deepDivs.length >= 4) {
        deepDivs[0].querySelector('h5').innerText = t.deepYT;
        deepDivs[0].querySelector('p').innerHTML = t.deepYTDesc;
        deepDivs[1].querySelector('h5').innerText = t.deepCRUD;
        deepDivs[1].querySelector('p').innerHTML = t.deepCRUDDesc;
        deepDivs[2].querySelector('h5').innerText = t.deepInfra;
        deepDivs[2].querySelector('p').innerHTML = t.deepInfraDesc;
        deepDivs[3].querySelector('h5').innerText = t.deepADSO;
        deepDivs[3].querySelector('p').innerHTML = t.deepADSODesc;
    }

    // 5. Detailed Projects List (Bottom)
    if (sectionTitles[1]) sectionTitles[1].innerText = t.detailedTitle;
    if (sectionSubs[1]) sectionSubs[1].innerText = t.detailedSub;

    const projectRects = document.querySelectorAll('.project-rect .project-text');
    if (projectRects.length >= 5) {
        projectRects[0].querySelector('h6').innerText = t.fsMysql;
        projectRects[0].querySelector('p').innerText = t.crudLongDesc;
        projectRects[0].querySelector('a').innerText = t.btnVisit;
        
        projectRects[1].querySelector('h6').innerText = t.jsLogic;
        projectRects[1].querySelector('p').innerText = t.ytLongDesc;
        projectRects[1].querySelector('a').innerText = t.btnChaos;
        
        projectRects[2].querySelector('h6').innerText = t.uxStudy;
        projectRects[2].querySelector('p').innerText = t.colorLongDesc;
        projectRects[2].querySelector('a').innerText = t.btnLearn;
        
        projectRects[3].querySelector('h6').innerText = t.htmlCss;
        projectRects[3].querySelector('p').innerText = t.googleLongDesc;
        projectRects[3].querySelector('a').innerText = t.btnPrecision;
        
        projectRects[4].querySelector('h6').innerText = t.comingSoonTitle;
        projectRects[4].querySelector('h4').innerText = t.mvcTitle;
        projectRects[4].querySelector('p').innerHTML = t.mvcDesc;
        projectRects[4].querySelector('.btn').innerText = t.btnInDev;
    }

    // 6. Footer
    document.querySelector('footer p.small').innerHTML = t.footerName;
    document.querySelector('footer p.extra-small').innerText = t.footerInfo;

    // Actualizar el botón
    langToggler.innerHTML = currentLang === 'es' ? "🌐 ES / EN" : "🌐 EN / ES";
});