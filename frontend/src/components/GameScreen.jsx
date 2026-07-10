import HangmanArt from './HangmanArt';
import Timer from './Timer';
import WordDisplay from './WordDisplay';
import AudioPlayer from './AudioPlayer';
import pokemonAssets, { typeColors } from '../data/pokemonAssets';

const MENSAJES = {
  cargando: 'Cargando Pokémon...',
  error: 'No se pudo conectar con el servidor.',
  listo: 'Presiona Iniciar para jugar',
  jugando: null,
  pausado: 'Juego en pausa',
  ganado: '¡Lo lograste!',
  perdido: 'Se acabaron los intentos',
  'tiempo-agotado': '¡Se acabó el tiempo!',
};

export default function GameScreen({
  palabra,
  status,
  guessedLetters,
  wrongGuesses,
  remainingTime,
  keyboardSlot,
}) {
  const juegoTerminado = ['ganado', 'perdido', 'tiempo-agotado'].includes(status);
  const assets = palabra ? pokemonAssets[palabra.slug] : null;
  const mensaje = MENSAJES[status];
  const cargandoOError = status === 'cargando' || status === 'error';

  if (cargandoOError) {
    return (
      <div className="flex flex-col items-center gap-3">
        <p className="font-display font-semibold text-sm text-center text-ink py-10">{mensaje}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Timer seconds={remainingTime} />

      <div className="game-grid">
        <div className="area-left glass-panel rounded-md p-3 flex items-center justify-center">
          {juegoTerminado && assets ? (
            <img
              src={assets.image}
              alt={palabra.palabra}
              className="w-32 h-32 sm:w-44 sm:h-44 object-contain drop-shadow-[2px_2px_3px_rgba(0,0,0,0.35)]"
            />
          ) : (
            <HangmanArt wrongGuesses={wrongGuesses} />
          )}
        </div>

        <div className="area-center glass-panel rounded-md p-4 sm:p-5 flex flex-col justify-between gap-3 text-center">
          <div className="flex flex-col items-center gap-2">
            {palabra && (
              <div className="flex flex-wrap justify-center gap-1">
                {palabra.tipos.map((tipo) => (
                  <span
                    key={tipo}
                    className="font-display text-[10px] font-semibold px-2.5 py-1 rounded-full text-white"
                    style={{ backgroundColor: typeColors[tipo] || '#68A090' }}
                  >
                    {tipo}
                  </span>
                ))}
              </div>
            )}

            {palabra && (
              <p className="text-xs sm:text-sm leading-relaxed text-ink px-1">
                {palabra.descripcion}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-2 pt-3 border-t border-white/20">
            {!juegoTerminado && (
              <p className="font-body text-xs text-ink-soft">Errores: {wrongGuesses}/6</p>
            )}

            {mensaje && (
              <p className="font-display text-xs font-semibold text-ink">{mensaje}</p>
            )}

            {assets && (
              <AudioPlayer
                src={assets.sound}
                disabled={status === 'cargando' || status === 'error' || status === 'listo'}
                autoPlay={juegoTerminado}
              />
            )}
          </div>
        </div>

        <div className="area-keyboard flex justify-center">{keyboardSlot}</div>

        <div className="area-word flex justify-center mt-2">
          {palabra && <WordDisplay word={palabra.palabra} guessedLetters={guessedLetters} />}
        </div>
      </div>
    </div>
  );
}