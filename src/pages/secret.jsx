import React from 'react';
import snow1 from "../assets/snowball1.jpg"
import snow2 from "../assets/snowball2.jpg"
import tac1 from "../assets/tac1.jpg"
import tac2 from "../assets/tac2.jpg"
import kitkat1 from "../assets/kitkat1.jpg"
import { Link } from "react-router-dom"
import styles from "./secret.module.css"

const pics = [
    {
        source: tac1,
        name: "tac cutie",
    },
    {
        source: snow1,
        name: "snowball grin",
    },
    {
        source: kitkat1,
        name: "kitkat majestic",
    },
    {
        source: tac2,
        name: "tac pretty",
    },
    {
        source: snow2,
        name: "snowball silly",
    },
]

export const Secret = () => {
    return <main className={`page ${styles.secret}`}>
        <Link className={styles.back} to="/">
            ← return
        </Link>
        <header className={styles.hello}>
            <p className={styles.cat} aria-hidden="true">ฅ^•ﻌ•^ฅ</p>
            <h1 className={styles.title}>
                <span className={styles.sparkle} aria-hidden="true">✦</span>
                congrats!
                <span className={styles.sparkle} aria-hidden="true">✦</span>
            </h1>
            <p className={styles.found}>you found a secret page :D</p>
            <p className={styles.note}>here are some cute pics of my pets</p>
        </header>
        {/* each pet gets a polaroid, taped up a little crooked */}
        <ul className={styles.wall}>
            {pics.map((pic) => (
                <li key={pic.name} className={styles.polaroid}>
                    <span className={styles.tape} aria-hidden="true" />
                    <img src={pic.source} alt={pic.name} loading="lazy" />
                    <p className={styles.caption}>{pic.name}</p>
                </li>
            ))}
        </ul>
    </main>;
}
