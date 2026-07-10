import { typeColors } from '../data/pokemonAssets';

export default function PokemonReveal({ palabra, imageSrc, visible }) {
  if (!visible) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={imageSrc}
        alt={palabra.palabra}
        className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[2px_2px_3px_rgba(0,0,0,0.35)]"
      />
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
      <p className="text-center text-xs sm:text-sm leading-snug px-1 text-ink-soft">
        {palabra.descripcion}
      </p>
    </div>
  );
}
