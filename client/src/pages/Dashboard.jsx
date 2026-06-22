import styles from "./Dashboard.module.css";
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
  <div className={styles.container}>
    <h1 className={styles.title}>Dashboard</h1>

    <form onSubmit={handleAdd}>
      <input
        className={styles.input}
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
          <button className={styles.delete} onClick={() => handleDelete(p.id)}>
            X
          </button>
        </li>
      ))}
    </ul>
  </div>
);
}