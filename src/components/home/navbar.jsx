import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter, useLocation} from "react-router-dom"
import resume from "../../../public/resume.pdf"

import heart from "../../assets/heart.png"
import styles from "./navbar.module.css"

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation(); 

    useEffect(() => {
        // Wait until Locomotive Scroll is initialized
        setTimeout(() => {
            const scrollContainer = window.scroll; // Get Locomotive Scroll instance

            if (!scrollContainer) return; // Ensure it exists

            // Locomotive Scroll's event listener
            scrollContainer.on("scroll", (instance) => {
                setScrolled(instance.scroll.y > 120);
            });
        }, 1000); // Ensure it's initialized before running

        return () => {
            if (window.scroll) window.scroll.off("scroll");
        };
    }, [location.pathname]);
    
    const isHomePage = location.pathname === "/";
    const isProjectsPage = location.pathname === "/projects";

    return <nav className={`${styles.navbar} ${scrolled ? styles.scrolledMobile : ""}
            ${isProjectsPage ? styles.projectsNavbar : ""}`}>
        <ul className={`${isProjectsPage ? styles.menuItemsp : styles.menuItems} ${styles.menuItems} ${scrolled && isHomePage ? styles.scrolled  : ""}`}>
            {isHomePage ? ( // navbar for home page
                <>
                    <li>
                        <Link to="/projects">projects</Link>
                    </li>
                    <li>
                        <a href={resume} target="_blank" rel="noopener noreferrer">resume</a>
                    </li>
                    <img src={heart} alt="cute heart" className={styles.heart}/>
                </>
            ) : ( // navbar for projects page
                <>
                        <li className={`${scrolled ? styles.scrolledp : ""}`}>
                        <Link to="/">home</Link>
                    </li>
                        <li className={`${scrolled ? styles.scrolledp : ""}`}>
                        <a href={resume} target="_blank" rel="noopener noreferrer">resume</a>
                    </li>
                        <img src={heart} alt="cute heart" className={`${styles.heart} ${scrolled ? styles.scrolledh : ""}`}/>
                </>
            )}
        </ul>
    </nav>
}
