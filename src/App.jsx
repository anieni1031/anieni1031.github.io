import { useState, useEffect } from 'react'
import { Navbar } from "./components/navbar"
import { About } from "./components/about"
import { Experience } from "./components/experience"
import { Footer } from "./components/footer"
import { Projects } from "./components/projects"
import styles from './App.module.css'
import { Routes, Route, useLocation } from "react-router-dom";

import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      multiplier: 1.2, // Controls smoothness speed
      lerp: 0.1, // Controls "stretchiness"
    });

    setTimeout(() => {
      scroll.update();
    }, 1000);

    return () => scroll.destroy();
  }, [location.pathname]);
  
  return <div data-scroll-container className={styles.App}>
    <Navbar />
    <Routes>
      <Route path="/" element={
        <div>
          <section data-scroll-section>
            <About />
          </section>,
          <section data-scroll-section>
            <Experience />
          </section>
        </div>
      } />
      <Route path="/projects" element={<Projects />} />
    </Routes>
    <section data-scroll-section>
      <Footer />
    </section>
  </div>;
}

export default App
