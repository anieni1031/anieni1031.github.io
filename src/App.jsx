import { useEffect } from 'react'
import { Home } from "./pages/home"
import { Projects } from "./pages/projects"
import { Secret } from "./pages/secret"
import styles from './App.module.css'
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  // start each page at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="secret" element={<Secret />} />
      </Routes>
    </div>
  )
}

export default App
