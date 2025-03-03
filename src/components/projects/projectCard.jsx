import React from "react";
import git from "../../assets/gitIcon.png"

const ProjectCard = ({ link, title, image, tags, description }) => {
    return (
        <div className="flex md:flex-row flex-col pb-10">
            <img src={image} alt={title} className="w-full md:w-1/4" />
            <div className="mt-5 md:mt-0 md:pl-5">
                <a className="flex flex-row" href={link} target="_blank" rel="noopener noreferrer">
                    <img className="w-4 h-4 mt-1.5 mr-2" src={git} alt="git icon"/>
                    <h3 className="font-light text-m md:text-xl mb-3">{title}</h3>
                </a>
                <div className="flex flex-wrap font-light max-w-full text-sm md:text-base mb-2">
                    {tags.map((tag) => (
                        <span key={tag} className="mr-2 py-1 mb-3 px-3 bg-secondary rounded-3xl">
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="font-thin text-sm md:text-base">{description}</p>
            </div>
        </div>
    )
};

export default ProjectCard;