import React from 'react'
import styles from "./footer.module.css"
import email from "../assets/mailIcon.png"
import git from "../assets/gitIcon.png"
import linked from "../assets/inIcon.png"

export const Footer = () => {
    return <footer className={styles.footer}>
        <div className={styles.contact}>
            <a href="mailto:anniewong20061031@email.com" target="_blank" rel="noopener noreferrer">
                <img src={email} alt="mail icon"/>
            </a>
            <a href="https://github.com/anieni1031" target="_blank" rel="noopener noreferrer">
                <img src={git} alt="git icon"/>
            </a>
            <a href="https://www.linkedin.com/in/anniewong20061031/" target="_blank" rel="noopener noreferrer">
                <img src={linked} alt="linkedin icon"/>
            </a>
        </div>
        <p className={styles.copyright}>© Annie Wong, 2024</p>
    </footer>
}
