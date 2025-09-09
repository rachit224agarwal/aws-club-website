// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Events from "./pages/Events";
import Members from "./pages/Members";
import Contact from "./pages/Contact";

function App() {
  return (
      <div className="bg-[#232F3E] text-white min-h-screen flex flex-col">
        {/* Navbar */}
        <Topbar />

        {/* Main content */}
        <main className="flex-grow pt-16"> 
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/projects" Component={Projects} />
            <Route path="/events" Component={Events} />
            <Route path="/members" Component={Members} />
            <Route path="/contact" Component={Contact} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
        <Analytics />
      </div>
  );
}

export default App;
