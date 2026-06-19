# SaaS Dashboard AI Coding Guide

## Architecture Overview

This is a **separated frontend/backend SaaS application** with the following key characteristics:

- **Frontend:** React + Vite (client/)
- **Backend:** Node.js + Express (server/)
- **Database:** SQLite (database.db)
- **Auth:** Cookie-based JWT (HTTP-only cookies for XSS protection)
- **Deployment:** Separate Render services for frontend and backend

## Critical Data Flow: Authentication

**The most important pattern in this codebase:**

1. User logs in → `/api/auth/login` (email/password)
2. Backend validates password with `bcryptjs`, signs JWT with `process.env.JWT_SECRET`
3. JWT stored in **HTTP-only cookie** (never in localStorage)
4. Frontend calls `/api/auth/me` endpoint to verify auth status
5. `ProtectedRoute.jsx` wraps protected pages, calls `checkAuth()` to verify session

**Critical detail:** All API calls use `credentials: "include"` in fetch() to send cookies. See `client/src/services/api.js`.

## Project Structure & Key Files

- `server/routes/auth.js` - Register/Login/Logout/Me endpoints, cookie handling
- `server/middleware/auth.js` - JWT verification middleware for protected routes
- `server/db/db.js` - SQLite schema (users, projects tables)
- `client/src/components/ProtectedRoute.jsx` - Client-side auth guard
- `client/src/services/api.js` - Centralized API client with auth-aware fetch()
- `server/server.mjs` - Express setup, CORS with `credentials: true`, static file serving

## Build & Deployment Workflow

**Local Development:**
```bash
# Terminal 1: Backend
cd server && npm install && node server.mjs

# Terminal 2: Frontend  
cd client && npm install && npm run dev
```

**Production Build (used in root package.json):**
```bash
npm run build  # Runs: cd client && npm install && npm run build
npm start      # Runs: node server/server.mjs
```

The root `package.json` has scripts for Render deployment. Backend serves built React from `client/dist/` as static files, with SPA fallback to `index.html`.

## Authentication Specifics

### Cookie Configuration (server/routes/auth.js)
```javascript
res.cookie("token", token, {
  httpOnly: true,      // Blocks JS access, protects XSS
  secure: true,        // HTTPS only (required on Render)
  sameSite: "none",    // Allow cross-origin requests
  maxAge: 60 * 60 * 1000,  // 1 hour expiration
});
```

### API Calls Always Include Cookies (client/src/services/api.js)
```javascript
fetch("/api/auth/me", {
  credentials: "include",  // MUST be present on all auth-required endpoints
});
```

When adding new API endpoints that need auth:
1. Add middleware check in server route: `authMiddleware(req, res, next)`
2. Ensure frontend calls use `credentials: "include"`
3. Verify JWT_SECRET env var is set in deployment

## Deployment Considerations

- **Frontend:** Built React served from `client/dist/` by Express
- **Backend:** Runs on PORT env var (default 4000)
- **CORS:** Configured with `origin: true` and `credentials: true` for cookie support
- **Environment variables:** Must set JWT_SECRET in backend (uses in token signing)
- **Database:** SQLite file (`database.db`) persists locally; use managed DB for production

## Common Patterns

### Adding Protected Routes
1. Create page component in `client/src/pages/`
2. Wrap with `<ProtectedRoute>` in `App.jsx`
3. Add backend route in `server/routes/` with `authMiddleware`
4. Call from frontend using `credentials: "include"` in fetch

### Adding Auth-Required API Endpoints
```javascript
// server/routes/projects.js
router.get("/", authMiddleware, (req, res) => {
  // req.user contains { id, email } from JWT
  // Query with req.user.id for user-specific data
});
```

### Frontend API Abstraction
All backend calls go through `client/src/services/api.js` to centralize fetch logic and error handling. Always use this pattern:
```javascript
export async function featureName(params) {
  const res = await fetch("/api/endpoint", {
    credentials: "include",  // Always include
    // ... other options
  });
  if (!res.ok) throw new Error("Message");
  return res.json();
}
```

## Debugging Tips

- **Auth failing?** Check: `process.env.JWT_SECRET` is set, cookies are being sent (`credentials: "include"`), token isn't expired
- **CORS errors?** Ensure backend has `credentials: true` in CORS config
- **Routes not rendering?** Verify `ProtectedRoute` wrapper and `/me` endpoint is responding
- **Cookies not persisting?** Check `httpOnly`, `secure`, `sameSite` settings match client needs
