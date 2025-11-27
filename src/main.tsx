import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.tsx";
import About from "./pages/AboutUs.tsx";

type Page = "home" | "about";

function App() {
  const [page, setPage] = useState<Page>("home");

  if (page === "home") {
    return <Home onNavigate={setPage} />;
  }

  return <About onNavigate={setPage} />;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
