import React from "react";
import styles from "./displayCase.module.css"

// frosting running down the top of the cake
const Frosting = () => (
    <svg className={styles.frosting} viewBox="0 0 176 42" aria-hidden="true">
        <path d="M1 18V12Q1 1 12 1H164Q175 1 175 12V18
            a7 7 0 0 1-14 0 a6 6 0 0 0-12 0
            v10 a7 7 0 0 1-14 0 v-10 a6 6 0 0 0-12 0
            v3 a8 8 0 0 1-16 0 v-3 a6 6 0 0 0-12 0
            v14 a7 7 0 0 1-14 0 v-14 a6 6 0 0 0-12 0
            v5 a8 8 0 0 1-16 0 v-5 a6 6 0 0 0-12 0
            v9 a7 7 0 0 1-14 0 v-9 a6 6 0 0 0-12 0
            a7 7 0 0 1-14 0Z" />
    </svg>
)

const ProjectCard = ({ link, title, image, tags, description }) => {
    return (
        <article className={styles.item}>
            <a className={styles.shelf} href={link} target="_blank" rel="noopener noreferrer" aria-label={`${title} on github`}>
                <span className={styles.stand}>
                    {/* the project picture is printed on the side of the cake */}
                    <span className={styles.cake}>
                        <img src={image} alt="" />
                        <Frosting />
                    </span>
                    <span className={styles.plate} />
                    <span className={styles.stem} />
                    <span className={styles.base} />
                </span>
            </a>
            <div className={styles.label}>
                <div className={styles.card}>
                    <h2 className={styles.cardName}>
                        <a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
                    </h2>
                    <p className={styles.cardText}>{description}</p>
                    <p className={styles.ingredients}>
                        <span className={styles.madeWith}>ingredients</span>
                        {tags.join(" · ")}
                    </p>
                </div>
                <span className={styles.cardHolder} />
            </div>
        </article>
    )
};

export default ProjectCard;
