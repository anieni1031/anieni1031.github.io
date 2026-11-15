import React from 'react'
import ProjectCard from "../components/projects/projectCard"
import { Navbar } from "../components/home/navbar"
import { Footer } from "../components/home/footer"
import stock from "../assets/stock.png"
import involveu from "../assets/involveu.png"
import wordcross from "../assets/wordcross.png"
import website from "../assets/website.png"
import styles from "../components/projects/displayCase.module.css"

const projects = [
    {
        link: "https://github.com/akramj13/Stock-Robo-Advisor",
        title: "stock portfolio optimizer",
        image: stock,
        tags: ["python", "numpy", "pandas", "matplotlib", "scipy", "jupyter notebook"],
        description: "Devised an algorithm to generate a portfolio of stocks with maximal \
        returns with sharpe ratio optimization, standard deviation, and PCR ratio strategy, \
        beating the market by 20.5% over one year.",
    },
    {
        link: "https://github.com/pingu15/InvolveU",
        title: "involveU",
        image: involveu,
        tags: ["react native", "expo", "html", "css", "figma"],
        description: "Developed a mobile app with React Native and Django to boost student \
        engagement in extracurriculars through a points-based competition system. Awarded 2nd \
        place nationally at the Canadian National Leadership Conference hosted by FBLA!",
    },
    {
        link: "https://github.com/cheollie/wordcross",
        title: "wordcross",
        image: wordcross,
        tags: ["java"],
        description: "A minimalistic crossword game with various levels + leaderboard and timer features.",
    },
    {
        link: "https://github.com/anieni1031/anieni1031.github.io",
        title: "personal website",
        image: website,
        tags: ["react", "vite", "tailwind css"],
        description: "The website you are on right now! Built from scratch for the purpose of \
        leaving my traces on the web where people can get to know more about me and my projects.",
    },
]

export const Projects = () => {
    return <>
        <Navbar />
        <main className="page pt-12 pb-24">
            <p className="eyebrow">projects</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">the display case</h1>
            <p className="mt-1 mb-10 text-ink-soft">some cool stuff i did</p>
            {/* a glass case: every project sits on a cake stand on a shelf, with its label card underneath */}
            <div className={styles.case}>
                {projects.map((project) => (
                    <ProjectCard key={project.title} {...project} />
                ))}
            </div>
        </main>
        <Footer />
    </>;
}
