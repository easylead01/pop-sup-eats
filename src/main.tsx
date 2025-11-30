import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  console.error("Root element with id 'root' not found. Check index.html on deployment.");
} else {
  createRoot(rootEl).render(<App />);
}
