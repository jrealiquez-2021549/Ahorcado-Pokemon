import { playClickSound } from '../utils/sound';

function ControlButton({ children, onClick, ...props }) {
  const handleClick = (e) => {
    playClickSound();
    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="font-display text-xs font-semibold px-4 py-2 rounded-full border-2 border-accent-dark bg-glass text-accent-dark hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      {...props}
    >
      {children}
    </button>
  );
}

export default function Controls({ status, onStart, onPause, onRestart }) {
  const jugando = status === 'jugando';
  const puedeIniciar = status === 'listo' || status === 'pausado';

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      <ControlButton onClick={onStart} disabled={!puedeIniciar}>
        Iniciar
      </ControlButton>
      <ControlButton onClick={onPause} disabled={!jugando}>
        Pausar
      </ControlButton>
      <ControlButton onClick={onRestart}>Reiniciar</ControlButton>
    </div>
  );
}