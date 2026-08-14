import React from "react";
import { motion } from "framer-motion";
import { stats } from "../../data/stats";
import Counter from "../ui/Counter";
import SectionHeading from "../ui/SectionHeading";
import { Users, Code2, Award, FolderGit2, TrendingUp } from "lucide-react";
import { fadeUp, antigravitySpring } from "../../utils/animations";

const ease = [0.65, 0, 0.35, 1];

const iconMap = {
  "Community Members": Users,
  "Technical Events": Code2,
  "AWS Certifications": Award,
  "Projects Built": TrendingUp,
};

export default function ImpactStats() {
  return (
    <section className="relative py-24 flex flex-col justify-center items-center px-6 max-w-7xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease }}
        className="w-full"
      >
        <SectionHeading centered>Our Impact</SectionHeading>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center w-full mt-8"
        style={{ perspective: 1000 }}
      >
        {stats.map((stat) => {
          const Icon = iconMap[stat.label] || FolderGit2;
          return (
            <motion.div
              key={stat.id}
              variants={fadeUp}
              whileHover={{
                y: -8,
                scale: 1.02,
                rotateX: 3,
                rotateY: -3,
                boxShadow: `0 24px 48px -12px rgba(0,0,0,0.8), 0 0 50px -10px rgba(76,29,149,0.3), inset 0 1px 0 rgba(255,255,255,0.08)`,
                borderColor: "rgba(109, 40, 217, 0.4)"
              }}
              transition={antigravitySpring}
              className="group relative flex flex-col items-center p-6 md:p-8 rounded-3xl border border-white/[0.04] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 10, 35, 0.6) 0%, rgba(11, 6, 21, 0.8) 100%)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Dynamic hover glow overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(234,88,12,0.15), transparent 70%)' }} />

              <div
                className="p-4 rounded-2xl mb-5 border border-white/[0.05] group-hover:border-purple-primary/30 transition-all duration-400 group-hover:scale-110 relative z-10"
                style={{ background: 'rgba(11, 6, 21, 0.9)' }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-purple-primary/20 blur-md transition-opacity duration-400" />
                <Icon className="w-8 h-8 text-accent group-hover:text-white relative z-10 transition-colors duration-300" />
              </div>
              <div className="relative z-10 font-heading text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                <Counter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-white/60 group-hover:text-white/90 transition-colors duration-300 mt-1 text-sm md:text-base font-medium relative z-10">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
