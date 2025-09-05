import React from "react";

export default function VisionObjective({ imageSrc }) {
  return (
    <section className="relative py-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      
      {/* Image */}
      <div className="flex-1 flex justify-center">
        <img 
          src={imageSrc} 
          alt="Vision & Objective" 
          className="rounded-2xl shadow-2xl max-w-full max-h-80 object-cover"
        />
      </div>

      {/* Text */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-[#FF9900] mb-6">
          Our Vision & Objective
        </h2>

        <p className="text-gray-300 text-lg mb-4 leading-relaxed">
          <span className="font-semibold text-[#FF9900]">Vision:</span> Empower students to become skilled cloud practitioners, innovators, and leaders in technology by providing hands-on learning, mentorship, and networking opportunities.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed">
          <span className="font-semibold text-[#FF9900]">Objective:</span> To foster a collaborative community where students can explore AWS cloud technologies, work on projects, earn certifications, participate in hackathons, and build careers in cloud computing.
        </p>
      </div>
    </section>
  );
}
