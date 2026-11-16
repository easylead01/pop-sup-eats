import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Старые ссылки вида …/#/admin переводим на обычные адреса
if (window.location.hash.startsWith("#/")) {
  window.history.replaceState(
    null,
    "",
    import.meta.env.BASE_URL + window.location.hash.slice(2) + window.location.search,
  );
}
// Прокрутку при «Назад/Вперёд» ведём сами (окно товара открывается поверх меню)
if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

const rootEl = document.getElementById("root");
if (!rootEl) {
  console.error("Root element with id 'root' not found. Check index.html on deployment.");
} else {
  createRoot(rootEl).render(<App />);
}
