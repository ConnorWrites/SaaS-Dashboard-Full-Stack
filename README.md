# SaaS Dashboard (Full Stack)

A full-stack SaaS-style dashboard built with React, Node.js, Express, and SQLite.  
It demonstrates real-world authentication, protected routes, persistent sessions, and a scalable dashboard layout.

---

## 🚀 Live Demo

**Frontend:** https://<your-frontend>.onrender.com  
**Backend API:** https://<your-backend>.onrender.com  

> Deployed on Render using separate frontend and backend services.

---

## 🧠 Why This Project Exists

This project was built to showcase how **real SaaS applications** are structured and deployed.

Unlike simple demo apps, this dashboard includes:
- Secure authentication
- Protected routes
- Persistent sessions using cookies
- A reusable layout system
- Production deployment considerations

The goal was to build something closer to what you'd see in a real product, not just a coding exercise.

---

## ✨ Features

- User registration & login
- Secure authentication using JWT stored in HTTP-only cookies
- Protected routes that verify authentication with the backend
- Persistent login across page refreshes
- SaaS-style layout with sidebar and header
- Collapsible sidebar
- User information displayed in the header
- Logout functionality
- Full frontend ↔ backend separation
- Deployed to production (Render)

---

## 🧱 Tech Stack

### Frontend
- React
- React Router
- Vite
- CSS

### Backend
- Node.js
- Express
- SQLite
- JWT (JSON Web Tokens)
- bcrypt

### Deployment
- Render (Frontend + Backend as separate services)

---

## 🔐 Authentication Architecture

This app uses **cookie-based JWT authentication**, similar to real SaaS products.

### How it works:

1. User logs in with email & password
2. Backend validates credentials
3. Backend signs a JWT and stores it in an **HTTP-only cookie**
4. Browser automatically sends the cookie with every request
5. Protected routes verify the JWT on the server
6. Frontend never accesses the token directly

### Why cookies instead of localStorage?

- Prevents XSS attacks
- Works naturally with sessions
- Matches production SaaS patterns
- More secure than storing tokens in JavaScript

---

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

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

JWT_SECRET=your-secret-key
PORT=4000

### Frontend (`client/.env`)

VITE_API_URL=https://saas-dashboard-full-stack.onrender.com

> Environment variables are injected on Render for production.

---

## 🛠️ Running Locally

### Backend
```bash
cd server
npm install
node server.js

### Frontend

cd client
npm install
npm run dev

📸 Screenshots

Add screenshots of the dashboard, login page, and sidebar here.

⸻

📈 What This Project Demonstrates
	•	Real authentication flows (not localStorage hacks)
	•	Clean frontend architecture with layouts and nested routes
	•	Backend-verified authorization
	•	Deployment debugging and cloud constraints
	•	Production-ready security decisions

⸻

🔮 Possible Improvements
	•	Role-based access (admin/user)
	•	User profile editing
	•	Billing or subscription logic
	•	Pagination and filtering
	•	UI polish and animations

⸻

👤 Author

Conrad Wilken
Frontend / Full-Stack Developer

GitHub: https://github.com/ConnorWrites

