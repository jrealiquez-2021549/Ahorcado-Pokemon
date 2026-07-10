import { hangmanStages } from '../data/pokemonAssets';

export default function HangmanArt({ wrongGuesses }) {
  return (
    <img
      src={hangmanStages[wrongGuesses]}
      alt={`Ahorcado: ${wrongGuesses} de 6 errores`}
      className="w-28 h-28 sm:w-36 sm:h-36 object-contain"
    />
  );
}
