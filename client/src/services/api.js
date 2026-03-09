const API_URL = import.meta.env.VITE_API_URL;

export async function register(email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
}

export async function getProjects() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function createProject(name) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  return res.json();
}

export async function deleteProject(id) {
  const token = localStorage.getItem("token");

  await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}