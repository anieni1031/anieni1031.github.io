import React from 'react'
import heart from "../assets/heart.png"
import styles from "./navbar.module.css"

export const Navbar = () => {
    return <nav className={styles.navbar}>
        <ul className={styles.menuItems}>
            <li>
                <a href="projects">projects</a>
            </li>
            <li>
                <a href="resume">resume</a>
            </li>
            <img src={heart} alt="cute heart" className={styles.heart}/>
        </ul>
    </nav>
}
