const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Obtener todas las notas
app.get('/api/notas', (req, res) => {
    db.query('SELECT * FROM notas', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Crear una nota
app.post('/api/notas', (req, res) => {
    const { titulo, contenido } = req.body;
    db.query('INSERT INTO notas (titulo, contenido) VALUES (?, ?)', [titulo, contenido], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, titulo, contenido });
    });
});

// Editar una nota
app.put('/api/notas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, contenido } = req.body;
    db.query('UPDATE notas SET titulo = ?, contenido = ? WHERE id = ?', [titulo, contenido, id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

// Eliminar una nota
app.delete('/api/notas/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM notas WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
