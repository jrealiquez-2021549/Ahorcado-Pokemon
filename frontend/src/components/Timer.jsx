export default function Timer({ seconds }) {
  const minutes = Math.floor((seconds ?? 0) / 60);
  const secs = (seconds ?? 0) % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const critico = seconds != null && seconds <= 15;

  return (
    <div
      className={`font-display font-bold text-3xl sm:text-4xl tabular-nums drop-shadow-[1px_1px_2px_rgba(0,0,0,0.4)] ${
        critico ? 'text-ball-red animate-pulse' : 'text-ink'
      }`}
      aria-live="polite"
    >
      {display}
    </div>
  );
}
