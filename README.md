# LinkedIn Clone — Minimal Full Stack App

This archive contains a minimal LinkedIn-like application (frontend + backend).

## Structure
- backend/  -> Node.js + Express + MongoDB
- frontend/ -> React (Vite) client

## Quickstart (backend)
1. cd backend
2. cp .env.example .env and fill values (MONGO_URI, JWT_SECRET). Optionally set Cloudinary creds.
3. npm install
4. npm run dev   # (requires nodemon) or npm start

## Quickstart (frontend)
1. cd frontend
2. npm install
3. create file `.env` with `VITE_API_URL=http://localhost:5000/api` if backend runs locally
4. npm run dev
5. Open http://localhost:3000

## Notes
- Image uploads: if Cloudinary env vars are set, uploads go to Cloudinary; otherwise they are saved in backend/uploads and served statically.
- The code is minimal for learning/assignment purposes. Add validations, security hardening, rate-limiting for production.
