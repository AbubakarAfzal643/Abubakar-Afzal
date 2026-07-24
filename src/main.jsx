import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Apply saved theme before React mounts — prevents flash
try {
  const saved = localStorage.getItem("portfolio-theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
} catch {}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
