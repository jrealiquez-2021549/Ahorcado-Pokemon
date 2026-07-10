export default function WordDisplay({ word, guessedLetters }) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5" aria-label="Palabra a adivinar">
      {[...word].map((letter, i) => (
        <div
          key={i}
          className="w-6 h-8 sm:w-7 sm:h-9 border-b-2 border-ink flex items-center justify-center font-display font-semibold text-lg sm:text-xl text-ink"
        >
          {guessedLetters.has(letter) ? letter : ''}
        </div>
      ))}
    </div>
  );
}
