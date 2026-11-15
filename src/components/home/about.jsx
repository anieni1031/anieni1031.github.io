import React, { useEffect, useRef, useState } from 'react'
import pfp from "../../assets/pfp.jpg"
import styles from "./about.module.css"
import { pourLatte } from "./latte"

// a round cookie with a slightly uneven edge
const cookie = "polygon(" + Array.from({ length: 120 }, (_, i) => {
    const angle = (i / 120) * 2 * Math.PI;
    const radius = 47 + 0.6 * Math.sin(5 * angle + 1) + 0.45 * Math.sin(9 * angle);
    return `${(50 + radius * Math.cos(angle)).toFixed(2)}% ${(50 + radius * Math.sin(angle)).toFixed(2)}%`;
}).join(", ") + ")";

// each letter rises on its own, like a tray of buns
const Rising = ({ word, start }) => (
    <span className={styles.word}>
        {word.split("").map((letter, i) => (
            <span key={i} data-letter className={styles.letter} style={{ animationDelay: `${(start + i) * 55}ms` }}>{letter}</span>
        ))}
    </span>
)

export const About = () => {
    const name = useRef(null);
    const glass = useRef(null);
    const [poured, setPoured] = useState(false);

    // once the display font is in, fill the name with the latte
    useEffect(() => {
        let stop = null;
        let cancelled = false;
        document.fonts.load('1em "Bagel Fat One"', "annie wong").then(() => {
            if (cancelled) return;
            stop = pourLatte(name.current, glass.current);
            setPoured(true);
        }).catch(() => { });
        return () => {
            cancelled = true;
            if (stop) stop();
        };
    }, []);

    return <section className={`page ${styles.container}`}>
        <div className={styles.content}>
            <p className="eyebrow">Computing &amp; Financial Management @ University of Waterloo</p>
            <h1 ref={name} className={`${styles.name} ${poured ? styles.poured : ""}`} aria-label="Annie Wong">
                <canvas ref={glass} className={styles.glass} aria-hidden="true" />
                <span aria-hidden="true">
                    <Rising word="annie" start={0} />
                    <Rising word="wong" start={5} />
                </span>
            </h1>
            <p className={styles.intro}>
                aspiring product person with a technical background<br />
                currently curating experiences as a product intern @ Sezzle
            </p>
            <p className={styles.cta}>
                looking for summer '27 product internships. <a className="text-link" href="mailto:anniewong20061031@gmail.com">email me</a>
            </p>
        </div>
        <div className={styles.photo}>
            <img src={pfp} alt="Annie, smiling, holding a book" className={styles.image} style={{ clipPath: cookie }} />
            <span className={styles.crumb} style={{ top: "3%", right: "13%", width: "3.5%" }} />
            <span className={styles.crumb} style={{ top: "10%", right: "4%", width: "2.2%" }} />
            <span className={styles.crumb} style={{ top: "19%", right: "1%", width: "3%" }} />
        </div>
    </section>;
}
