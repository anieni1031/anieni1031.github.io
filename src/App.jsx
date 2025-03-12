import { useState, useEffect } from 'react'
import { Home } from "./pages/home"
import { Projects } from "./pages/projects"
import { Secret } from "./pages/secret"
import styles from './App.module.css'
import { Routes, Route, useLocation } from "react-router-dom";

import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

function App() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // for mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set to true for mobile devices
    };

    // Initial check
    handleResize();

    // Listen to resize events
    window.addEventListener('resize', handleResize);

    // Clean up listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // for desktop
  useEffect(() => {
    if (isMobile) return;

    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (!scrollContainer) return;

    window.scroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
      multiplier: 1.2,
      lerp: 0.1,
    });

    setTimeout(() => {
      scroll.update();
    }, 1000);

    return () => {
      if (scroll) scroll.destroy();
    };
  }, [location.pathname]);

  return (
    <div data-scroll-container className={styles.App}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="secret" element={<Secret />} />
      </Routes>
    </div>
  )
}

export default App
