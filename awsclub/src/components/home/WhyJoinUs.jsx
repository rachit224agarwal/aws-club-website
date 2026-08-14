import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { Cloud, Code, Award, Trophy, Briefcase, Target } from "lucide-react";
import { fadeUp, antigravitySpring } from "../../utils/animations";

const ease = [0.65, 0, 0.35, 1];

const benefits = [
  { icon: Cloud, title: "Hands-on Cloud Learning", description: "Master AWS services through practical, guided workshops." },
  { icon: Code, title: "Build Real Projects", description: "Deploy scalable applications and robust cloud architectures." },
  { icon: Award, title: "AWS Certifications", description: "Get equipped with study paths for Cloud Practitioner & Solutions Architect." },
  { icon: Trophy, title: "Hackathons & Challenges", description: "Compete in global cloud competitions and university hackathons." },
  { icon: Briefcase, title: "Industry Networking", description: "Connect with AWS experts, alumni, and tech recruiters." },
  { icon: Target, title: "Leadership Opportunities", description: "Lead teams, mentor peers, and grow your professional brand." },
];

export default function WhyJoinUs() {
  return (
    <section className="relative py-24 flex flex-col justify-center items-center px-6 max-w-7xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease }}
        className="w-full text-center"
      >
        <SectionHeading centered>More Than a Club - A Launchpad for Your Tech Career</SectionHeading>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12"
        style={{ perspective: 1000 }}
      >
        {benefits.map((benefit) => (
          <motion.div
            key={benefit.title}
            variants={fadeUp}
            whileHover={{
              y: -8,
              scale: 1.02,
              rotateX: 4,
              rotateY: -4,
              boxShadow: `0 24px 64px -12px rgba(0,0,0,0.8), 0 0 50px -10px rgba(76,29,149,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
              borderColor: "rgba(109, 40, 217, 0.4)"
            }}
            transition={antigravitySpring}
            className="group relative flex flex-col items-center md:items-start text-center md:text-left p-8 rounded-3xl border border-white/[0.04] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 10, 35, 0.6) 0%, rgba(11, 6, 21, 0.8) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Dynamic background glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: 'radial-gradient(circle at right bottom, rgba(76,29,149,0.15), transparent 70%)' }} />

            <div className="relative z-10 flex flex-col items-center md:items-start">
              <div className="mb-6 relative">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-purple-primary/20 blur-xl transition-opacity duration-500" />
                <div
                  className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/[0.05] group-hover:border-purple-primary/30"
                  style={{ background: 'rgba(11, 6, 21, 0.9)' }}
                >
                  <benefit.icon className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading text-white/90 group-hover:text-white transition-colors duration-300">{benefit.title}</h3>
              <p className="text-white/60 group-hover:text-white/80 text-sm md:text-base leading-relaxed font-body transition-colors duration-300">{benefit.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
