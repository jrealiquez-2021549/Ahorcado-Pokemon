import { playClickSound } from '../utils/sound';

const LETTERS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

export default function Keyboard({ guessedLetters, wordToGuess, disabled, onGuess }) {
  const handleGuess = (letter) => {
    playClickSound();
    onGuess(letter);
  };

  return (
    <div
      className="flex flex-wrap justify-center gap-1.5 max-w-lg mx-auto"
      role="group"
      aria-label="Teclado del juego"
    >
      {LETTERS.map((letter) => {
        const used = guessedLetters.has(letter);
        const correct = used && wordToGuess?.includes(letter);
        const wrong = used && !correct;

        return (
          <button
            key={letter}
            type="button"
            disabled={disabled || used}
            onClick={() => handleGuess(letter)}
            className={`
              font-display text-xs font-semibold w-8 h-8 sm:w-9 sm:h-9 rounded-md border
              flex items-center justify-center transition-colors
              disabled:cursor-not-allowed
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
              ${
                correct
                  ? 'bg-accent border-accent-dark text-white'
                  : wrong
                    ? 'bg-ball-red border-ball-red-dark text-white'
                    : 'bg-glass border-glass-border text-accent-dark hover:bg-white'
              }
              ${disabled && !used ? 'opacity-50' : ''}
            `}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}