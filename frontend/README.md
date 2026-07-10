# Ahorcado Pokémon (React + Vite + Tailwind)

Juego de ahorcado con Pokémon, con estética de consola retro (pantalla LCD estilo
Game Boy). Sin login: el juego es público.

## Correr en local

```bash
cp .env.example .env
# VITE_API_URL debe apuntar a tu backend (http://localhost:4000 en desarrollo)

npm install
npm run dev   # http://localhost:5173
```

Necesitas el backend corriendo (ver ../backend/README.md) y la base de datos
poblada con `npm run seed` en el backend.

## Despliegue en Vercel

1. Sube esta carpeta `frontend/` a GitHub (puede ser el mismo repo que el backend,
   en una subcarpeta).
2. En Vercel: "Add New" -> "Project" -> importa el repo.
   - Root Directory: `frontend`
   - Framework Preset: Vite (detectado automaticamente)
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. En "Environment Variables" agrega:
   - `VITE_API_URL` -> la URL publica de tu backend en Render (ej.
     `https://ahorcado-api.onrender.com`)
4. Deploy. Cuando termine, copia la URL final de Vercel y ponla como
   `CORS_ORIGIN` en las variables de entorno del backend en Render (si no lo
   hiciste antes), para que el navegador no bloquee las peticiones por CORS.

## Estructura

- `src/hooks/useGame.js` - toda la logica del juego (temporizador, intentos,
  estados de victoria/derrota/tiempo agotado).
- `src/api/palabras.js` - cliente que llama al backend.
- `src/data/pokemonAssets.js` - mapa de slug -> imagen/sonido en `public/`.
- `src/components/` - piezas visuales (pantalla LCD, teclado, controles,
  reproductor de audio, etc).
