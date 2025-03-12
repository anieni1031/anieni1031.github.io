import React from 'react';
import styles from "../App.module.css";
import pfp from "../assets/pfp.jpg"
import snow1 from "../assets/snowball1.jpg"
import snow2 from "../assets/snowball2.jpg"
import tac1 from "../assets/tac1.jpg"
import tac2 from "../assets/tac2.jpg"
import kitkat1 from "../assets/kitkat1.jpg"
import { Link } from "react-router-dom"

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

const ascii_cat =
    ` 
                               "/\\_/\\"            ___ 
    ｡･:*:･ﾟ★,｡･:*:･ﾟ☆           = o_o = _______    \\ \\         ｡･:*:･ﾟ★,｡･:*:･ﾟ☆
                               __ ^         __(\\.__) ) 
                           (@)<_____ >__(_____)____ / `;

export const Secret = () => {
    return <div data-scroll-container>
        <Link className="mx-10 my-8 font-light inline-block transition-transform duration-400 origin-center hover:scale-101" to="/">
            return
        </Link>
        <pre className="flex justify-center leading-none mb-5">{ascii_cat}</pre>
        <div className="flex justify-center mx-10 font-light">
            congrats! you found a secret page :D here are some cute pics of my pets</div>
        <div className="flex flex-col justify-center items-center max-w-full md:max-w-full">
            {pics.map((pic) => (
                <img className="max-w-1/3 m-13 transition-transform duration-500 hover:scale-105" src={pic.source} alt={pic.name} />
            ))}
        </div>
    </div>;
}