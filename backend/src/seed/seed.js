require('dotenv').config();

const connectDB = require('../config/db');
const Palabra = require('../models/Palabra');

const palabras = [
  {
    palabra: 'MELOETTA',
    slug: 'meloetta',
    tipos: ['PSÍQUICO', 'NORMAL'],
    descripcion:
      'Las melodías que canta tienen el poder de hacer sentir felicidad a los Pokémon que hay a su alrededor.',
  },
  {
    palabra: 'PIKACHU',
    slug: 'pikachu',
    tipos: ['ELÉCTRICO'],
    descripcion:
      'Cuando se enfada, este Pokémon descarga la energía que almacena en el interior de las bolsas de las mejillas.',
  },
  {
    palabra: 'CHIKORITA',
    slug: 'chikorita',
    tipos: ['PLANTA'],
    descripcion: 'Le encanta tomar el sol. Usa la hoja que tiene en la cabeza para localizar sitios cálidos.',
  },
  {
    palabra: 'OSHAWOTT',
    slug: 'oshawott',
    tipos: ['AGUA'],
    descripcion:
      'Blande la cuchillera del vientre a modo de daga. Tras bloquear con ella los movimientos del rival, contraataca asestando ágiles cuchilladas.',
  },
  {
    palabra: 'PURRLOIN',
    slug: 'purrloin',
    tipos: ['SINIESTRO'],
    descripcion:
      'Una vez que ha logrado distraer al rival mediante sus gestos adorables, lo araña de improviso con las garras mientras muestra un semblante risueño.',
  },
  {
    palabra: 'CHARMELEON',
    slug: 'charmeleon',
    tipos: ['FUEGO'],
    descripcion:
      'Ataca sin piedad al rival usando sus afiladas garras. Si se enfurece, la llama que tiene en la punta de la cola arde en tonos de un azul más intenso.',
  },
];

async function seed() {
  try {
    await connectDB();
    await Palabra.deleteMany({});
    await Palabra.insertMany(palabras);
    console.log(`✅ Se insertaron ${palabras.length} palabras`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al poblar la base de datos:', err.message);
    process.exit(1);
  }
}

seed();
