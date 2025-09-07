import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { MapPin, Phone, Mail, Twitter, Linkedin, Instagram } from "lucide-react";

// Animated SVG Mail Logo Component
function AnimatedMailLogo() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-4 animate-bounce">
      <g>
        <rect x="8" y="18" width="48" height="28" rx="6" fill="#FF9900" />
        <polyline points="10,20 32,38 54,20" fill="none" stroke="#fff" strokeWidth="2.5" />
        <rect x="8" y="18" width="48" height="28" rx="6" fill="none" stroke="#fff" strokeWidth="2" />
      </g>
      <style>
        {`
          .animate-bounce {
            animation: bounce 1.8s infinite cubic-bezier(.7,.7,0,1);
          }
          @keyframes bounce {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
        `}
      </style>
    </svg>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSuccess("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        () => setSuccess("Failed to send message. Try again!")
      );
  };

  return (
    <main className="relative min-h-screen w-full bg-gray-900 text-white flex items-center justify-center py-16">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
        {/* Left: Contact Form */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
          <AnimatedMailLogo />
          <h2 className="text-3xl font-bold text-[#FF9900] mb-3">Contact Us Now</h2>
          <p className="text-gray-400 mb-6">
            Ask us anything, and we would love to hear from you.
          </p>
          {success && <p className="text-green-400 mb-4">{success}</p>}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="p-3 rounded-lg bg-gray-700 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-3 rounded-lg bg-gray-700 focus:outline-none"
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              className="p-3 rounded-lg bg-gray-700 focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="bg-[#FF9900] hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition"
            >
              Get In Touch
            </button>
          </form>
        </div>
        {/* Right: Contact Details */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="flex flex-col items-center space-y-1 mb-4">
              <AnimatedMailLogo />
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="text-[#FF9900]" />
              <p>AWS Cloud Club, KIET Group Of Institutions</p>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <Phone className="text-[#FF9900]" />
              <p>+91 9557915111</p>
            </div>
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="text-[#FF9900]" />
              <p>awscloudclub1kiet@gmail.com</p>
            </div>
            <p className="font-bold text-lg mb-3">Follow us</p>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-[#FF9900]"><Twitter size={20} /></a>
              <a href="https://www.linkedin.com/company/aws-cloud-club-kiet/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9900]"><Linkedin size={20} /></a>
              <a href="https://www.instagram.com/aws_cloudclubkiet?igsh=eXZpNWJ6NmZvb2pn&utm_source=qr " target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9900]"><Instagram size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
