document.addEventListener('DOMContentLoaded', cargarCursos);

document.addEventListener('languagechange', function () {
  if (!cursosCache.length) return;
  renderCursos();
});

let cursosCache = [];
let mostrandoTodos = false;
let ordenActual = 'prioridad';   // 'prioridad' | 'fecha'
let filtroTag = '';
let filtroProvider = '';
let controlesConectados = false;

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
    poblarFiltros(cursos);
    conectarControles();
    renderCursos();
  } catch (err) {
    console.error('Error cargando cursos: ', err);
    if (errorMsg) errorMsg.hidden = false;
  }
}

/* ---------- Rellenar selects de filtro con valores del JSON ---------- */
function poblarFiltros(cursos) {
  const tagSelect = document.getElementById('cursos-filtro-tag');
  const provSelect = document.getElementById('cursos-filtro-provider');

  if (tagSelect) {
    const tags = new Set();
    cursos.forEach(function (c) {
      (c.tags || []).forEach(function (t) { tags.add(t); });
    });
    const ordered = Array.from(tags).sort(function (a, b) { return a.localeCompare(b); });
    // Conserva la opción placeholder (índice 0)
    while (tagSelect.options.length > 1) tagSelect.remove(1);
    ordered.forEach(function (tag) {
      const opt = document.createElement('option');
      opt.value = tag;
      opt.textContent = tag;
      tagSelect.appendChild(opt);
    });
  }

  if (provSelect) {
    const provs = new Set();
    cursos.forEach(function (c) { if (c.provider) provs.add(c.provider); });
    const ordered = Array.from(provs).sort(function (a, b) { return a.localeCompare(b); });
    while (provSelect.options.length > 1) provSelect.remove(1);
    ordered.forEach(function (p) {
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = p;
      provSelect.appendChild(opt);
    });
  }
}

/* ---------- Listeners de controles ---------- */
function conectarControles() {
  if (controlesConectados) return;
  controlesConectados = true;

  const ordenSel = document.getElementById('cursos-orden');
  const tagSel   = document.getElementById('cursos-filtro-tag');
  const provSel  = document.getElementById('cursos-filtro-provider');
  const masBtn   = document.getElementById('cursos-mas');

  if (ordenSel) {
    ordenSel.addEventListener('change', function () {
      ordenActual = ordenSel.value;
      renderCursos();
    });
  }
  if (tagSel) {
    tagSel.addEventListener('change', function () {
      filtroTag = tagSel.value;
      renderCursos();
    });
  }
  if (provSel) {
    provSel.addEventListener('change', function () {
      filtroProvider = provSel.value;
      renderCursos();
    });
  }
  if (masBtn) {
    masBtn.addEventListener('click', mostrarMasCursos);
  }
}

/* ---------- Filtrado + ordenamiento ---------- */
function filtrarYOrdenar(cursos) {
  let result = cursos.slice();

  // Visibilidad global (show)
  if (!mostrandoTodos) {
    result = result.filter(function (c) { return c.show === true; });
  }

  // Filtro por etiqueta
  if (filtroTag) {
    result = result.filter(function (c) {
      return (c.tags || []).indexOf(filtroTag) !== -1;
    });
  }

  // Filtro por proveedor
  if (filtroProvider) {
    result = result.filter(function (c) { return c.provider === filtroProvider; });
  }

  // Orden
  if (ordenActual === 'fecha') {
    result.sort(function (a, b) {
      const da = (a.date || '').trim();
      const db = (b.date || '').trim();
      // Vacías al final
      if (!da && !db) {
        const pa = a.prioridad != null ? a.prioridad : 999;
        const pb = b.prioridad != null ? b.prioridad : 999;
        return pa - pb;
      }
      if (!da) return 1;
      if (!db) return -1;
      return db.localeCompare(da); // más reciente primero
    });
  } else {
    result.sort(function (a, b) {
      const pa = a.prioridad != null ? a.prioridad : 999;
      const pb = b.prioridad != null ? b.prioridad : 999;
      return pa - pb;
    });
  }

  return result;
}

/* ---------- Render ---------- */
function renderCursos() {
  const grid    = document.getElementById('cursos-grid');
  const vacio   = document.getElementById('cursos-vacio');
  const masBtn  = document.getElementById('cursos-mas');

  if (!grid) return;

  const lang = getLang();
  const filtrados = filtrarYOrdenar(cursosCache);
  const fragment = document.createDocumentFragment();

  filtrados.forEach(function (curso) {
    const url = 'https://' + curso.dominio + curso.id;

    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.classList.add('curso-card');

    const spanAlias = document.createElement('span');
    spanAlias.classList.add('curso-alias');
    spanAlias.textContent = (lang === 'en' && curso.alias_eng)
      ? curso.alias_eng
      : (curso.alias || '');
    a.appendChild(spanAlias);

    const info = document.createElement('div');
    info.classList.add('curso-info');

    if (curso.provider) {
      const providerEl = document.createElement('span');
      providerEl.classList.add('curso-provider');
      providerEl.textContent = curso.provider;
      info.appendChild(providerEl);
    }

    const tituloEl = document.createElement('h4');
    tituloEl.classList.add('curso-titulo');
    tituloEl.textContent = curso.titulo || '';
    info.appendChild(tituloEl);

    if (curso.date && curso.date.trim() !== '') {
      const dateEl = document.createElement('span');
      dateEl.classList.add('curso-fecha');
      dateEl.textContent = curso.date;
      info.appendChild(dateEl);
    }

    a.appendChild(info);
    fragment.appendChild(a);
  });

  grid.replaceChildren(fragment);

  // Estado vacío (por filtros)
  if (vacio) vacio.hidden = filtrados.length !== 0;

  // Botón "ver más/menos": visible sólo si existe al menos un curso oculto
  if (masBtn) {
    const hasHidden = cursosCache.some(function (c) { return c.show !== true; });
    masBtn.hidden = !hasHidden;
    masBtn.classList.toggle('is-expanded', mostrandoTodos);
    masBtn.setAttribute('aria-expanded', mostrandoTodos ? 'true' : 'false');
  }
}

/* ---------- Toggle "ver más / ver menos" ---------- */
function mostrarMasCursos() {
  mostrandoTodos = !mostrandoTodos;
  renderCursos();
}