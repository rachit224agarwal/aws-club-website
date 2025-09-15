import React from "react";
import { motion } from "framer-motion";
import event1 from "../assets/events/event1.jpg";
import event2 from "../assets/events/event2.jpg";
import event3 from "../assets/events/event3.jpg";
import event4 from "../assets/events/event4.jpg";
import event5 from "../assets/events/event5.jpg";
import event6 from "../assets/events/event6.jpg";
import event7 from "../assets/events/event7.jpg";
import event8 from "../assets/events/event8.jpg";
import event9 from "../assets/events/event9.jpg";
import novaPoster from "../assets/events/nova2.jpg"; // New Poster

const previousEvents = [event3, event4, event5, event6, event7, event8, event9, event2, event1];

export default function Events() {
  return (
    <main className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden pt-16 pb-20">
      {/* Neon Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[700px] h-[700px] bg-yellow-500 opacity-20 rounded-full blur-[200px] absolute top-[-250px] left-[-250px] animate-pulse"></div>
        <div className="w-[600px] h-[600px] bg-blue-500 opacity-20 rounded-full blur-[200px] absolute bottom-[-250px] right-[-250px] animate-pulse"></div>
      </div>

      <section className="relative max-w-7xl mx-auto px-6">
        {/* New Top Poster Section with Description */}
        <h2 className="text-5xl font-extrabold text-[#FF9900] text-center mb-14 tracking-wide drop-shadow-lg">
          Upcoming Event
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-16 mb-20">
          {/* Poster on the left */}
          <motion.img
            src={novaPoster}
            alt="CloudNova Poster"
            initial={{ opacity: 0.6, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full md:w-1/2 max-w-lg rounded-2xl shadow-2xl border border-gray-700"
          />

          {/* Event details on the right */}
          <motion.div
            initial={{ opacity: 0.6, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full md:w-1/2 space-y-4"
          >
            <h3 className="text-3xl font-bold text-[#FF9900]">Level Up with CloudNova: 5-Day Tech Bootcamp</h3>
            <p className="text-gray-300">
              ✨ Come attend <strong>CloudNova Bootcamp</strong> to gain practical knowledge and hands-on experience
              with essential technologies. Don’t miss this chance to level up your skills and stand out in the tech world.
            </p>

            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>📅 <strong>Dates:</strong> 22nd – 26th September</li>
              <li>📍 <strong>Venue:</strong> E-Block (Room no- 306)</li>
              <li>⏰ <strong>Time:</strong> 5:00 – 7:00 pm</li>
            </ul>

            <h4 className="text-xl font-semibold text-[#FF9900] mt-4">What you’ll learn:</h4>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>🐧 Intro to Linux – Basics of Linux & essential commands</li>
              <li>🌐 Networking – Build a solid networking foundation</li>
              <li>💻 Git & GitHub – Version control & collaboration</li>
              <li>☁ AWS Cloud Fundamentals – Cloud computing essentials</li>
            </ul>

            <p className="text-gray-300 mt-4">
              📞 <strong>Contact:</strong> Raunak (9169347998), Rachit (9557915111)
            </p>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc3njajyuZgCo0xShsVC8j4x3_vPFIGE8zT_taPRHdAnY22xQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 mt-4 bg-[#FF9900] text-black font-semibold rounded-xl shadow-lg hover:bg-yellow-400 transition"
            >
              Register Now
            </a>
          </motion.div>
        </div>

        {/* Previous Events Section */}
        <h2 className="text-4xl font-extrabold text-[#FF9900] text-center mb-16 tracking-wide drop-shadow-lg">
          Previous Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
          {previousEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="overflow-hidden rounded-3xl border border-transparent shadow-lg bg-gradient-to-tr from-gray-800 to-gray-900 cursor-pointer"
            >
              <img
                src={event}
                alt={`Event ${index + 1}`}
                loading="lazy"
                className="w-full h-72 object-cover rounded-3xl transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
