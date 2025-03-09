import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter, useLocation} from "react-router-dom"
import resume from "../../../public/resume.pdf"

import heart from "../../assets/heart.png"
import styles from "./navbar.module.css"

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation(); 
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        // Check scroll position for mobile
        if (window.innerWidth <= 768) {
            // For mobile, check scroll position to make navbar sticky
            if (window.scrollY > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Initialize Locomotive Scroll only for desktop
        if (window.innerWidth <= 768) return; // Skip Locomotive Scroll for mobile

        const scrollContainer = document.querySelector("[data-scroll-container]");
        if (!scrollContainer) return;

        const scroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            multiplier: 1.2,
            lerp: 0.1,
        });

        scroll.on("scroll", (instance) => {
            // Locomotive Scroll scroll event handling
            setScrolled(instance.scroll.y > 120);
        });

        return () => {
            if (scroll) scroll.destroy(); // Clean up Locomotive Scroll on unmount
        };
    }, [location.pathname]);
    
    const isHomePage = location.pathname === "/";
    const isProjectsPage = location.pathname === "/projects";

    return <nav className={`${styles.navbar} ${isSticky ? styles.sticky : ""}
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
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <a href={resume} target="_blank" rel="noopener noreferrer">resume</a>
                    </li>
                        <img src={heart} alt="cute heart" className={styles.heart}/>
                </>
            )}
        </ul>
    </nav>
}
