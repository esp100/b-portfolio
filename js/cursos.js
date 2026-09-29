document.addEventListener('DOMContentLoaded', cargarCursos)

async function cargarCursos() {
    const tbody = document.querySelector('#tabla-cursos tbody');
    const errorMsg = document.getElementById('cursos-error');

    try{
        const res = await fetch('./data/cursos.json');
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const cursos = await res.json();

        renderCursos(cursos, tbody);       
    }catch(err){
        console.error('Error cargando cursos: ', err);
        errorMsg.hidden = false;
    }
}

function renderCursos(cursos, tbody){
    const fragment = document.createDocumentFragment();

    cursos.forEach(({ dominio, id, titulo, alias }) =>{
        const url = `${dominio}${id}`;

        const tr = document.createElement('tr');

        const tdAlias = document.createElement('td');
        tdAlias.textContent = alias;
        tdAlias.classList.add('alias');

        const tdTitulo = document.createElement('td');
        const a = document.createElement('a');
        a.href = url;
        a.textContent = titulo;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        tdTitulo.appendChild(a);

        tr.append(tdAlias, tdTitulo);
        fragment.appendChild(tr);

    });

    tbody.replaceChildren(fragment);
}