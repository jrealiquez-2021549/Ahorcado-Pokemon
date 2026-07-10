const { Schema, model } = require('mongoose');

const palabraSchema = new Schema(
  {
    palabra: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    // Identificador corto usado por el frontend para ubicar sus assets
    // (ej. "pikachu" -> /pokemon/pikachu.png y /pokemon/pikachu.mp3)
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    tipos: {
      type: [String],
      required: true,
      default: [],
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Palabra', palabraSchema);
