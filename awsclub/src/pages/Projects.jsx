// src/pages/Projects.jsx
import React from "react";

export default function Projects() {
  // Array to generate bubbles dynamically
  const bubbles = Array.from({ length: 15 });

  return (
    <div className="relative p-8 text-center min-h-screen flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
      {/* Floating Bubbles */}
      {bubbles.map((_, index) => {
        const size = Math.floor(Math.random() * 20) + 5; // 5px to 25px
        const top = Math.floor(Math.random() * 100); // 0% to 100%
        const left = Math.floor(Math.random() * 100);
        const duration = Math.random() * 10 + 5; // 5s to 15s
        const delay = Math.random() * 5; // 0s to 5s
        const colors = ["bg-yellow-400", "bg-blue-400", "bg-purple-500", "bg-pink-400", "bg-green-400"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <div
            key={index}
            className={`absolute ${color} rounded-full opacity-30 hover:scale-125 transition-transform`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              animation: `floatBubble ${duration}s ease-in-out ${delay}s infinite alternate`,
            }}
          ></div>
        );
      })}

      {/* Page Content */}
      <h1 className="text-4xl font-bold text-[#FF9900] z-10">Our Projects</h1>
      <p className="mt-4 text-gray-300 text-lg z-10">
        Our exciting AWS projects will be uploaded soon. Stay tuned!
      </p>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes floatBubble {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-50px) translateX(20px);
            opacity: 0.6;
          }
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
