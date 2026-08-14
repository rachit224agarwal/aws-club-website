import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  foundingLeadership,
  executiveTeam,
  associateTeam,
} from "../data/members";
import MemberCard from "../components/team/MemberCard";
import CategoryModal from "../components/team/CategoryModal";
import CategoryBlockCard from "../components/team/CategoryBlockCard";
import SpotlightBackground from "../components/layout/SpotlightBackground";
import { fadeUp, ease } from "../utils/animations";
import { groupMembersByCategory } from "../utils/teamHelpers";

const TeamSectionHeader = ({ title, description }) => (
  <div className="text-center mb-10 flex flex-col items-center select-none mt-0">
    <h2 className="text-white font-heading text-3xl md:text-4xl font-extrabold tracking-tight mb-3 leading-tight">
      {title}
    </h2>
    <p className="text-white/60 font-body text-base max-w-3xl leading-relaxed">
      {description}
    </p>
  </div>
);

export default function Members() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = fadeUp;

  const executiveGroups = groupMembersByCategory(executiveTeam, true);
  const associateGroups = groupMembersByCategory(associateTeam, false);

  return (
    <main className="page-wrapper relative overflow-hidden bg-transparent min-h-screen pt-0 pb-16">
      <SpotlightBackground />

      <div className="relative z-10 max-w-[1340px] mx-auto pt-0 px-4 sm:px-6">


        {/* ───────────────── Founding Leadership ───────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <TeamSectionHeader
            title="Founding Leadership"
            description="The visionaries who established the AWS Cloud Club and laid its foundation."
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-16 max-w-[1360px] mx-auto justify-items-center"
        >
          {foundingLeadership.map((member) => (
            <motion.div key={member.id} variants={itemVariants} className="h-full w-full max-w-[325px] flex flex-col justify-stretch">
              <MemberCard {...member} />
            </motion.div>
          ))}
        </motion.div>

        <div className="gradient-separator max-w-sm mx-auto mb-16 opacity-30" />

        {/* ───────────────── Executive Team ───────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-8"
        >
          <TeamSectionHeader
            title="Executive Team"
            description="Driving the club's strategy, innovation, and community initiatives."
          />
        </motion.div>

        {/* Specialized departments as interactive clickable blocks */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-stretch max-w-[1340px] mx-auto mb-16"
        >
          {executiveGroups.map((group) => (
            <CategoryBlockCard
              key={group.title}
              group={group}
              isExecutive={true}
              onSelect={handleSelectCategory}
            />
          ))}
        </motion.div>

        <div className="gradient-separator max-w-sm mx-auto mb-16 opacity-30" />

        {/* ───────────────── Associate Team ───────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-8"
        >
          <TeamSectionHeader
            title="Associate Team"
            description="Supporting operations while growing into the next generation of leaders."
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-stretch max-w-[1340px] mx-auto"
        >
          {associateGroups.map((group) => (
            <CategoryBlockCard
              key={group.title}
              group={group}
              isExecutive={false}
              onSelect={handleSelectCategory}
            />
          ))}
        </motion.div>

      </div>

      {/* Team Category Modal */}
      <AnimatePresence mode="wait">
        {selectedCategory && (
          <CategoryModal
            key={selectedCategory.title}
            category={selectedCategory}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </main>
  );
}