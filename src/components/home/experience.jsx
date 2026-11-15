import React from 'react'
import { Link } from "react-router-dom"
import styles from "./experience.module.css"

const current = [
    {
        role: "product intern",
        place: "Sezzle",
        link: "https://sezzle.com/",
        tags: ["new", "co-op"],
        dates: "sep 2026 – present",
        description: "crafting the fintech product empowering the next generation",
    },
]

const past = [
    {
        role: "technology and data intern",
        place: "CPP Investments",
        link: "https://www.cppinvestments.com/",
        tags: ["co-op"],
        dates: "jan – apr 2026",
        description: "tinkered with cloud platform and AI tooling to support teams across the company",
    },
    {
        role: "fullstack developer",
        place: "Sparklease",
        link: "https://sparklease.com/",
        tags: ["co-op"],
        dates: "may – aug 2025",
        description: "engineered fullstack solutions for an automotive marketplace platform",
    },
    {
        role: "vp of events ~ vp of social media",
        place: "UW Data Science Club",
        link: "https://www.uwdatascience.ca/",
        tags: ["ec"],
        dates: "sep 2025 – aug 2026",
        description: "led the organization of university-wide events + the club’s promotion and social media",
    },
    {
        role: "front-end developer",
        place: "WATOLINK",
        link: "https://www.watolink.ca/",
        tags: ["ec"],
        dates: "jan – dec 2025",
        description: "built the front end for a neurotechnology design team",
    },
    {
        role: "organizer",
        place: "CxC, UW Data Science Club",
        link: "https://www.uwdatascience.ca/",
        tags: ["ec"],
        dates: "jan – apr 2025",
        description: "helped run Canada’s largest data science hackathon",
    },
    {
        role: "course assistant",
        place: "University of Waterloo",
        link: "https://uwaterloo.ca/",
        tags: ["academic"],
        dates: "sep – dec 2025",
        description: "for CFM 101, intro to financial markets and data analytics",
    },
    {
        role: "app designer",
        place: "Project Metropolis",
        link: "https://maclyonsden.com/",
        tags: ["ec"],
        dates: "jan – jun 2024",
        description: "redesigned my school’s mobile app as part of a student-run team",
    },
]

const sides = [
    {
        role: "baking",
        description: "hence the design of this site. currently perfecting my craft on the infamous macaron + cooking up unique flavours",
    },
    {
        role: "dancing",
        description: "exploring styles of hip-hop and jazz funk in front of a studio mirror",
    },
    {
        role: "getting active",
        description: "the PAC gym, badminton matches with friends, or snowboarding down big mountains",
    },
]

// one line of the menu: what I did, a dotted leader, where I did it
const Item = ({ role, place, link, tags = [], dates, description }) => (
    <li className={styles.item}>
        <div className={styles.row}>
            <span className={styles.role}>{role}</span>
            {tags.map((tag) => (
                <span key={tag} className={`${styles.tag} ${tag === "new" ? styles.fresh : ""}`}>{tag}</span>
            ))}
            {place && <span className={styles.leader} aria-hidden="true" />}
            {link
                ? <a href={link} target="_blank" rel="noopener noreferrer" className={`text-link ${styles.place}`}>{place}</a>
                : place && <span className={styles.place}>{place}</span>}
        </div>
        <div className={styles.details}>
            {description && <p className={styles.description}>{description}</p>}
            {dates && <p className={styles.dates}>{dates}</p>}
        </div>
    </li>
)

// a course on the menu
const Course = ({ label, title, items, children }) => (
    <div className={styles.group}>
        <p className={`eyebrow ${styles.label}`}>{label}</p>
        <h2>{title}</h2>
        <ul>
            {items.map((item) => <Item key={item.role} {...item} />)}
        </ul>
        {children}
    </div>
)

export const Experience = () => {
    return <section className={`page ${styles.container}`}>
        <div className={styles.menu}>
            <p className={styles.menuTitle}>menu</p>
            <Course label="now" title="fresh out the oven" items={current} />
            <Course label="previously" title="past bakes" items={past}>
                <p className={styles.note}>
                    I've also been to several hackathons and built winning <Link className="text-link" to="/projects">projects</Link>.
                </p>
            </Course>
            <Course label="otherwise" title="sides" items={sides} />
            <p className={styles.footnote}>made with love and a little too much matcha</p>
        </div>
    </section>;
}
