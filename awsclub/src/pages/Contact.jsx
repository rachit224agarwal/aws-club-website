import React from "react";
import { motion } from "framer-motion";
import { contact } from "../data/contact";
import SectionHeading from "../components/ui/SectionHeading";
import SpotlightBackground from "../components/layout/SpotlightBackground";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { antigravitySpring, ease } from "../utils/animations";
import SocialLinkCard from "../components/contact/SocialLinkCard";
import ContactPill from "../components/contact/ContactPill";

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const contactInfo = [
    { icon: MapPin, text: contact.address, link: "https://maps.app.goo.gl/WT9i7216vyEPM3KP8" },
    { icon: Phone, text: contact.phone, link: `tel:${contact.phone.replace(/\s+/g, '')}` },
    { icon: Mail, text: contact.email, link: `mailto:${contact.email}` }
  ];

  return (
    <main className="page-wrapper relative overflow-hidden bg-transparent">
      <SpotlightBackground />

      <div className="max-w-5xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-24"
        >
          <SectionHeading centered>Community Hub</SectionHeading>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease }}
            className="text-text-muted text-lg max-w-2xl mx-auto font-body mt-6"
          >
            Connect, collaborate, and build with us. Join the platforms below to become part of the AWS Student Builder Group ecosystem.
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-6"
          >
            {contact.communityLinks.map((link, index) => (
              <div key={index} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[280px] flex-shrink-0">
                <SocialLinkCard link={link} />
              </div>
            ))}
          </motion.div>

          <div className="gradient-separator max-w-sm mx-auto opacity-50 my-4" />

          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={{
              rest: { y: 0, scale: 1, rotateX: 0, rotateY: 0 },
              hover: {
                y: -8,
                scale: 1.02,
                rotateX: 4,
                rotateY: -4,
                boxShadow: `0 24px 64px -12px rgba(0,0,0,0.8), 0 0 50px -10px rgba(76,29,149,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
                borderColor: "rgba(109, 40, 217, 0.4)"
              }
            }}
            transition={antigravitySpring}
            className="group relative max-w-4xl mx-auto w-full rounded-[2.5rem] border border-white/[0.04] p-10 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 10, 35, 0.4) 0%, rgba(11, 6, 21, 0.6) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
              style={{ background: 'radial-gradient(circle at bottom, rgba(234,88,12,0.08), transparent 60%)' }} />

            <div className="relative z-10">
              <h2 className="text-sm font-bold mb-10 text-center uppercase tracking-[0.3em] text-primary font-heading">
                Official Contact
              </h2>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
                {contactInfo.map((item, index) => (
                  <ContactPill key={index} item={item} />
                ))}
              </div>

              <div className="mt-12 pt-6 border-t border-white/[0.06] flex items-center justify-center gap-2 text-text-subtle text-[11px] uppercase tracking-widest font-semibold">
                <Clock size={14} className="text-primary/70" />
                <span>Response Time: {contact.responseTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}