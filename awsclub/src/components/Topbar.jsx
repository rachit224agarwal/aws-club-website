// src/components/Topbar.jsx
import React from "react";
import clubLogo from "../assets/club.png";

export default function Topbar() {
  return (
    <header className="bg-[#131A22] text-white fixed top-0 left-0 right-0 shadow-md z-50">
      <div className="w-full flex items-center justify-between px-8 py-3">
        
        {/* Logo + Club Name */}
        <div className="flex items-center gap-3">
          <img src={clubLogo} alt="Club Logo" className="h-10 w-10 object-contain" />
          <div className="leading-tight">
            <span className="block text-lg font-bold">AWS Cloud Club</span>
            <span className="block text-xs text-gray-400">KIET Group of Institutions</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8 font-medium text-gray-300">
          <a href="/" className="hover:text-[#FF9900] transition-colors">Home</a>
          <a href="/about" className="hover:text-[#FF9900] transition-colors">About</a>
          <a href="/projects" className="hover:text-[#FF9900] transition-colors">Projects</a>
          <a href="/events" className="hover:text-[#FF9900] transition-colors">Events</a>
          <a href="/resources" className="hover:text-[#FF9900] transition-colors">Resources</a>
          <a href="/team" className="hover:text-[#FF9900] transition-colors">Team</a>
          <a href="/contact" className="hover:text-[#FF9900] transition-colors">Contact</a>
        </nav>

        {/* Join Button */}
        <div>
          <a
            href="/join"
            className="bg-[#FF9900] text-black px-5 py-2 rounded-lg font-semibold hover:bg-[#e68a00] transition-colors"
          >
            JOIN
          </a>
        </div>
      </div>
    </header>
  );
}

