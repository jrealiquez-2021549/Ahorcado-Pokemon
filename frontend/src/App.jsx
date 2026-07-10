import { useGame } from './hooks/useGame';
import ConsoleShell from './components/ConsoleShell';
import GameScreen from './components/GameScreen';
import Keyboard from './components/Keyboard';
import Controls from './components/Controls';
import { startBackgroundMusic } from './utils/music';

export default function App() {
  const {
    palabra,
    status,
    guessedLetters,
    wrongGuesses,
    remainingTime,
    startGame,
    pauseGame,
    restartGame,
    guessLetter,
  } = useGame();

  const teclasDeshabilitadas = status !== 'jugando';

  const handleStart = () => {
    // Se llama dentro del click real del botón, así el navegador
    // permite reproducir audio (política de autoplay).
    startBackgroundMusic();
    startGame();
  };

  return (
    <ConsoleShell>
      <div className="flex flex-col items-center gap-5 w-full">
        <GameScreen
          palabra={palabra}
          status={status}
          guessedLetters={guessedLetters}
          wrongGuesses={wrongGuesses}
          remainingTime={remainingTime}
          keyboardSlot={
            <Keyboard
              guessedLetters={guessedLetters}
              wordToGuess={palabra?.palabra}
              disabled={teclasDeshabilitadas}
              onGuess={guessLetter}
            />
          }
        />

        <Controls
          status={status}
          onStart={handleStart}
          onPause={pauseGame}
          onRestart={restartGame}
        />
      </div>
    </ConsoleShell>
  );
}