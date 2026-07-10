# Ahorcado API (Node.js + Express + MongoDB)

## Endpoints

- `GET /api/palabras` — lista todas las palabras.
- `GET /api/palabras/random` — devuelve una palabra aleatoria (la usa el frontend para iniciar cada partida).

## Correr en local

```bash
cp .env.example .env
# Edita .env y pon tu MONGODB_URI (ver sección MongoDB Atlas abajo)

npm install
npm run seed   # carga las 6 palabras Pokémon en la base de datos
npm run dev    # http://localhost:4000
```

## MongoDB Atlas (base de datos gratuita en la nube)

1. Crea una cuenta en https://www.mongodb.com/cloud/atlas/register
2. Crea un cluster gratuito (M0).
3. En "Database Access" crea un usuario y contraseña.
4. En "Network Access" agrega `0.0.0.0/0` (permitir acceso desde cualquier IP, necesario para Render).
5. En "Database" → "Connect" → "Drivers", copia el connection string y pégalo en `MONGODB_URI` dentro de `.env`, reemplazando `<password>` por tu contraseña real.

## Despliegue en Render

1. Sube esta carpeta `backend/` a un repo de GitHub (puede ser el mismo repo del frontend, en una subcarpeta).
2. En Render: "New" → "Web Service" → conecta el repo.
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
3. En "Environment" agrega las variables:
   - `MONGODB_URI` (tu connection string de Atlas)
   - `CORS_ORIGIN` (la URL de tu frontend en Vercel, ej. `https://ahorcado-pokemon.vercel.app`)
4. Después del primer deploy, corre el seed una sola vez desde el Shell de Render:
   ```bash
   npm run seed
   ```
