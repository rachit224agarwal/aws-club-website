// src/components/Topbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for hamburger icons
import clubLogo from "../assets/club.png";

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#131A22] text-white fixed top-0 left-0 right-0 shadow-md z-50">
      <div className="w-full flex items-center justify-between px-6 py-3">
        
        {/* Logo + Club Name */}
        <div className="flex items-center gap-3">
          <img src={clubLogo} alt="Club Logo" className="h-10 w-10 object-contain" />
          <div className="leading-tight hidden sm:block">
            <span className="block text-lg font-bold">AWS Cloud Club</span>
            <span className="block text-xs text-gray-400">KIET Group of Institutions</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-300">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-[#FF9900]" : "hover:text-[#FF9900] transition-colors"}>Home</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "text-[#FF9900]" : "hover:text-[#FF9900] transition-colors"}>Projects</NavLink>
          <NavLink to="/events" className={({ isActive }) => isActive ? "text-[#FF9900]" : "hover:text-[#FF9900] transition-colors"}>Events</NavLink>
          <NavLink to="/members" className={({ isActive }) => isActive ? "text-[#FF9900]" : "hover:text-[#FF9900] transition-colors"}>Team</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-[#FF9900]" : "hover:text-[#FF9900] transition-colors"}>Contact</NavLink>
        </nav>

        {/* Join Button (desktop only) */}
        <div className="hidden md:block">
          <a
            href="https://chat.whatsapp.com/EwkRm6MJxB68Skowc0xsg3"
            rel="noopener noreferrer"
            target="_blank"
            className="bg-[#FF9900] text-black px-5 py-2 rounded-lg font-semibold hover:bg-[#e68a00] transition-colors"
          >
            JOIN
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#131A22] px-6 py-4 space-y-4 border-t border-gray-700">
          <NavLink to="/" className="block hover:text-[#FF9900] transition-colors" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/projects" className="block hover:text-[#FF9900] transition-colors" onClick={() => setIsOpen(false)}>Projects</NavLink>
          <NavLink to="/events" className="block hover:text-[#FF9900] transition-colors" onClick={() => setIsOpen(false)}>Events</NavLink>
          <NavLink to="/members" className="block hover:text-[#FF9900] transition-colors" onClick={() => setIsOpen(false)}>Team</NavLink>
          <NavLink to="/contact" className="block hover:text-[#FF9900] transition-colors" onClick={() => setIsOpen(false)}>Contact</NavLink>

          {/* Join Button inside mobile menu */}
          <a
            href="https://chat.whatsapp.com/EwkRm6MJxB68Skowc0xsg3"
            rel="noopener noreferrer"
            target="_blank"
            className="block bg-[#FF9900] text-black px-5 py-2 rounded-lg font-semibold hover:bg-[#e68a00] transition-colors text-center"
            onClick={() => setIsOpen(false)}
          >
            JOIN
          </a>
        </div>
      )}
    </header>
  );
}
