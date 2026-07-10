const { Router } = require('express');
const Palabra = require('../models/Palabra');

const router = Router();

// GET /api/palabras -> lista completa (sin la palabra en texto plano, por si luego se usa en un modo "adivina cuál falta")
router.get('/', async (_req, res, next) => {
  try {
    const palabras = await Palabra.find().sort({ createdAt: 1 });
    res.json(palabras);
  } catch (err) {
    next(err);
  }
});

// GET /api/palabras/random -> una palabra aleatoria para iniciar una partida
router.get('/random', async (_req, res, next) => {
  try {
    const [palabra] = await Palabra.aggregate([{ $sample: { size: 1 } }]);
    if (!palabra) {
      return res.status(404).json({ mensaje: 'No hay palabras cargadas todavía' });
    }
    res.json(palabra);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
