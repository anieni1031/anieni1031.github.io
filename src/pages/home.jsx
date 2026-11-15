import React from 'react';
import { Navbar } from "../components/home/navbar"
import { About } from "../components/home/about"
import { Experience } from "../components/home/experience"
import { Footer } from "../components/home/footer"

export const Home = () => {
    return <>
        <Navbar />
        <main>
            <About />
            <Experience />
        </main>
        <Footer />
    </>;
}
