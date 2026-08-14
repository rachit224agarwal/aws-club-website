import React from "react";
import Hero from "../components/home/Hero";
import ImpactStats from "../components/home/ImpactStats";
import TrustedIndustry from "../components/home/TrustedIndustry";
import WhyJoinUs from "../components/home/WhyJoinUs";
import LearningJourney from "../components/home/LearningJourney";
import VisionObjective from "../components/home/VisionObjective";
import BottomCTA from "../components/home/BottomCTA";
import visionImage from "../assets/webp/logos/ClubLogoP.webp";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen text-white overflow-hidden">

      <Hero />
      <div className="gradient-separator max-w-5xl mx-auto" />

      <ImpactStats />
      <div className="gradient-separator max-w-5xl mx-auto" />

      <TrustedIndustry />
      <div className="gradient-separator max-w-5xl mx-auto" />

      <WhyJoinUs />
      <div className="gradient-separator max-w-5xl mx-auto" />

      <LearningJourney />
      <div className="gradient-separator max-w-5xl mx-auto" />

      <VisionObjective imageSrc={visionImage} />
      <div className="gradient-separator max-w-5xl mx-auto" />

      <BottomCTA />

    </main>
  );
}