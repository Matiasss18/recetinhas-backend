const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let recetas = [];

// Obtener todas las recetas
app.get('/recetas', (req, res) => {
    res.json(recetas);
});

// Agregar una receta nueva
app.post('/recetas', (req, res) => {
    const nuevaReceta = req.body;
    recetas.push(nuevaReceta);
    res.status(201).json(nuevaReceta);
});

// Eliminar una receta por título
app.delete('/recetas/:titulo', (req, res) => {
    const titulo = req.params.titulo;
    recetas = recetas.filter(r => r.titulo !== titulo);
    res.status(200).json({ mensaje: 'Receta eliminada' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});