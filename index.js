const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let recetas = [];

// Obtener recetas de un usuario específico
app.get('/recetas/:usuarioId', (req, res) => {
    const { usuarioId } = req.params;
    const recetasUsuario = recetas.filter(r => r.usuarioId === usuarioId);
    res.json(recetasUsuario);
});

// Agregar una receta nueva (con usuarioId)
app.post('/recetas', (req, res) => {
    const nuevaReceta = req.body;
    if (!nuevaReceta.usuarioId) {
        return res.status(400).json({ error: 'Falta usuarioId' });
    }
    recetas.push(nuevaReceta);
    res.status(201).json(nuevaReceta);
});

// Eliminar una receta por título y usuario
app.delete('/recetas/:usuarioId/:titulo', (req, res) => {
    const { usuarioId, titulo } = req.params;
    recetas = recetas.filter(r => !(r.usuarioId === usuarioId && r.titulo === titulo));
    res.status(200).json({ mensaje: 'Receta eliminada' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en https://recetinhas-backend.onrender.com:${PORT}`);
});