import React from 'react'
import styles from "./footer.module.css"

export const Footer = () => {
    return <footer className={`page ${styles.footer}`}>
        <div className={styles.contact}>
            <a href="mailto:anniewong20061031@gmail.com">email</a>
            <a href="https://github.com/anieni1031" target="_blank" rel="noopener noreferrer">github</a>
            <a href="https://www.linkedin.com/in/anniewong20061031/" target="_blank" rel="noopener noreferrer">linkedin</a>
        </div>
        <p className={styles.copyright}>© Annie Wong, 2026</p>
    </footer>
}
