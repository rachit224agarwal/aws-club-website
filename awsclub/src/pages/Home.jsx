import { useState, useEffect } from "react";

const words = [
  "Cloud",
  "Compute",
  "Community",
  "Collaboration",
  "Career",
  "Certification",
  "Creativity",
];

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 120;
  const deletingSpeed = 60;
  const delayBetweenWords = 1000;

  useEffect(() => {
    const word = words[currentWordIndex].slice(1); // skip 1st alphabet
    let typingTimeout;

    if (!isDeleting && displayedText.length < word.length) {
      typingTimeout = setTimeout(() => {
        setDisplayedText(word.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && displayedText.length > 0) {
      typingTimeout = setTimeout(() => {
        setDisplayedText(word.slice(0, displayedText.length - 1));
      }, deletingSpeed);
    } else if (!isDeleting && displayedText.length === word.length) {
      typingTimeout = setTimeout(() => setIsDeleting(true), delayBetweenWords);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(typingTimeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <main className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-[#E68900]">AWS Cloud Club</span>
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold">
          <span className="">
            {words[currentWordIndex][0]}
          </span>
          {displayedText}
          <span className="border-r-2 border-[#E68900] animate-pulse ml-1"></span>
        </h2>
        <p className="mt-6 text-lg max-w-2xl text-gray-300">
          Empowering students to learn, build, and grow with AWS Cloud.
        </p>
      </section>

      {/* Stats Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#E68900] mb-12">
          Our Impact
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <h3 className="text-4xl font-bold text-[#E68900]">500+</h3>
            <p className="text-gray-300 mt-2">Active Members</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[#E68900]">20+</h3>
            <p className="text-gray-300 mt-2">Workshops Hosted</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[#E68900]">15+</h3>
            <p className="text-gray-300 mt-2">AWS Certifications</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[#E68900]">10+</h3>
            <p className="text-gray-300 mt-2">Projects</p>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#E68900] mb-12">
          Why Join Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl">
          <div className="p-8 bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3">🚀 Hands-on Learning</h3>
            <p className="text-gray-300 text-sm">
              Get real experience with AWS services, cloud projects, and
              certifications.
            </p>
          </div>
          <div className="p-8 bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3">🤝 Networking</h3>
            <p className="text-gray-300 text-sm">
              Connect with peers, mentors, and AWS experts to grow together.
            </p>
          </div>
          <div className="p-8 bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3">🏆 Opportunities</h3>
            <p className="text-gray-300 text-sm">
              Participate in hackathons, internships, and career-building events.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
