import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Preloader from "./components/Preloader";

const Root = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onLoaded={() => setLoaded(true)} />}
      {loaded && <App />}
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

createRoot(document.getElementById("root")!).render(<App />);
