// src/components/MemberCard.jsx
import React from "react";
import { Linkedin, Github } from "lucide-react";

export default function MemberCard({ name, role, image, linkedin, github, imageSize = "150px" }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-6 text-center hover:scale-105 hover:shadow-[0_0_25px_#FF9900] transition-transform duration-300">
      <img
        src={image}
        alt={name}
        className="mx-auto rounded-full mb-4 border-4 border-[#FF9900] object-cover"
        style={{ width: imageSize, height: imageSize }}
      />
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-gray-300 mb-4">{role}</p>
      <div className="flex justify-center gap-4 text-xl">
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition-colors"
          >
            <Linkedin size={22} />
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <Github size={22} />
          </a>
        )}
      </div>
    </div>
  );
}
