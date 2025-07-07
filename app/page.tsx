"use client";

import React, { useEffect, useState } from "react";

const sections = ["home", "about", "server", "projects", "contact"];
const images = ["/bg.jpg", "/1.jpg", "/2.jpg"];

const smoothScrollTo = (targetId: string, offset = 0) => {
  const target = document.querySelector(targetId);
  if (!target) return;
  const navbarHeight = 96;
  const targetPosition =
    target.getBoundingClientRect().top + window.pageYOffset + offset;
  window.scrollTo({
    top: targetPosition - navbarHeight,
    behavior: "smooth",
  });
};

export default function CV() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "server", label: "Server" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  /* home carousel */
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // เปลี่ยนรูปทุก 3 วินาที
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-50 px-8 2xl:py-8 xl:py-7 md:py-6 sm:py-5 py-3 transition-all ${
          scrolled
            ? "bg-[#1a2f3c]/90 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.9)]"
            : "bg-[#1a2f3c]/95 shadow-[0_6px_20px_rgba(0,0,0,0.7)]"
        } text-white`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="xl:text-2xl lg:text-xl sm:text-lg text-md font-bold">
            Portfolio
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-10">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() =>
                    smoothScrollTo(
                      `#${id}`,
                      id === "about" ? -240 : id === "server" ? -50 : 0
                    )
                  }
                  className={`relative xl:text-2xl lg:text-xl md:text-lg sm:text-md cursor-pointer transition-colors duration-200 ${
                    activeSection === id
                      ? "text-[#3abaa8]"
                      : "hover:text-[#3abaa8]"
                  } nav-link`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Hamburger for mobile */}
          <div className="md:hidden">
            {!menuOpen && (
              <button
                onClick={() => setMenuOpen(true)}
                className="sm:text-3xl text-2xl"
              >
                ☰
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden fixed top-0 right-0 sm:w-[18%] w-[18%] h-screen bg-[#1a2f3c]/90 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.9)] z-50 p-4 text-right rounded-l-xl">
            <button
              onClick={() => setMenuOpen(false)}
              className="sm:text-3xl text-2xl absolute sm:top-8 sm:right-12 right-8"
              aria-label="Close menu"
            >
              ✕
            </button>

            <ul className="flex flex-col space-y-6 mt-20">
              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => {
                      smoothScrollTo(
                        `#${id}`,
                        id === "about" ? -240 : id === "server" ? -50 : 0
                      );
                      setMenuOpen(false);
                    }}
                    className={`sm:text-lg text-sm w-full py-2 sm:px-3 rounded-lg transition-colors duration-200 ${
                      activeSection === id
                        ? "text-[#3abaa8] bg-[#3abaa8]/10"
                        : "hover:bg-white/10 active:bg-white/20 hover:text-[#3abaa8]"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="space-y-24 scroll-smooth overflow-x-hidden">
        <section id="home" className="scroll-mt-24">
          <style>{`
            @keyframes float-up-fade-in-out {
              0% {
                transform: translateY(30px);
                opacity: 0;
              }
              10% {
                transform: translateY(0);
                opacity: 1;
              }
              85% {
                transform: translateY(0);
                opacity: 1;
              }
              100% {
                transform: translateY(-20px);
                opacity: 0;
              }
            }
            .float-up-fade-in-out {
              animation-name: float-up-fade-in-out;
              animation-duration: 12s;
              animation-fill-mode: forwards;
              animation-timing-function: ease-in-out;
              animation-iteration-count: infinite;
              opacity: 0;
            }
            .delay-0 {
              animation-delay: 0s;
            }
            .delay-1 {
              animation-delay: 2s;
            }
            .delay-2 {
              animation-delay: 4s;
            }
            .delay-3 {
              animation-delay: 6s;
            }
          `}</style>

          <div className="flex flex-row w-full 2xl:min-h-screen xl:h-[700px] lg:h-[580px] md:h-[480px] sm:h-[450px] h-[300px]  bg-gradient-to-r from-[#3abaa8] to-[#232323] text-white">
            {/* Left Section */}
            <div className="flex flex-col justify-center sm:p-10 p-6  pt-30  lg:p-20 flex-1">
              <h1 className="xl:text-4xl lg:text-3xl md:text-2xl  sm:text-xl text-sm font-bold uppercase leading-tight float-up-fade-in-out delay-0">
                PHONSINEE KITCHAAUM <br />
              </h1>

              <div className="sm:w-48 w-0  h-1 bg-white sm:my-6 my-2  float-up-fade-in-out delay-1" />

              <p className="xl:text-lg lg:text-md md:text-sm sm:text-sm text-[10px] sm:mb-6 mb-4 max-w-xl leading-relaxed float-up-fade-in-out delay-2">
                “I’m learning to build not just websites — but experiences.”
              </p>

              <p className="text-white xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-sm xl:pl-36   font-bold sm:py-2 sm:px-6 px-4 transition float-up-fade-in-out delay-3">
                Frontend Developer
              </p>
            </div>

            {/* Right Section */}
            <div
              key={currentIndex}
              className="2xl:flex-[1.5] flex-1  bg-cover bg-center clip-diagonal-slash xl:mr-20 sm:mr-10 mr-8 transition-all duration-1000 ease-in-out transform"
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                animation: "slide-in-right 1s ease forwards",
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
