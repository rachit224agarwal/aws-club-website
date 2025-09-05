import { useState, useEffect } from "react";
import awslogo from "../assets/awslogo.png";
import Counter from "../components/Counter";
import VisionObjective from "../components/VisionObjective";
import visionImage from "../assets/clubLogo.png";

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
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

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

  // Cursor movement effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Neon background effect */}
      <div className="absolute inset-0">
        <div className="w-[700px] h-[700px] bg-yellow-500 opacity-20 rounded-full blur-[200px] absolute top-[-200px] left-[-200px] animate-pulse"></div>
        <div className="w-[600px] h-[600px] bg-blue-500 opacity-20 rounded-full blur-[200px] absolute bottom-[-200px] right-[-200px] animate-pulse"></div>
      </div>

      {/* Moving cursor glow */}
      <div
        className="pointer-events-none fixed w-24 h-24 bg-[#FF9900] opacity-20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto pt-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-[#FF9900]">AWS Cloud Club</span>
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold mb-3">
          <span>{words[currentWordIndex][0]}</span>
          {displayedText}
          <span className="border-r-2 border-[#FF9900] animate-pulse ml-1"></span>
        </h2>
        <p className="mt-3 text-lg max-w-2xl text-gray-300">
          Empowering students to learn, build, and grow with AWS Cloud.
        </p>
      </section>

      {/* Logo Section */}
      <section className="relative py-12 flex flex-col justify-center items-center px-6 max-w-7xl mx-auto">
        <img src={awslogo} alt="AWS Logo" className="max-h-28 md:max-h-36" />
      </section>

      {/* Stats Section */}
     <section className="relative py-16 flex flex-col justify-center items-center px-6 max-w-7xl mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold text-[#FF9900] mb-10">
    Our Impact
  </h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    <div>
      <Counter target={20} />
      <p className="text-gray-300 mt-2">Active Members</p>
    </div>
    <div>
      <Counter target={20} />
      <p className="text-gray-300 mt-2">Workshops Hosted</p>
    </div>
    <div>
      <Counter target={10} />
      <p className="text-gray-300 mt-2">AWS Certifications</p>
    </div>
    <div>
      <Counter target={7} />
      <p className="text-gray-300 mt-2">Ongoing Projects</p>
    </div>
  </div>
</section>


      {/* Why Join Us Section */}
      <section className="relative py-16 flex flex-col justify-center items-center px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#FF9900] mb-10">
          Why Join Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">Hands-on Learning</h3>
            <p className="text-gray-300 text-sm">
              Get real experience with AWS services, cloud projects, and
              certifications.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">Networking</h3>
            <p className="text-gray-300 text-sm">
              Connect with peers, mentors, and AWS experts to grow together.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">Opportunities</h3>
            <p className="text-gray-300 text-sm">
              Participate in hackathons, internships, and career-building
              events.
            </p>
          </div>
        </div>
      </section>


        <VisionObjective imageSrc={visionImage} />
    </main>
  );
}

