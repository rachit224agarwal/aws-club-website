import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function Footer() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-gray-200 border-t border-gray-800 overflow-hidden">
      {/* Animated Background Glow */}
      <motion.div
        variants={glowVariants}
        animate="animate"
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF9900] rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />
      </motion.div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10"
      >
        {/* Main Footer Content - Centered */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            
            {/* About Section - Centered on Mobile, Left on Desktop */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center md:items-start"
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-center md:text-left"
              >
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-[#FF9900] bg-clip-text text-transparent">
                  AWS Cloud Club KIET
                </h3>
                <div className="w-12 h-0.5 bg-[#FF9900] mb-4 mx-auto md:mx-0 group-hover:w-24 transition-all duration-300" />
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  Join 100+ other tech enthusiasts and make the best connections in KIET (Deemed to be University)
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Section - Centered */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center md:items-center"
            >
              <motion.h4 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-semibold mb-5 text-[#FF9900] tracking-wider"
              >
                CONTACT US
              </motion.h4>
              <ul className="space-y-3 text-sm">
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a
                    href="tel:+919557915111"
                    className="flex items-center gap-3 hover:text-[#FF9900] transition-colors duration-300 group justify-center md:justify-center"
                  >
                    <svg className="w-4 h-4 text-[#FF9900] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+91 9557915111</span>
                  </a>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a
                    href="mailto:awscloudclubkiet@gmail.com"
                    className="flex items-center gap-3 hover:text-[#FF9900] transition-colors duration-300 group justify-center md:justify-center"
                  >
                    <svg className="w-4 h-4 text-[#FF9900] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>awscloudclub@kiet.edu</span>
                  </a>
                </motion.li>
              </ul>
            </motion.div>

            {/* Social Links Section - Centered */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center md:items-end"
            >
              <motion.h4 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-semibold mb-5 text-[#FF9900] tracking-wider"
              >
                CONNECT WITH US
              </motion.h4>
              <div className="flex gap-4 justify-center md:justify-end">
                {[
                  { icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 110 4 2 2 0 010-4z", label: "LinkedIn", link: "https://www.linkedin.com/company/aws-cloud-club-kiet" },
                  { icon: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z", label: "X", link: "https://twitter.com/awscloudclub" },
                  { icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM8.051 12c0-2.182 1.768-3.949 3.949-3.949s3.949 1.767 3.949 3.949-1.768 3.949-3.949 3.949-3.949-1.767-3.949-3.949zm2.102 0c0 1.019.827 1.846 1.846 1.846s1.846-.827 1.846-1.846-.827-1.846-1.846-1.846-1.846.827-1.846 1.846zm4.093-5.643a1 1 0 110 2 1 1 0 010-2z", label: "Instagram", link: "https://www.instagram.com/aws_cloudclubkiet/" }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full bg-gray-800/50 backdrop-blur-sm flex items-center justify-center hover:bg-[#FF9900] transition-all duration-300 group border border-gray-700 hover:border-transparent"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Team Section with Animation - Centered */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-800/50 py-10 text-center relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.h4 
              whileHover={{ scale: 1.05 }}
              className="text-xl font-semibold mb-3 bg-gradient-to-r from-[#FF9900] to-orange-500 bg-clip-text text-transparent"
            >
              Team AWS Cloud Club KIET
            </motion.h4>
            <p className="text-sm text-gray-400">
              Together we build, learn, and innovate on the cloud
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Credits with Animated Heart - Centered */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-800/50 py-6 text-center text-sm text-gray-400"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-1 flex-wrap"
          >
            <span>Developed with</span>
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="text-red-500 inline-block"
            >
              ❤️
            </motion.span>
            <span>by</span>
            <motion.a
              href="https://www.linkedin.com/in/rachit-agarwal-a52924282/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, color: "#FF9900" }}
              className="text-[#FF9900] hover:underline inline-block font-medium"
            >
              Rachit Agarwal
            </motion.a>
            <span>and</span>
            <motion.a
              href="https://www.linkedin.com/in/raunak-kushwaha-1b22372a8/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, color: "#FF9900" }}
              className="text-[#FF9900] hover:underline inline-block font-medium"
            >
              Raunak Kushwaha
            </motion.a>
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  );
}