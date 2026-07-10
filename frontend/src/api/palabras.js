const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function fetchPalabraAleatoria() {
  const res = await fetch(`${API_URL}/api/palabras/random`);
  if (!res.ok) {
    throw new Error('No se pudo obtener una palabra del servidor');
  }
  return res.json();
}
