import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { resolveRoute } from "./i18n";

const { lang, page } = resolveRoute(window.location.pathname);
const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <App lang={lang} page={page} />
  </React.StrictMode>
);

if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
