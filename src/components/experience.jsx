import React from 'react'
import styles from "./experience.module.css"

export const Experience = () => {
    return <section className={styles.container}>
        <div className={styles.content}>
            <div className={styles.item}>
                <h1>currently, I'm...</h1>
                <ul>
                    <li>interested in applying my skills to data analysis, engineering, and visualization</li>
                    <li>a front-end developer for WATOLINK, a neurotechnology design team</li>
                    <li>an organizer for CxC, a data science hackathon hosted by UW Data Science Club</li>
                    <li>seeking Summer 2025 internships!</li>
                </ul>
            </div>
            <div className={styles.item}>
                <h1>in the past, I...</h1>
                <ul>
                    <li>promoted and organized hackathons, lessons, and workshops for MCPT as the vice president</li>
                    <li>designed my school’s mobile app as a part of project metropolis, a student run organization behind the development of the school website</li>
                    <li>attended several hackathons and built winning projects</li>
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
