import React from 'react';
import { useEffect } from 'react';
import { Navbar } from "../components/home/navbar"
import { About } from "../components/home/about"
import { Experience } from "../components/home/experience"
import { Footer } from "../components/home/footer"
import { useLocation } from "react-router-dom";
import styles from "../App.module.css";

export const Home = () => {
    return <div data-scroll-container>
        <Navbar />
        <section data-scroll-section>
            <About />
        </section>
        <section data-scroll-section>
            <Experience />
        </section>
        <section data-scroll-section>
            <Footer />
        </section>
    </div>;
}
