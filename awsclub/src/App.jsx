// src/App.jsx
import React, { useState } from "react";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";


function App() {

  return (
    <div className="bg-[#232F3E] text-white flex justify-center ">
      <Topbar />
      <Home/>
    </div>
  );
}

export default App;
