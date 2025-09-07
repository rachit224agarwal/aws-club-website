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
import event10 from "../assets/events/event10.jpg";
import event11 from "../assets/events/event11.jpg";

const events = [event11, event10, event3, event4, event5, event6, event7, event8, event9, event2, event1];

export default function Events() {
  return (
    <main className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden pt-16 pb-20">
      {/* Neon Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[700px] h-[700px] bg-yellow-500 opacity-20 rounded-full blur-[200px] absolute top-[-250px] left-[-250px] animate-pulse"></div>
        <div className="w-[600px] h-[600px] bg-blue-500 opacity-20 rounded-full blur-[200px] absolute bottom-[-250px] right-[-250px] animate-pulse"></div>
      </div>

      <section className="relative max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-[#FF9900] text-center mb-16 tracking-wide drop-shadow-lg">
          Our Events & Bootcamps
        </h2>

        {/* Event Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
          {events.map((event, index) => (
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
