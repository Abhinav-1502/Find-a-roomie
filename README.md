# FindRoomie

FindRoomie is a full-stack web platform that helps students and young professionals discover compatible roommates, publish room listings, and explore local housing options. The project is structured as a JavaScript/TypeScript monorepo with an Express/MongoDB backend and a React + Redux frontend enhanced with real-time chat, multilingual support, and interactive maps.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [API & Documentation](#api--documentation)
- [Testing](#testing)
- [Deployment Notes](#deployment-notes)

## Features
- **Roommate & listing discovery:** Browse and filter listings by location, price, amenities, and preferences; save favorites and manage your own posts.
- **Guided listing creation:** Multi-step forms, photo uploads, and post editing to streamline room advertising.
- **Account & profile management:** Secure signup/login with JWT, password resets, and profile updates stored in MongoDB.
- **Interactive maps:** Leaflet-based map visualizations to quickly assess neighborhoods and proximity.
- **Community blog:** Curated blog feed with CRUD endpoints to highlight tips, events, and success stories.
- **Real-time messaging:** Socket.IO rooms with typing indicators and presence updates for prospective roommates.
- **Internationalization:** Built-in translations (English, Spanish, Telugu) via `react-i18next`.
- **Progressive enhancements:** Offline-ready service worker, responsive layout, and reusable UI components built with Material UI.

## Architecture
```
.
├── backend/              # Express API, Mongoose models, Socket.IO server, OpenAPI specs
│   ├── app/
│   │   ├── controllers/  # Route handlers for users, rooms, blogs, images, filters
│   │   ├── model/        # Mongoose schemas (users, room posts, profiles, blogs, images)
│   │   ├── routes/       # Express routers mounted under /api, /roomposts, /blogs, etc.
│   │   └── services/     # Business logic shared by controllers
│   ├── openAPI/          # YAML definitions for REST endpoints
│   └── server.js         # App bootstrap and Socket.IO initialization
├── frontend/             # React (TypeScript) SPA
│   ├── src/
│   │   ├── components/   # Reusable UI widgets and feature-specific components
│   │   ├── pages/        # Route-level views (Home, Listings, Blogs, Profile, etc.)
│   │   ├── redux/        # Global state (slices for auth, listings, blogs, notifications)
│   │   └── services/     # Axios wrappers for API integration
└── package.json          # Workspace scripts to manage both apps
```

## Tech Stack
- **Frontend:** React 18, TypeScript, Redux Toolkit, React Router, Material UI, Leaflet, Axios, Socket.IO client, i18next.
- **Backend:** Node.js, Express, Mongoose, MongoDB, JWT, Bcrypt, Multer (uploads), Socket.IO.
- **Tooling:** npm workspaces, Concurrently, Service Worker/Workbox, Jest + React Testing Library (frontend).

## Prerequisites
- Node.js 18+ and npm 9+ (check with `node -v` / `npm -v`).
- MongoDB Atlas cluster or self-hosted MongoDB instance.
- Optional: Vercel or another Node-compatible hosting environment for deployment.

## Environment Variables

Create the following `.env` files before running the project:

- **Backend (`backend/.env`):**
  ```
  MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<dbName>?retryWrites=true&w=majority
  SECRET_KEY=super-secret-jwt-signing-key
  PORT=3002
  ```

- **Frontend (`frontend/.env`):**
  ```
  REACT_APP_API_BASE_URL=http://localhost:3002
  ```

Adjust `REACT_APP_API_BASE_URL` (and optional `PORT`) to match your deployed API.

## Getting Started
1. **Clone**
   ```bash
   git clone https://github.com/<your-org>/FindRoomie.git
   cd FindRoomie
   ```
2. **Install dependencies**
   ```bash
   npm run install-all
   ```
   This script installs packages in the root, `frontend`, and `backend` directories.
3. **Run the apps**
   - Start both servers together:
     ```bash
     npm start
     ```
   - Or run them separately:
     ```bash
     npm run start-backend
     npm run start-frontend
     ```
4. Visit the frontend at `http://localhost:3000` (default React dev server). The React app proxies API calls to the URL specified in `REACT_APP_API_BASE_URL`.

## Available Scripts
| Context    | Script                  | Description                                    |
|------------|-------------------------|------------------------------------------------|
| Root       | `npm run install-all`   | Install dependencies for root, frontend, backend |
| Root       | `npm start`             | Launch backend + frontend via Concurrently     |
| Root       | `npm run start-backend` | Run the Express API only                       |
| Root       | `npm run start-frontend`| Run the React dev server only                  |
| Frontend   | `npm run build`         | Production bundle (outputs to `frontend/build`)|
| Frontend   | `npm test`              | Run Jest + React Testing Library suite         |
| Backend    | `npm start`             | Start backend when working inside `backend/`   |

## API & Documentation
- REST endpoints are grouped under:
  - `POST /api/users/api/signup`, `POST /api/users/api/login`, `POST /api/users/api/password-reset`
  - `GET/PUT /api/users/api/:loginId` for profile data
  - `GET /roomposts`, `POST /roomposts`, `PUT /roomposts/:id`, `DELETE /roomposts/:id`
  - `GET /roomlistings/filters` for discovery filters
  - `GET /blogs`, `POST /blogs`, `PUT /blogs/:id`, `DELETE /blogs/:id`
  - `POST /upload` and `GET /upload/:imageId` for media management
- Real-time messaging runs on the same host via Socket.IO events (`joinRoom`, `leaveRoom`, `typing`, `sendMessage`).
- Detailed OpenAPI specs live in `backend/openAPI/*.yml`; import them into Postman/Swagger UI for interactive exploration.

## Testing
- Frontend unit/integration tests:
  ```bash
  cd frontend
  npm test
  ```
  Watch mode uses Jest and `@testing-library/react`.
- Backend currently ships without automated tests; consider adding Jest or Vitest suites for controllers and services.

## Deployment Notes
- Backend expects `process.env.MONGODB_URI` and `process.env.SECRET_KEY` to be defined by the hosting environment. The included `vercel.json` demonstrates configuration for Vercel serverless deployment.
- When deploying the frontend, ensure `REACT_APP_API_BASE_URL` points to the live API before running `npm run build`.
- Configure CORS and Socket.IO origins (`backend/app/socket.js`) to allow your production domain.

---

Feel free to open issues or submit pull requests with enhancements, bug fixes, or documentation improvements.
