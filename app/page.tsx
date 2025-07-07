"use client";

import React, { useEffect, useState } from "react";

const sections = ["home", "about", "server", "projects", "contact"];

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

export default function Navbar() {
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

  return (
    <nav
      className={`fixed w-full z-50 px-8 py-8 transition-all ${
        scrolled
          ? "bg-[#1a2f3c]/90 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.9)]"
          : "bg-[#1a2f3c]/95 shadow-[0_6px_20px_rgba(0,0,0,0.7)]"
      } text-white`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Portfolio</div>

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
                className={`relative text-2xl cursor-pointer transition-colors duration-200 ${
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
        {/* Hamburger for mobile */}
        <div className="md:hidden">
          {!menuOpen && (
            <button onClick={() => setMenuOpen(true)} className="text-3xl">
              ☰
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 right-0 sm:w-[20%] w-[25%] h-screen bg-[#1a2f3c]/90 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.9)] z-50 p-4 text-right rounded-l-xl">
          {/* ปุ่มกากบาททับบนสุด */}
          <button
            onClick={() => setMenuOpen(false)}
            className="text-3xl absolute top-10 right-14"
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
                  className={`text-lg w-full py-2 px-3 rounded-lg transition-colors duration-200 ${
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
  );
}
