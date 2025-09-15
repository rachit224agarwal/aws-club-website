// src/components/EventPopup.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EventPopup() {
  const [show, setShow] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const eventDate = new Date("2025-09-22T00:00:00"); // Event start date

    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft("The event has started! 🚀");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!show) return null;

  const handleRegister = () => {
    setShow(false); // hide popup
    window.location.href = "/events"; // redirect
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-6 w-80 border border-gray-200 transition-transform transform animate-[fadeInUp_0.4s_ease-out] relative">
        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-[#FF9900] mb-2">✨ Upcoming Event</h2>
        <p className="text-sm mb-3">
          <b>CloudNova Bootcamp</b> <br />
          Gain practical knowledge and hands-on experience with essential
          technologies. Don’t miss this chance to level up your skills and
          stand out in the tech world 🚀
        </p>

        {/* Countdown Timer */}
        <div className="text-center text-sm font-semibold text-red-600 mb-3">
          ⏳ Starts in: {timeLeft}
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-[#FF9900] hover:bg-[#e68900] text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Register Now
        </button>
      </div>

      {/* Custom fade-in-up animation */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
