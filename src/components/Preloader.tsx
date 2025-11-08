import React, { useEffect, useState } from "react";
import "./Preloader.css";
import logo from "@/assets/logo.png"; // your logo path

const Preloader: React.FC<{ onLoaded?: () => void }> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onLoaded) onLoaded();
          return 100;
        }
        return prev + 1; // increase 1% per interval
      });
    }, 20); // 20ms interval → ~2 seconds total

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`preloader ${progress === 100 ? "fade-out" : ""}`}>
      <img src={logo} alt="AM Enterprises Logo" className="preloader-logo" />
      <h2>AM Enterprises</h2>
      <p>360° Digital Marketing Agency</p>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <span className="progress-text">{progress}%</span>
    </div>
  );
};

export default Preloader;
