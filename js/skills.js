document.addEventListener('DOMContentLoaded', iniciarSkills);

async function iniciarSkills() {
  const pista = document.getElementById('pista');
  const carrusel = document.getElementById('carrusel');

  try {
    const res = await fetch('./data/skills.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const skills = await res.json();

    pista.innerHTML = skills.map(crearItem).join('');

    pista.innerHTML += pista.innerHTML;

    await esperarImagenes(pista);

    //    60 px por segundo (ajuste: 40 = lento, 100 = rápido)
    const VELOCIDAD_PX_SEG = 60;
    const anchoUnaLista = pista.scrollWidth / 2;
    const duracion = anchoUnaLista / VELOCIDAD_PX_SEG;
    pista.style.setProperty('--duracion', `${duracion}s`);

  } catch (err) {
    console.error('Error cargando skills:', err);
  }
}

function crearItem({ nombre, icono }) {
  return `
    <li data-nombre="${escapeHtml(nombre)}" title="${escapeHtml(nombre)}">
      <img src="${icono}" alt="${escapeHtml(nombre)}" loading="lazy" draggable="false">
    </li>
  `;
}

function esperarImagenes(contenedor) {
  const imgs = [...contenedor.querySelectorAll('img')];
  return Promise.all(
    imgs.map(img =>
      img.complete ? Promise.resolve()
                   : new Promise(r => { img.onload = img.onerror = r; })
    )
  );
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}