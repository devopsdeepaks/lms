"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { FaInstagram, FaLinkedin, FaEnvelope, FaGithub, FaArrowUp } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [showTopButton, setShowTopButton] = useState(false);

  const handleClick = () => router.push("/dashboard");

  // Show/hide Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative">
      
      {/* HERO */}
      <header className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-900 p-10 rounded-3xl shadow-2xl flex flex-col items-center space-y-8 max-w-lg w-full">
          <h1 className="text-4xl font-extrabold text-white text-center">
            Welcome to <span className="text-indigo-400">Easy Study</span>
          </h1>

          <p className="text-gray-400 text-center text-lg">
            Your journey to smarter learning starts here.
          </p>

          <Button 
            variant="default" 
            className="w-full text-lg py-6 rounded-full shadow-md hover:scale-105 hover:bg-indigo-500 transition-all duration-300"
            onClick={handleClick}
          >
            Get Started
          </Button>

          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* FEATURES */}
      <section className="flex flex-col items-center justify-center py-20 px-6 space-y-12">
        <div className="max-w-4xl text-center space-y-4">
          <h2 className="text-3xl font-bold">Why Choose Easy Study?</h2>
          <p className="text-gray-400">
            We help you learn faster, better, and smarter. With adaptive learning paths, curated notes, and a supportive community — Easy Study is your perfect study buddy.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 text-center max-w-5xl">
          <div className="bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2 text-indigo-400">Smart Notes</h3>
            <p className="text-gray-400">Access topic-wise, exam-ready notes curated by toppers.</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2 text-indigo-400">Quizzes</h3>
            <p className="text-gray-400">Test your knowledge with fast and fun quizzes.</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2 text-indigo-400">AI Doubt Solver</h3>
            <p className="text-gray-400">Ask any doubt, get AI-generated clear explanations.</p>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-20 px-6 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-400">Meet the Team</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {[
            { name: "Simaran Sahu", role: "Full Stack Developer", img: "/exam.png" },
            { name: "Deepak singhal", role: "UI/UX Designer", img: "/exam.png" },
           
          ].map((member, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-6 w-64 shadow hover:scale-105 transition">
              <img 
                src={member.img} 
                alt={member.name} 
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-400 object-cover"
              />
              <h3 className="text-lg font-semibold text-center">{member.name}</h3>
              <p className="text-gray-400 text-center">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 border-t border-gray-700 px-6 py-10 text-sm mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-2">About Easy Study</h3>
            <p>
              Easy Study is your personalized online study assistant. Built for students, by students.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-2">Contact</h3>
            <p>Email: <a href="mailto:support@easystudy.com" className="text-indigo-400 hover:underline">support@easystudy.com</a></p>
            <p>Phone: +91 9876543210</p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-2">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="https://instagram.com" target="_blank" className="hover:text-pink-400"><FaInstagram size={20} /></a>
              <a href="https://linkedin.com" target="_blank" className="hover:text-blue-400"><FaLinkedin size={20} /></a>
              <a href="https://github.com" target="_blank" className="hover:text-gray-300"><FaGithub size={20} /></a>
              <a href="mailto:support@easystudy.com" className="hover:text-yellow-300"><FaEnvelope size={20} /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 border-t border-gray-700 pt-4 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Easy Study. All rights reserved.
        </div>
      </footer>

      {/* BACK TO TOP BUTTON */}
      {showTopButton && (
        <button 
          className="fixed bottom-5 right-5 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all z-50"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

