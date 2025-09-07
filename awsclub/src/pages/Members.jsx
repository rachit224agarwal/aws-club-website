// src/pages/Members.jsx
import React from "react";
import { motion } from "framer-motion";
import MemberCard from "../components/MemberCard";

// Import images
import raunak from "../assets/people/raunak.jpg";
import p from "../assets/people/p.jpg";
import kunal from "../assets/people/kunal.jpg";
import rachit from "../assets/people/rachit.jpg";
import prapti from "../assets/people/prapti.jpg";
import rishi from "../assets/people/rishi.jpg";
import ghanatva from "../assets/people/ghanatva.jpg";

// Core Team Data
const coreTeam = [
  { name: "Ghanatva Thakaran", role: "Founder & Mentor", image: ghanatva, linkedin: "https://www.linkedin.com/in/ghanatava/", github: "#" },
  { name: "Prapti Sharma", role: "Founder & Mentor", image: prapti, linkedin: "https://www.linkedin.com/in/prapti-sharma-796080257/", github: "https://github.com/praptisharma28" },
  { name: "Kunal Thalautiya", role: "President", image: kunal, linkedin: "https://www.linkedin.com/in/kunal-thalautiya-238a17242/", github: "https://github.com/Kunalkthalautiya" },
  { name: "Pravira Shukla", role: "Vice President", image: p, linkedin: "https://www.linkedin.com/in/pravirashukla/", github: "#" },
  { name: "Rishi Raman Sinha", role: "Technical Lead", image: rishi, linkedin: "https://www.linkedin.com/in/rishi-raman-sinha-1714742a2/", github: "https://github.com/rishiraman27" },
  { name: "Raunak Kushwaha", role: "Operation Lead", image: raunak, linkedin: "https://www.linkedin.com/in/raunak-kushwaha-1b22372a8/", github: "https://github.com/Raunakushwa" },
  { name: "Rachit Agarwal", role: "Community Manager", image: rachit, linkedin: "https://www.linkedin.com/in/rachit-agarwal-a52924282/", github: "https://github.com/rachit224agarwal" },
];

// Team Members Data
const teamMembers = [
  { name: "Subrat Dwivedi ", role: "Member", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Amrit Seth", role: "Member", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Ayush Rao Chaudhary ", role: "Member", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Sugandh Garg ", role: "Member", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Shreya Baranwal", role: "Member", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Harshit Singh Patel", role: "Member", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Ashutosh shukla", role: "Member", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
];

export default function Members() {
  return (
    <main className="relative w-full min-h-screen bg-gray-900 text-white overflow-hidden pt-10">
      {/* Neon Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[700px] h-[700px] bg-yellow-500 opacity-30 rounded-full blur-[250px] absolute top-[-200px] left-[-200px]"></div>
        <div className="w-[600px] h-[600px] bg-blue-500 opacity-30 rounded-full blur-[250px] absolute bottom-[-200px] right-[-200px]"></div>
      </div>

      <section className="relative py-16 max-w-7xl mx-auto px-6">
        {/* Core Team Section */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#FF9900] text-center mb-16">
          Core Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 mb-20">
          {coreTeam.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <MemberCard {...member} />
            </motion.div>
          ))}
        </div>

        {/* Team Members Section */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#FF9900] text-center mb-16">
         Our Team Members
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <MemberCard {...member} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
