import { useState } from 'react'
import { Navbar } from "./components/navbar"
import { About } from "./components/about"
import styles from './App.module.css'

function App() {
  return <div className={styles.App}>
    <Navbar/>
    <About/>
  </div>;
}

export default App
