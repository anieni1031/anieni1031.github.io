import React from 'react'
import pfp from "../../assets/pfp.jpg"
import styles from "./about.module.css"

export const About = () => {
    return <section className={styles.container}>
        <div className={styles.content}>
            <h1>Hey there, I'm</h1>
            <h1 className={styles.name}>Annie Wong</h1>
            <p>I’m studying  <span className={styles.highlight}>Computing and Financial Management </span>
                at the  <span className={styles.highlight}>University of Waterloo.</span></p>
        </div>
        <img src={pfp} alt="me haha" className={styles.image}/>
    </section>;
}
