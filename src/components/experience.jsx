import React from 'react'
import { Link, BrowserRouter} from "react-router-dom"
import styles from "./experience.module.css"

export const Experience = () => {
    return <section className={styles.container}>
        <div className={styles.content}>
            <div className={styles.item}>
                <h1>currently, I'm...</h1>
                <ul>
                    <li>interested in applying my skills to data analysis, engineering, and visualization</li>
                    <li>a front-end developer for <a href="https://www.watolink.ca/" target="_blank" rel="noopener noreferrer" className={styles.link}>WATOLINK</a>, a neurotechnology design team</li>
                    <li>an organizer for CxC, a data science hackathon hosted by <a href="https://www.uwdatascience.ca/" target="_blank" rel="noopener noreferrer" className={styles.link}>UW Data Science Club</a></li>
                    <li>seeking Summer 2025 internships!</li>
                </ul>
            </div>
            <div className={styles.item}>
                <h1>in the past, I...</h1>
                <ul>
                    <li>promoted and organized hackathons, lessons, and workshops for <a href="https://mcpt.ca/" target="_blank" rel="noopener noreferrer" className={styles.link}>MCPT</a> as the vice president</li>
                    <li>designed my school’s mobile app as a part of <a href="https://maclyonsden.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>Project Metropolis</a>, a student run organization behind the development of the school website</li>
                    <li>attended several hackathons and built winning <Link className={styles.link} to="/projects">projects</Link></li>
                </ul>
            </div>
            <div className={styles.item}>
                <h1>in other times, I'm...</h1> 
                <ul>
                    <li>exploring local eats and café’s while discovering new bubble tea flavours</li>
                    <li>getting active, whether it be through the PAC gym, badminton matches with friends, or snowboarding down big mountains</li>
                    <li>practicing my favourite songs on guitar!</li>
                </ul>
            </div>
        </div>
    </section>;
}
