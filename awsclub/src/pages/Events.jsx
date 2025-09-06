import React from "react";
import { motion } from "framer-motion";
import event1 from "../assets/events/event1.jpg";
import event2 from "../assets/events/event2.jpg";
import event3 from "../assets/events/event3.jpg";
import event4 from "../assets/events/event4.jpg";
import event5 from "../assets/events/event5.jpg";

const events = [event1, event2, event3, event4, event5];

export default function Events() {
  return (
    <main className="relative w-full min-h-screen bg-gray-900 text-white overflow-hidden pt-24">
      {/* Neon Background Effects */}
      <div className="absolute inset-0">
        <div className="w-[700px] h-[700px] bg-yellow-500 opacity-20 rounded-full blur-[200px] absolute top-[-200px] left-[-200px] animate-pulse"></div>
        <div className="w-[600px] h-[600px] bg-blue-500 opacity-20 rounded-full blur-[200px] absolute bottom-[-200px] right-[-200px] animate-pulse"></div>
      </div>

      <section className="relative py-16 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#FF9900] text-center mb-12">
          Our Events & Bootcamps
        </h2>

        {/* Event Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.08 }}
              className="overflow-hidden rounded-2xl shadow-lg border border-gray-700"
            >
              <img
                src={event}
                alt={`Event ${index + 1}`}
                className="w-full h-64 object-cover rounded-2xl transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
