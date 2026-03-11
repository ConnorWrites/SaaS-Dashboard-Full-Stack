import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../services/api";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    checkAuth()
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null; // or spinner

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
}