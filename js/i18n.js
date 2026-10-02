
(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio-lang';
  const DEFAULT_LANG = 'es';
  const SUPPORTED = ['es', 'en'];

  const translations = {
    es: {
      'page.title': 'Adrián Orozco · Data Engineer & Python Developer',

      'nav.inicio': 'Inicio',
      'nav.skills': 'Skills',
      'nav.proyectos': 'Proyectos',
      'nav.cursos': 'Cursos',
      'nav.contacto': 'Contacto',
      'lang.switch': 'Cambiar a inglés',

      'hero.hola': 'Hola, soy',
      'hero.subtitulo': 'Convierto datos complejos en decisiones.',
      'hero.descripcion':
        'Ingeniero en Sistemas Computacionales por el IPN ESCOM. Construyo pipelines de datos, automatizo procesos y desarrollo soluciones analíticas con Python, SQL y Google Cloud Platform.',

      'skills.titulo': 'Habilidades y tecnologías',
      'skills.descripcion':
        'Me interesa el ciclo completo del dato: desde su recolección y limpieza hasta su transformación y consumo analítico. Combino bases sólidas de backend con herramientas de ingesta, transformación y orquestación para construir soluciones que van del dato crudo a la decisión de negocio.',
      'skills.aria': 'Tecnologías',

      'proyectos.titulo': 'Proyectos',

      'p1.titulo': 'Optimización de Colocación de Cámaras de Vigilancia',
      'p1.subtitulo': 'Proyecto de titulación · Optimización combinatoria · 2025',
      'p1.desc1':
        'Trabajo Terminal de titulación. Modelé el problema de colocar n cámaras de vigilancia en el sistema C5 de la CDMX como un problema de optimización combinatoria, estimando zonas de riesgo y eligiendo la mejor combinación de regiones mediante algoritmos bioinspirados (PSO y Genético).',
      'p1.desc2':
        'Procesé datasets de 1.8K a 1.4B de registros con Python y KNIME, y entregué una herramienta web interactiva con Flask y Folium para visualizar las regiones propuestas.',
      'p1.colaboracion': 'En colaboración con',
      'p1.enlace': 'Artículo Técnico (TT 2025-A012)',
      'p1.imgAlt': 'Mapa con información de cámara de vigilancia',
      'p1.iframe': 'Mapa interactivo Folium',

      'p2.titulo': 'Nonogram Solver',
      'p2.desc':
        'Servicio web en Flask que resuelve nonogramas mediante un algoritmo genético, con un editor de cuadrículas binarias a partir de archivos CSV.',

      'p3.titulo': 'Árbol de filosofía - Wikipedia',
      'p3.desc':
        'En aproximadamente el 97% de los artículos de Wikipedia, seguir el primer enlace te lleva eventualmente al artículo de Filosofía. Este proyecto usa web scraping con BeautifulSoup para recorrer ejemplos de esos saltos y visualizar el árbol resultante con Pyvis.',
      'p3.iframe': 'Grafo de árbol Pyvis',

      'more.ver': 'Ver más proyectos',
      'more.ocultar': 'Ver menos proyectos',

      'repo1.titulo': 'Buscaminas Java',
      'repo1.desc':
        'Implementación del clásico Buscaminas con Java Swing, incluyendo lógica de tablero, minas y sistema de banderas.',

      'repo2.titulo': 'PWA Chat Cifrado',
      'repo2.desc':
        'Chat cifrado construido en Flask siguiendo una arquitectura de microservicios y desplegado como PWA. Proyecto comparativo del uso de Azure App Services, AWS App Runner y GCP Cloud Run.',

      'repo3.titulo': 'Flappy Bird Java',
      'repo3.desc':
        'Réplica jugable de Flappy Bird en Java Swing, con manejo de assets gráficos, colisiones y ciclo de juego.',

      'cursos.titulo': 'Cursos que he realizado',
      'cursos.error': 'No se pudieron cargar los cursos.',

      'footer.titulo': '¿Construimos algo juntos?',
      'footer.texto':
        'Estoy abierto a roles junior/trainee en Data Engineering, Data Analytics y desarrollo Python. Escríbeme y te respondo en menos de 24 horas.',
      'footer.enfoques': 'Enfoques',
      'footer.f1': 'Data Engineering',
      'footer.f2': 'Data Analytics',
      'footer.f3': 'Desarrollo Python',
      'footer.f4': 'Pipelines & ETL/ELT',
      'footer.f5': 'APIs RESTful'
    },

    en: {
      'page.title': 'Adrián Orozco · Data Engineer & Python Developer',

      'nav.inicio': 'Home',
      'nav.skills': 'Skills',
      'nav.proyectos': 'Projects',
      'nav.cursos': 'Courses',
      'nav.contacto': 'Contact',
      'lang.switch': 'Switch to Spanish',

      'hero.hola': "Hi, I'm",
      'hero.subtitulo': 'I turn complex data into decisions.',
      'hero.descripcion':
        'Computer Systems Engineer from IPN ESCOM. I build data pipelines, automate processes, and develop analytical solutions with Python, SQL, and Google Cloud Platform.',

      'skills.titulo': 'Skills & technologies',
      'skills.descripcion':
        'I care about the full data lifecycle: from collection and cleaning to transformation and analytical consumption. I combine solid backend foundations with ingestion, transformation, and orchestration tools to build solutions that go from raw data to business decisions.',
      'skills.aria': 'Technologies',

      'proyectos.titulo': 'Projects',

      'p1.titulo': 'Optimizing Surveillance Camera Placement',
      'p1.subtitulo': 'Thesis project · Combinatorial optimization · 2025',
      'p1.desc1':
        "Thesis project. I modeled the problem of placing n surveillance cameras in Mexico City's C5 system as a combinatorial optimization problem, estimating risk zones and choosing the best combination of regions using bio-inspired algorithms (PSO and Genetic).",
      'p1.desc2':
        'I processed datasets ranging from 1.8K to 1.4B records with Python and KNIME, and delivered an interactive web tool with Flask and Folium to visualize the proposed regions.',
      'p1.colaboracion': 'In collaboration with',
      'p1.enlace': 'Technical Article (TT 2025-A012)',
      'p1.imgAlt': 'Map showing surveillance camera information',
      'p1.iframe': 'Interactive Folium map',

      'p2.titulo': 'Nonogram Solver',
      'p2.desc':
        'Flask web service that solves nonograms using a genetic algorithm, with a binary grid editor that reads CSV files.',

      'p3.titulo': 'Philosophy Tree - Wikipedia',
      'p3.desc':
        'In roughly 97% of Wikipedia articles, following the first link eventually leads to the Philosophy article. This project uses web scraping with BeautifulSoup to trace sample jumps and visualize the resulting tree with Pyvis.',
      'p3.iframe': 'Pyvis tree graph',

      'more.ver': 'See more projects',
      'more.ocultar': 'See fewer projects',

      'repo1.titulo': 'Minesweeper Java',
      'repo1.desc':
        'Implementation of the classic Minesweeper with Java Swing, including board logic, mines, and a flag system.',

      'repo2.titulo': 'Encrypted Chat PWA',
      'repo2.desc':
        'Encrypted chat built with Flask following a microservices architecture and deployed as a PWA. Comparative project on using Azure App Services, AWS App Runner, and GCP Cloud Run.',

      'repo3.titulo': 'Flappy Bird Java',
      'repo3.desc':
        'Playable Flappy Bird clone in Java Swing, with graphics asset handling, collisions, and game loop.',

      'cursos.titulo': "Courses I've completed",
      'cursos.error': 'Could not load courses.',

      'footer.titulo': 'Shall we build something together?',
      'footer.texto':
        "I'm open to junior/trainee roles in Data Engineering, Data Analytics, and Python development. Write to me and I'll reply in less than 24 hours.",
      'footer.enfoques': 'Focus areas',
      'footer.f1': 'Data Engineering',
      'footer.f2': 'Data Analytics',
      'footer.f3': 'Python Development',
      'footer.f4': 'Pipelines & ETL/ELT',
      'footer.f5': 'RESTful APIs'
    }
  };

  const rotatingTexts = {
    es: [
      'Desarrollador Python',
      'Analísta de Datos Jr',
      'Ingeniero en Sistemas Computacionales',
      'Backend Developer'
    ],
    en: [
      'Python Developer',
      'Junior Data Analyst',
      'Computer Systems Engineer',
      'Backend Developer'
    ]
  };

  let currentLang = DEFAULT_LANG;

  /* ---------- Helpers ---------- */
  function getInitialLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.includes(stored)) return stored;
    } catch (e) { }

    const nav = (navigator.language || '').slice(0, 2).toLowerCase();
    return nav === 'en' ? 'en' : 'es';
  }

  function t(key, lang) {
    lang = lang || currentLang;
    const dict = translations[lang] || translations[DEFAULT_LANG];
    const fallback = translations[DEFAULT_LANG];
    return dict[key] != null ? dict[key] : (fallback[key] != null ? fallback[key] : key);
  }

  /* ---------- Aplicar traducciones al DOM ---------- */
  function applyTranslations(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      el.textContent = t(key, lang);
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      const spec = el.getAttribute('data-i18n-attr');
      if (!spec) return;
      spec.split(',').forEach(function (pair) {
        const parts = pair.split(':');
        const attr = parts[0] && parts[0].trim();
        const key = parts[1] && parts[1].trim();
        if (!attr || !key) return;
        el.setAttribute(attr, t(key, lang));
      });
    });

    document.title = t('page.title', lang);

    const btn = document.getElementById('langToggle');
    if (btn) {
      btn.dataset.lang = lang;
      btn.setAttribute('aria-label', t('lang.switch', lang));
      btn.setAttribute('title', t('lang.switch', lang));
    }

    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* noop */ }
    applyTranslations(lang);
  }

  function toggleLang() {
    setLang(currentLang === 'es' ? 'en' : 'es');
  }

  window.PortfolioI18n = {
    t: t,
    getLang: function () { return currentLang; },
    setLang: setLang,
    toggleLang: toggleLang,
    getRotatingTexts: function () {
      return rotatingTexts[currentLang] || rotatingTexts[DEFAULT_LANG];
    }
  };

  function init() {
    const btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', toggleLang);
    }
    applyTranslations(getInitialLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();