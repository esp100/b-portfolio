(function () {
  'use strict';

  const el = document.getElementById('texto');
  if (!el) return;

  let indice = 0;
  let intervalId = null;

  function getTextos() {
    if (window.PortfolioI18n && typeof window.PortfolioI18n.getRotatingTexts === 'function') {
      const arr = window.PortfolioI18n.getRotatingTexts();
      if (Array.isArray(arr) && arr.length) return arr;
    }
    
    return [
      'Desarrollador Python',
      'Analísta de Datos Jr',
      'Ingeniero en Sistemas Computacionales',
      'Backend Developer'
    ];
  }

  function start() {
    if (intervalId) clearInterval(intervalId);

    const textos = getTextos();
    indice = 0;
    el.style.transition = 'opacity 0.5s ease';
    el.style.opacity = 1;
    el.textContent = textos[0];

    intervalId = setInterval(function () {
      el.style.opacity = 0;
      setTimeout(function () {
        indice = (indice + 1) % textos.length;
        el.textContent = textos[indice];
        el.style.opacity = 1;
      }, 500);
    }, 2500);
  }

  document.addEventListener('languagechange', start);
  start();
})();