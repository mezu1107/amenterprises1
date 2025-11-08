import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Preloader from "./components/Preloader";

const Root = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2200); // match preloader duration
    return () => clearTimeout(timer);
  }, []);

  return <>{!loaded ? <Preloader /> : <App />}</>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
