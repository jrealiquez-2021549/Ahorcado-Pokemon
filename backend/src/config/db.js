const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Falta la variable de entorno MONGODB_URI');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri);
  console.log('✅ Conectado a MongoDB');

  mongoose.connection.on('error', (err) => {
    console.error('❌ Error de conexión a MongoDB:', err.message);
  });
}

module.exports = connectDB;
