import React from "react";
import MemberCard from "../components/MemberCard";

// Core Team Data
const coreTeam = [
  { name: "John Doe", role: "President", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Jane Smith", role: "Vice President", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Alex Johnson", role: "Technical Lead", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Emily Davis", role: "Event Coordinator", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "David Lee", role: "Design Lead", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Sophia Brown", role: "PR Head", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Daniel Wilson", role: "Treasurer", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
];

// Team Members Data
const teamMembers = [
  { name: "Chris Taylor", role: "Member", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Olivia Harris", role: "Member", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Ethan Clark", role: "Member", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Sophia Green", role: "Member", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Benjamin King", role: "Member", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Lily Adams", role: "Member", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
  { name: "Matthew Scott", role: "Member", image: "https://via.placeholder.com/200", linkedin: "#", github: "#" },
];

export default function Members() {
  return (
    <main className="relative w-full min-h-screen bg-gray-900 text-white overflow-hidden pt-24">
      {/* Neon Background UI */}
      <div className="absolute inset-0 -z-10">
        <div className="w-[700px] h-[700px] bg-yellow-500 opacity-20 rounded-full blur-[200px] absolute top-[-200px] left-[-200px] animate-pulse"></div>
        <div className="w-[600px] h-[600px] bg-blue-500 opacity-20 rounded-full blur-[200px] absolute bottom-[-200px] right-[-200px] animate-pulse"></div>
      </div>

      <section className="relative py-16 max-w-7xl mx-auto px-6">
        {/* Core Team Section */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#FF9900] text-center mb-12">
          Core Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-16">
          {coreTeam.map((member, index) => (
            <MemberCard key={index} {...member} />
          ))}
        </div>

        {/* Team Members Section */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#FF9900] text-center mb-12">
          Team Members
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {teamMembers.map((member, index) => (
            <MemberCard key={index} {...member} />
          ))}
        </div>
      </section>
    </main>
  );
}
