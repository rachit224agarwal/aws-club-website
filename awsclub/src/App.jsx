import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

import Topbar from "./components/layout/Topbar";
import Footer from "./components/layout/Footer";
import LoadingScreen from "./components/layout/LoadingScreen";
import PageTransition from "./components/layout/PageTransition";

const Home = React.lazy(() => import("./pages/Home"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Events = React.lazy(() => import("./pages/Events"));
const Members = React.lazy(() => import("./pages/Members"));
const Contact = React.lazy(() => import("./pages/Contact"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Disable automatic browser scroll restoration on reload/mount
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: '#050408' }}>
        {/* ═══ Z-INDEX LAYER 0: Deep Background Void ═══
             Parallax multiplier: 0.0 (static) */}

        {/* ═══ Z-INDEX LAYER 1: Environmental Mesh ═══
             Parallax multiplier: 0.2 (moves slightly with scroll) */}

        {/* Aurora Wave — 120s cycle */}
        <div
          className="fixed inset-0 pointer-events-none z-0 gpu-accelerated"
          style={{
            opacity: 0.03,
            background: 'linear-gradient(120deg, transparent 0%, rgba(76,29,149,0.2) 25%, rgba(184,61,10,0.2) 50%, rgba(76,29,149,0.2) 75%, transparent 100%)',
            animation: 'auroraWave 120s ease-in-out infinite alternate',
          }}
        />

        {/* Gradient Mesh — 6 orbs, 60s float */}
        <div
          className="fixed inset-0 pointer-events-none z-0 gpu-accelerated"
          style={{
            background: `
              radial-gradient(ellipse at 15% 25%, rgba(76,29,149,0.12), transparent 60%),
              radial-gradient(ellipse at 85% 75%, rgba(184,61,10,0.10), transparent 60%),
              radial-gradient(ellipse at 50% 90%, rgba(76,29,149,0.06), transparent 50%),
              radial-gradient(ellipse at 50% 10%, rgba(184,61,10,0.04), transparent 40%),
              radial-gradient(ellipse at 30% 60%, rgba(76,29,149,0.03), transparent 40%),
              radial-gradient(ellipse at 70% 40%, rgba(184,61,10,0.03), transparent 40%)
            `,
            animation: 'meshFloat 60s ease-in-out infinite alternate',
          }}
        />

        {/* ═══ Z-INDEX LAYER 2: Atmospheric Texture ═══
             Fixed to viewport */}
        <div className="grain-overlay gpu-accelerated" />

        {/* Enhanced Vignette */}
        <div
          className="fixed inset-0 pointer-events-none z-[1]"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* Atmospheric Glow Pulse — 8s */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(76,29,149,0.04), transparent 70%),
              radial-gradient(ellipse at 80% 50%, rgba(184,61,10,0.04), transparent 70%)
            `,
          }}
        />

        {/* ═══ Z-INDEX LAYER 3: Foreground Interface ═══
             Parallax multiplier: 1.0 */}

        <Topbar />

        <main className="flex-grow pt-16 relative z-10">
          <React.Suspense fallback={<LoadingScreen />}>
            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
                <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
                <Route path="/members" element={<PageTransition><Members /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </React.Suspense>
        </main>

        <Footer />
        <Analytics />
      </div>
    </MotionConfig>
  );
}

export default App;
