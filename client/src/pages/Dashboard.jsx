import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  deleteProject,
} from "../services/api";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProjects().then((data) => {
      console.log("Projects:", data);
      setProjects(data);
    });
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!name.trim()) return;

    const project = await createProject(name);
    setProjects((prev) => [...prev, project]);
    setName("");
  }

  async function handleDelete(id) {
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>

      <form onSubmit={handleAdd}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New project"
        />
        <button>Add</button>
      </form>

      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            {p.name}
            <button onClick={() => handleDelete(p.id)}>X</button>
          </li>
        ))}
      </ul>
      <button onClick={() => {localStorage.removeItem("token"); navigate("/");}}>Logout</button>
    </div>
  );
}