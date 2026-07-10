import { useEffect, useRef, useState } from 'react';
import { duckBackgroundMusic, restoreBackgroundMusic } from '../utils/music';

export default function AudioPlayer({ src, disabled, autoPlay }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    restoreBackgroundMusic();
  }, [src]);

  useEffect(() => {
    if (disabled && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      restoreBackgroundMusic();
    }
  }, [disabled]);

  useEffect(() => {
    if (!autoPlay || disabled || !audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        duckBackgroundMusic();
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  const togglePlay = () => {
    if (disabled || !audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
      duckBackgroundMusic();
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      restoreBackgroundMusic();
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration || disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  return (
    <div
      className={`flex items-center gap-2 rounded-full glass-panel px-3 py-2 max-w-xs mx-auto ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          restoreBackgroundMusic();
        }}
      />
      <button
        type="button"
        onClick={togglePlay}
        disabled={disabled}
        aria-label={isPlaying ? 'Pausar sonido del Pokémon' : 'Reproducir sonido del Pokémon'}
        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-accent text-white text-xs"
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>
      <div
        onClick={handleSeek}
        className="flex-1 h-1.5 rounded-full bg-white/40 cursor-pointer overflow-hidden"
      >
        <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        defaultValue="1"
        disabled={disabled}
        onChange={(e) => {
          if (audioRef.current) audioRef.current.volume = e.target.value;
        }}
        className="w-12 accent-accent"
        aria-label="Volumen"
      />
    </div>
  );
}