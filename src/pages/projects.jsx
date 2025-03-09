import React from 'react'
import { useEffect } from 'react'
import ProjectCard from "../components/projects/projectCard"
import { Navbar } from "../components/home/navbar"
import { Footer } from "../components/home/footer"
import stock from "../assets/stock.png"
import involveu from "../assets/involveu.png"
import wordcross from "../assets/wordcross.png"
import website from "../assets/website.png"

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
    return <section data-scroll-container>
        <Navbar />
        <div className="flex flex-col max-w-full md:max-w-5xl mx-auto px-15">
            <h1 data-scroll-section className="text-sm font-thin my-5 md:text-xl">some cool stuff i did</h1>
            <div>
                {projects.map((project) => (
                    <section data-scroll-section>
                        <ProjectCard key={project.title} {...project} />
                    </section>
                ))}
            </div>
        </div>
        <section data-scroll-section>
            <Footer />
        </section>
    </section>;
}
