// src/App.jsx
import React from "react";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-[#232F3E] text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Topbar />

      {/* Main content - expands to fill space */}
      <main className="flex-grow">
        <Home />
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}

export default App;
