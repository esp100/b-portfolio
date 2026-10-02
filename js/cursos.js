
document.addEventListener('DOMContentLoaded', cargarCursos);

document.addEventListener('languagechange', function () {
  if (!cursosCache.length) return;
  const grid = document.getElementById('cursos-grid');
  if (grid) renderCursos(cursosCache, grid, mostrandoTodos);
});

let cursosCache = [];
let mostrandoTodos = false;

function getLang() {
  return (window.PortfolioI18n && window.PortfolioI18n.getLang)
    ? window.PortfolioI18n.getLang()
    : 'es';
}

async function cargarCursos() {
  const grid = document.getElementById('cursos-grid');
  const errorMsg = document.getElementById('cursos-error');

  if (!grid) {
    console.warn('[cursos.js] No existe #cursos-grid en el DOM. Abortando.');
    return;
  }

  try {
    const res = await fetch('./data/cursos.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const cursos = await res.json();

    cursosCache = cursos;
    renderCursos(cursos, grid, false);
  } catch (err) {
    console.error('Error cargando cursos: ', err);
    if (errorMsg) errorMsg.hidden = false;
  }
}

function filtrarYOrdenar(cursos, incluirOcultos) {
  return cursos
    .filter(function (c) { return incluirOcultos || c.show === true; })
    .sort(function (a, b) {
      return (a.prioridad != null ? a.prioridad : 999) -
             (b.prioridad != null ? b.prioridad : 999);
    });
}

function renderCursos(cursos, grid, incluirOcultos) {
  if (!grid) return;

  const lang = getLang();
  const filtrados = filtrarYOrdenar(cursos, !!incluirOcultos);
  const fragment = document.createDocumentFragment();

  filtrados.forEach(function (curso) {
    const dominio = curso.dominio;
    const id      = curso.id;
    const titulo  = curso.titulo;
    const alias   = curso.alias;
    const aliasEn = curso.alias_eng;
    const provider = curso.provider;
    const date    = curso.date;

    const url = 'https://' + dominio + id;

    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.classList.add('curso-card');

    const spanAlias = document.createElement('span');
    spanAlias.classList.add('curso-alias');
    spanAlias.textContent = (lang === 'en' && aliasEn) ? aliasEn : (alias || '');
    a.appendChild(spanAlias);

    const info = document.createElement('div');
    info.classList.add('curso-info');

    if (provider) {
      const providerEl = document.createElement('span');
      providerEl.classList.add('curso-provider');
      providerEl.textContent = provider;
      info.appendChild(providerEl);
    }

    const tituloEl = document.createElement('h4');
    tituloEl.classList.add('curso-titulo');
    tituloEl.textContent = titulo || '';
    info.appendChild(tituloEl);

    if (date && date.trim() !== '') {
      const dateEl = document.createElement('span');
      dateEl.classList.add('curso-fecha');
      dateEl.textContent = date;
      info.appendChild(dateEl);
    }

    a.appendChild(info);
    fragment.appendChild(a);
  });

  grid.replaceChildren(fragment);
}

function mostrarMasCursos() {
  if (mostrandoTodos) return;
  const grid = document.getElementById('cursos-grid');
  if (!grid) return;
  mostrandoTodos = true;
  renderCursos(cursosCache, grid, true);
}