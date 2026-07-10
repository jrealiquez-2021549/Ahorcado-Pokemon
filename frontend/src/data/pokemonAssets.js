// Relaciona el "slug" que manda el backend con los assets estáticos servidos
// desde /public. Si agregas un Pokémon nuevo en el backend, agrega su entrada aquí.
const pokemonAssets = {
  meloetta: { image: '/pokemon/meloetta.png', sound: '/pokemon/meloetta.mp3' },
  pikachu: { image: '/pokemon/pikachu.png', sound: '/pokemon/pikachu.mp3' },
  chikorita: { image: '/pokemon/chikorita.png', sound: '/pokemon/chikorita.mp3' },
  oshawott: { image: '/pokemon/oshawott.png', sound: '/pokemon/oshawott.mp3' },
  purrloin: { image: '/pokemon/purrloin.png', sound: '/pokemon/purrloin.mp3' },
  charmeleon: { image: '/pokemon/charmeleon.png', sound: '/pokemon/charmeleon.mp3' },
};

export const hangmanStages = Array.from(
  { length: 7 },
  (_, i) => `/hangman/stage-${i}.png`
);

export const typeColors = {
  NORMAL: '#A4ACAC',
  FUEGO: '#FB7C24',
  AGUA: '#4393C4',
  PLANTA: '#9CCC53',
  ELÉCTRICO: '#EBD334',
  HIELO: '#53C4E4',
  LUCHA: '#D26324',
  VENENO: '#BC7CCC',
  TIERRA: '#413736',
  VOLADOR: '#4EA3D1',
  PSÍQUICO: '#F464BC',
  BICHO: '#749C3C',
  ROCA: '#A48A24',
  FANTASMA: '#776C8B',
  DRAGÓN: '#F46C54',
  ACERO: '#B8B8D0',
  SINIESTRO: '#747474',
  HADA: '#F9C2EA',
};

export default pokemonAssets;
