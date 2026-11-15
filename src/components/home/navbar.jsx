import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom"

import styles from "./navbar.module.css"

// the way into the secret page: a bitten cookie, drawn in the same line as the text
const Cookie = () => (
    <svg className={styles.cookie} viewBox="0 0 24 24" aria-hidden="true">
        <path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-4.6-4.6A4 4 0 0 1 12 2Z" />
        <circle fill="currentColor" cx="8.5" cy="9.5" r="1.3" />
        <circle fill="currentColor" cx="13" cy="13.5" r="1.3" />
        <circle fill="currentColor" cx="8.5" cy="15.5" r="1.1" />
        <circle fill="currentColor" cx="15" cy="18" r="1" />
    </svg>
)

// the home button's icon: an iced matcha latte, matcha on top, with a straw
const Matcha = () => (
    <svg className={styles.matcha} viewBox="0 0 24 24" aria-hidden="true">
        <path fill="var(--color-matcha)" d="M6.4 8h11.2l-.75 7H7.15Z" />
        <path fill="none" stroke="var(--color-matcha)" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"
            d="M6 7h12l-1.5 14h-9ZM12.5 7l1.6-5h2.4" />
    </svg>
)

// contact links, as small icons beside the name
const socials = [
    {
        name: "email",
        href: "mailto:anniewong20061031@gmail.com",
        icon: <path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" d="M3 5.5h18v13H3ZM3.5 6.5l8.5 6.5 8.5-6.5" />,
    },
    {
        name: "github",
        href: "https://github.com/anieni1031",
        icon: <path fill="currentColor" transform="translate(1.6 1.6) scale(0.867)" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />,
    },
    {
        name: "linkedin",
        href: "https://www.linkedin.com/in/anniewong20061031/",
        icon: <>
            <path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM8 11v6M12 17v-6M12 13.6a2.3 2.3 0 0 1 4.6 0V17" />
            <circle fill="currentColor" cx="8" cy="7.6" r="1.2" />
        </>,
    },
]

// flips the site between light and dark mode
const LightSwitch = () => {
    const [dark, setDark] = useState(() => document.documentElement.dataset.theme === "dark");

    const flip = () => {
        const next = !dark;
        setDark(next);
        if (next) {
            document.documentElement.dataset.theme = "dark";
        } else {
            delete document.documentElement.dataset.theme;
        }
        try {
            localStorage.setItem("theme", next ? "dark" : "light");
        } catch (e) {
            // the choice just won't be remembered
        }
    };

    return <button type="button" className={styles.lightswitch} onClick={flip} aria-pressed={dark}>
        lightswitch
    </button>
}

export const Navbar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return <nav className={`page ${styles.navbar}`}>
        <div className={styles.brand}>
            <Link to="/" className={styles.wordmark} aria-label="annie wong, home">
                <Matcha />
                <span className={styles.wordmarkName}>annie wong</span>
            </Link>
            <ul className={styles.socials}>
                {socials.map(({ name, href, icon }) => (
                    <li key={name}>
                        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}>
                            <svg viewBox="0 0 24 24" aria-hidden="true">{icon}</svg>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
        <ul className={styles.menuItems}>
            <li>
                {isHomePage ? <Link to="/projects">projects</Link> : <Link to="/">home</Link>}
            </li>
            <li>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">resume</a>
            </li>
            <li>
                <LightSwitch />
            </li>
            <li>
                <Link to="/secret" aria-label="secret page">
                    <Cookie />
                </Link>
            </li>
        </ul>
    </nav>
}
