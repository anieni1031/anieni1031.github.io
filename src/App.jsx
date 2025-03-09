import { useState, useEffect } from 'react'
import { Home } from "./pages/home"
import { Projects } from "./pages/projects"
import styles from './App.module.css'
import { Routes, Route, useLocation } from "react-router-dom";

import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

function App() {
  const location = useLocation();

  useEffect(() => {
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
      </Routes>
    </div>
  )
}

export default App
