# SaaS Dashboard (Full Stack)

A full-stack SaaS-style dashboard application with authentication, protected routes, and user-scoped data. Built to demonstrate React + Node.js architecture, deployment, and auth patterns. This project was built as a learning exercise to understand SaaS architecture, authentication, and deployment.

Live Demo:
👉 https://saas-dashboard-s11p.onrender.com

⸻

## Preview (GIF):
![Login screen](https://imgur.com/a/CJNWCqU)


## Features

	•	User registration & login
	•	JWT authentication stored in HTTP-only cookies
	•	Protected API routes
	•	User-scoped projects (each user sees only their own data)
	•	Create & delete projects
	•	Production build with React + Express
	•	Deployed on Render

⸻

## Tech Stack

Frontend

	•	React (Vite)
	•	JavaScript (ES modules)
	•	Fetch API
	•	CSS

Backend

	•	Node.js
	•	Express
	•	JWT authentication
	•	SQLite
	•	Cookie-based auth
	•	ES Modules

Deployment

	•	Render (single full-stack service)
	•	Environment variables for secrets
	•	Production static file serving


## 🔒 Protected Routes

Protected routes are implemented by:
- Calling a `/me` endpoint on the backend
- Verifying the JWT cookie server-side
- Allowing or denying access based on authentication state

This ensures:
- Users stay logged in after refresh
- Unauthorized users are redirected
- Auth logic lives on the server (not the browser)

---

## 🗂️ Project Structure


saas-dashboard/

├── client/              # React frontend

│   ├── src/

│   │   ├── components/  # Layout, Sidebar, ProtectedRoute

│   │   ├── pages/       # Login, Register, Dashboard

│   │   └── services/    # API abstraction

│   └── vite.config.js

│

├── server/              # Node/Express backend

│   ├── routes/          # auth, projects

│   ├── middleware/      # auth middleware

│   ├── db/              # SQLite setup

│   └── server.js

⸻

## Authentication Flow

	1.	User registers or logs in
	2.	Server creates a JWT
	3.	JWT is stored in an HTTP-only cookie
	4.	Protected routes verify the token
	5.	Each request is tied to the authenticated user

This approach prevents token access from JavaScript and mirrors production SaaS security patterns.

⸻

## API Routes

Auth

	•	POST /api/auth/register
	•	POST /api/auth/login
	•	POST /api/auth/logout
	•	GET /api/auth/me

Projects (Protected)

	•	GET /api/projects
	•	POST /api/projects
	•	DELETE /api/projects/:id

⸻


## ⚙️ Environment Variables

Create a .env file in the root:

JWT_SECRET=your-secret-key

In production, these are managed via Render’s environment settings.

⸻

## Tradeoffs & Design Decisions

	•	SQLite was chosen for simplicity and portability during development.
	•	Cookies over localStorage for improved security.
	•	Single-service deployment simplifies infrastructure and mirrors small SaaS setups.
	•	No ORM to keep database logic explicit and easy to reason about.

⸻

## What This Project Demonstrates

	•	Full authentication flow (frontend → backend → database)
	•	Route protection and user isolation
	•	Proper API routing and middleware usage
	•	Production deployment debugging and fixes
	•	Understanding of real-world full-stack architecture

⸻

## Future Improvements

	•	Edit project names
	•	Password reset flow
	•	Role-based access
	•	PostgreSQL migration
	•	UI polish & loading states
	•	Unit and integration tests

⸻

## Author

Connor Wilken
GitHub: https://github.com/ConnorWrites
