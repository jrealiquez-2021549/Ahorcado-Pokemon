import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchPalabraAleatoria } from '../api/palabras';

const TIME_LIMIT_SECONDS = 120;
const MAX_WRONG_GUESSES = 6;

// Estados posibles de la partida
// 'cargando' | 'error' | 'listo' (antes de darle Start) | 'jugando' | 'pausado' | 'ganado' | 'perdido' | 'tiempo-agotado'
export function useGame() {
  const [palabra, setPalabra] = useState(null);
  const [status, setStatus] = useState('cargando');
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [remainingTime, setRemainingTime] = useState(TIME_LIMIT_SECONDS);
  const intervalRef = useRef(null);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const loadNewWord = useCallback(async () => {
    stopTimer();
    setStatus('cargando');
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setRemainingTime(TIME_LIMIT_SECONDS);
    try {
      const nuevaPalabra = await fetchPalabraAleatoria();
      setPalabra(nuevaPalabra);
      setStatus('listo');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }, [stopTimer]);

  useEffect(() => {
    loadNewWord();
    return stopTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimer = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          stopTimer();
          setStatus('tiempo-agotado');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [stopTimer]);

  const startGame = useCallback(() => {
    if (status !== 'listo' && status !== 'pausado') return;
    setStatus('jugando');
    startTimer();
  }, [status, startTimer]);

  const pauseGame = useCallback(() => {
    if (status !== 'jugando') return;
    stopTimer();
    setStatus('pausado');
  }, [status, stopTimer]);

  const restartGame = useCallback(() => {
    loadNewWord();
  }, [loadNewWord]);

  const guessLetter = useCallback(
    (letter) => {
      if (status !== 'jugando' || !palabra) return;
      if (guessedLetters.has(letter)) return;

      const nuevasLetras = new Set(guessedLetters);
      nuevasLetras.add(letter);
      setGuessedLetters(nuevasLetras);

      if (palabra.palabra.includes(letter)) {
        const gano = [...palabra.palabra].every((l) => nuevasLetras.has(l));
        if (gano) {
          stopTimer();
          setStatus('ganado');
        }
      } else {
        const nuevosErrores = wrongGuesses + 1;
        setWrongGuesses(nuevosErrores);
        if (nuevosErrores >= MAX_WRONG_GUESSES) {
          stopTimer();
          setStatus('perdido');
        }
      }
    },
    [status, palabra, guessedLetters, wrongGuesses, stopTimer]
  );

  const juegoTerminado = ['ganado', 'perdido', 'tiempo-agotado'].includes(status);

  return {
    palabra,
    status,
    guessedLetters,
    wrongGuesses,
    remainingTime,
    maxWrongGuesses: MAX_WRONG_GUESSES,
    juegoTerminado,
    startGame,
    pauseGame,
    restartGame,
    guessLetter,
  };
}
