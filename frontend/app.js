const API_URL = 'http://localhost:3000/api/notas';
const form = document.getElementById('nota-form');
const listaNotas = document.getElementById('lista-notas');

let editandoId = null;

async function cargarNotas() {
    const res = await fetch(API_URL);
    const notas = await res.json();

    listaNotas.innerHTML = '';

    notas.forEach(nota => {
        const div = document.createElement('div');
        div.classList.add('nota');

        const titulo = document.createElement('h3');
        titulo.textContent = nota.titulo;

        const contenido = document.createElement('p');
        contenido.textContent = nota.contenido;

        const botones = document.createElement('div');
        botones.classList.add('nota-buttons');

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', () => {
            editarNota(nota.id, nota.titulo, nota.contenido);
        });

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
            eliminarNota(nota.id);
        });

        botones.appendChild(btnEditar);
        botones.appendChild(btnEliminar);
        div.appendChild(titulo);
        div.appendChild(contenido);
        div.appendChild(botones);
        listaNotas.appendChild(div);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value.trim();
    const contenido = document.getElementById('contenido').value.trim();

    if (!titulo || !contenido) {
        alert('Por favor completa ambos campos');
        return;
    }

    if (editandoId) {
        await fetch(`${API_URL}/${editandoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, contenido })
        });
        editandoId = null;
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, contenido })
        });
    }

    form.reset();
    cargarNotas();
});

async function eliminarNota(id) {
    if (confirm('¿Quieres eliminar esta nota?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        cargarNotas();
    }
}

function editarNota(id, titulo, contenido) {
    document.getElementById('titulo').value = titulo;
    document.getElementById('contenido').value = contenido;
    editandoId = id;
}

cargarNotas();
