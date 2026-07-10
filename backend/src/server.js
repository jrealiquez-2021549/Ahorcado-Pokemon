require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const palabrasRoutes = require('./routes/palabras.routes');

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = (process.env.CORS_ORIGIN || '*')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origen no permitido por CORS: ${origin}`));
    },
  })
);
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ mensaje: 'API de Ahorcado Pokémon activa' });
});

app.use('/api/palabras', palabrasRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ mensaje: err.message || 'Error interno del servidor' });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('No se pudo iniciar el servidor:', err.message);
    process.exit(1);
  });