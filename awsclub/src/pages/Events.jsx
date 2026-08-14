import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { events } from "../data/events";
import Timeline from "../components/ui/Timeline";
import EventCard from "../components/events/EventCard";
import SectionHeading from "../components/ui/SectionHeading";
import EventGalleryModal from "../components/gallery/EventGalleryModal";
import SpotlightBackground from "../components/layout/SpotlightBackground";
import { fadeUp, ease } from "../utils/animations";

const currentEvents = events.filter((e) => e.type === "current");
const pastEvents = events.filter((e) => e.type === "past");

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEventById = useCallback((id) => {
    const allEvents = [...currentEvents, ...pastEvents];
    setSelectedEvent(allEvents.find((e) => e.id === id));
  }, []);
  const handleCloseModal = useCallback(() => setSelectedEvent(null), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  return (
    <main className="page-wrapper relative overflow-hidden bg-transparent">
      <SpotlightBackground />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* ── Page Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase border border-[#F7941D]/30 text-[#F7941D]/90 bg-[#F7941D]/5"
          >
            Our Timeline
          </motion.span>
          <SectionHeading centered>Club Journey</SectionHeading>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-text-muted text-lg max-w-2xl mx-auto font-body mt-4"
          >
            Explore our roadmap of workshops, challenges, and cloud sessions.
          </motion.p>
        </motion.div>

        {/* ── Current Journey Timeline ────────────────────────────── */}
        <div className="mb-12">
          {currentEvents.length > 0 ? (
            <Timeline events={currentEvents} onSelectEvent={handleSelectEventById} />
          ) : (
            <p className="text-center text-text-subtle font-body">
              No upcoming events right now — check back soon.
            </p>
          )}
        </div>

        <div className="gradient-separator max-w-sm mx-auto mb-12" />

        {/* ── Past Memories ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <SectionHeading centered>Past Memories</SectionHeading>
          <p className="text-text-muted text-sm mt-2 font-body">
            A look back at the moments that shaped our community.
          </p>
        </motion.div>

        {pastEvents.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pastEvents.map((event, idx) => (
              <motion.div key={event.id} variants={fadeUp} className="h-full">
                <EventCard {...event} id={event.id} priority={idx === 0} onSelect={handleSelectEventById} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-text-subtle font-body">No past events to show yet.</p>
        )}
      </div>

      {/* ── Gallery Modal ───────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {selectedEvent && (
          <EventGalleryModal key={selectedEvent.id} event={selectedEvent} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </main>
  );
}