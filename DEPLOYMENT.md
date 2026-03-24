# PHASE 8 Deployment & Optimization Guide

## 1) MongoDB Atlas Setup
1. Create a MongoDB Atlas project and cluster.
2. Create a database user with readWrite permissions.
3. In Network Access, allow your deploy platforms:
   - Render/Railway egress ranges, or temporary `0.0.0.0/0` during setup.
4. Copy the connection string and set `MONGO_URI` in backend environment variables.

Example:

`mongodb+srv://<username>:<password>@<cluster>.mongodb.net/english_learning_app?retryWrites=true&w=majority`

## 2) Deploy Backend (Render)
1. Push repository to GitHub.
2. In Render, create a new Web Service from repo.
3. Set root directory to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `MONGO_URI=<your atlas uri>`
   - `JWT_SECRET=<long random secret>`
   - `JWT_EXPIRES_IN=7d`
   - `CLIENT_URL=https://<your-vercel-domain>`
   - `CLIENT_URLS=https://<your-vercel-domain>,https://<your-custom-domain>`
   - `RATE_LIMIT_WINDOW_MS=900000`
   - `RATE_LIMIT_MAX_REQUESTS=300`

After deploy, verify:
- `https://<backend-domain>/api/health`

## 3) Deploy Frontend (Vercel)
1. Import repository in Vercel.
2. Set project root to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variable:
   - `VITE_API_URL=https://<backend-domain>/api`

After deploy, test login/register and protected routes.

## 4) Setup Domain
1. Buy or use existing domain.
2. Configure DNS:
   - Frontend domain (`app.yourdomain.com`) -> Vercel target.
   - Backend domain (`api.yourdomain.com`) -> Render target.
3. Update backend `CLIENT_URLS` with your frontend custom domains.
4. Update frontend `VITE_API_URL` to custom backend domain.

## 5) Performance Optimizations Included
- Backend:
  - Compression enabled.
  - Helmet security headers enabled.
  - API rate limiting enabled.
  - Request logging via morgan.
  - CORS allow-list for multiple frontend domains.
- Frontend:
  - Route-level code splitting with React lazy/Suspense.
  - Manual vendor chunk splitting in Vite build.
  - Static assets cache policy via `frontend/vercel.json`.

## 6) Bug Fixes Included
- Frontend API client now handles non-JSON error responses safely.
- Added centralized backend 404 + error handling for API routes.
- Added backend trust proxy and production-ready CORS configuration.

## 7) Post-Deploy Checklist
- Register/login works in production.
- Vocabulary, Grammar, Exercises, Gamification, Advanced modules all load data.
- Speech feature tested in supported browser (Chrome/Edge).
- `api/health` returns 200.
- CORS has no blocked-origin errors in browser console.
- No secrets are committed in git.
