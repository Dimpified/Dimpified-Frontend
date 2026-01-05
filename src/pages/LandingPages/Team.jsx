import React, { useEffect, useState } from "react";

import NavbarLanding from "./NavbarLanding";
import { FooterWithLinks } from "./FooterWithLinks";
import Azeez from "./images/azeez.jpeg";
import Ajoke from "./images/ajoke.jpg";
import Abideen from "./images/abideen.jpeg";
import George from "./images/george.jpg";
import Ceo from "./images/debo.jpg";
import Samuel from "./images/samuel.jpg";
import TeamImg from "./images/team.jpeg";
const teams = [
  {
    name: "Adebola (Debo) Omololu",
    role: "Group CEO",

    img: Ceo,
  },
  {
    name: "Samuel Makinde",
    role: "Tech Lead, Engineering",

    img: Samuel,
  },
  {
    name: "Abdul-Azeez Adeleye",
    role: "Tech Lead, Development & Design",

    img: Azeez,
  },
  {
    name: "George Adetemidayo",
    role: "Team Lead, Marketing & Sales",

    img: George,
  },
  {
    name: "Ajoke Diyaolu",
    role: "Human Resources Manager",

    img: Ajoke,
  },
  {
    name: "Akinwunmi Abideen",
    role: "Finance Manager",

    img: Abideen,
  },
];
const Team = () => {
  return (
    <>
      {" "}
      <NavbarLanding />
      <section className="w-full bg-white py-32 px-4 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Left text */}
          <div className="flex-1">
            <p className="text-sec10 text-lg font-medium mb-3">
              Meet our exceptional team
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-snug">
              Say Hello to the <br />
              <span className="relative inline-block">
                <span className="font-bold bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201] text-transparent bg-clip-text">
                  Dimpified
                </span>{" "}
                <span className="absolute left-0 bottom-1 w-full h-1 -z-10"></span>
              </span>{" "}
              Team
            </h2>
          </div>

          {/* Right description */}
          <div className="flex-1 border-l-2 border-primary3 pl-6">
            <p className="text-gray-500 text-lg leading-relaxed">
              At Dimpified, collaboration is our lifeblood. It drives what we do
              across our teams and ensures we deliver high-quality products to
              our customers.
            </p>
          </div>
        </div>
      </section>
      <section className="relative w-full md:h-[80vh] h-[30vh] overflow-hidden">
        {/* Background image */}
        <img
          src={TeamImg} // Update with your actual image path
          alt="team group image"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20" />

        {/* Content positioned at bottom right */}
        <div className="absolute bottom-0 right-0 z-10 w-full h-full px-4 flex items-end justify-end">
          <h1 className="text-white text-5xl md:text-[180px] font-bold tracking-wide leading-none">
            <span className="text-transparent stroke-text">our team</span>
          </h1>
        </div>
      </section>
      <section className="bg-white py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Leadership{" "}
          <span className="text-black font-bold underline decoration-sec10">
            Team
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teams.map((team, idx) => (
            <div key={idx} className="text-center relative">
              {/* Image */}
              <img
                src={team.img}
                alt={team.name}
                className=" mx-auto object-cover w-80 mb-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {team.name}
                </h3>

                {/* Description */}
                <p className="text-md text-gray-600">
                  <span className="">{team.role}</span>
                </p>
              </div>{" "}
            </div>
          ))}
        </div>
      </section>
      <FooterWithLinks />
    </>
  );
};

export default Team;
