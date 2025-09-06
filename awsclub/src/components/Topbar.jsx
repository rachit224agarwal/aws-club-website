// src/components/Topbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
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
          <NavLink to="/" className={({ isActive }) => isActive ? "text-[#FF9900]" : "hover:text-[#FF9900] transition-colors"}>Home</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "text-[#FF9900]" : "hover:text-[#FF9900] transition-colors"}>Projects</NavLink>
          <NavLink to="/events" className={({ isActive }) => isActive ? "text-[#FF9900]" : "hover:text-[#FF9900] transition-colors"}>Events</NavLink>
          <NavLink to="/members" className={({ isActive }) => isActive ? "text-[#FF9900]" : "hover:text-[#FF9900] transition-colors"}>Team</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-[#FF9900]" : "hover:text-[#FF9900] transition-colors"}>Contact</NavLink>
        </nav>

        {/* Join Button */}
        <div>
          <a
            href="https://chat.whatsapp.com/BFQRlc3OKwl50apnCc94v3"
            rel="noopener noreferrer"
            target="_blank"
            className="bg-[#FF9900] text-black px-5 py-2 rounded-lg font-semibold hover:bg-[#e68a00] transition-colors"
          >
            JOIN
          </a>
        </div>
      </div>
    </header>
  );
}
