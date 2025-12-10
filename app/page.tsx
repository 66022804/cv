"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const sections = ["home", "about", "service", "projects", "contact"];
const images = ["/bg.jpg", "/1.jpg", "/2.jpg"];

const getOffset = (id: string) => {
  const width = window.innerWidth;
  if (id === "about") {
    if (width >= 1536) return -120;
    if (width >= 1280) return -100;
    if (width >= 1024) return -55;
    if (width >= 768) return -60;
    if (width >= 640) return -30;
    return 0;
  }
  if (id === "service") {
    if (width >= 1536) return -60;
    if (width >= 1280) return -60;
    if (width >= 1024) return -82;
    if (width >= 768) return -45;
    if (width >= 640) return -150;
    return -30;
  }
  if (id === "projects") {
    if (width >= 1536) return -30;
    if (width >= 1280) return 20;
    if (width >= 1024) return 30;
    if (width >= 768) return 40;
    if (width >= 640) return 50;
    return 70;
  }

  if (id === "contact") {
    if (width >= 1536) return -50;
    if (width >= 1280) return -45;
    if (width >= 1024) return -40;
    if (width >= 768) return -35;
    if (width >= 640) return -25;
    return -20;
  }
  return 0;
};

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
    { id: "service", label: "Service" },
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

  /* ABOUT SECTION */
  const aboutRef = useRef<HTMLDivElement>(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutAnimate, setAboutAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutVisible(true);
          setAboutAnimate(false);
          setTimeout(() => setAboutAnimate(true), 50);
        } else {
          setAboutVisible(false);
          setAboutAnimate(false);
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  /* services SECTION */
  const serviceRef = useRef<HTMLDivElement>(null);
  const [serviceVisible, setServiceVisible] = useState(false);
  const [serviceAnimate, setServiceAnimate] = useState(false);
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observice = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServiceVisible(true);
          setServiceAnimate(false); // reset ก่อน
          if (animationTimeout.current) {
            clearTimeout(animationTimeout.current);
          }
          animationTimeout.current = setTimeout(() => {
            setServiceAnimate(true); // trigger animation
          }, 10); // ทำให้เร็วขึ้น (50 อาจช้าเกินไป)
        } else {
          setServiceVisible(false);
          setServiceAnimate(false); // reset เมื่อออกนอกจอ
          if (animationTimeout.current) {
            clearTimeout(animationTimeout.current);
            animationTimeout.current = null;
          }
        }
      },
      { threshold: 0.3 }
    );

    if (serviceRef.current) observice.observe(serviceRef.current);
    return () => {
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
      observice.disconnect();
    };
  }, []);

  /* Projects SECTION */
  const projectRefs = useRef([
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
    React.createRef<HTMLDivElement>(),
  ]);

  const [visible, setVisible] = useState([false, false, false]);
  const [expandedStates, setExpandedStates] = useState([false, false, false]);

  useEffect(() => {
    const currentRefs = projectRefs.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = currentRefs.findIndex(
            (ref) => ref.current === entry.target
          );
          if (index !== -1) {
            if (entry.isIntersecting) {
              setVisible((prev) => {
                const newArr = [...prev];
                newArr[index] = true;
                return newArr;
              });
            } else {
              setVisible((prev) => {
                const newArr = [...prev];
                newArr[index] = false;
                return newArr;
              });

              setExpandedStates((prev) => {
                const newArr = [...prev];
                newArr[index] = false; // reset อ่านเพิ่มเติมเมื่อออกนอกจอ
                return newArr;
              });
            }
          }
        });
      },
      { threshold: 0.3 } // หรือ 0.5 ตามต้องการ
    );

    currentRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  // ข้อความเต็มของแต่ละโปรเจกต์
  const fullTexts = [
    "This website serves as a forum platform focused on university-related topics. Users can share personal stories, ask questions, and engage in discussions related to their academic environment. Experienced members provide valuable insights, helping create a supportive and informative space.",
    "This is a coding practice website that allows users to adjust difficulty levels and supports multiple programming languages, including algorithms, JavaScript, Python, and Java. The site provides timed coding challenges and a ranking system to display user performance.",
    "This is a recipe suggestion website designed for those unsure of what to eat. Users can enter available ingredients, and the system will display a variety of recipes to choose from. Additionally, users can share their own recipes, allowing others to try and follow them.",
  ];

  // ตัดข้อความ preview (100 ตัวอักษร)
  const getPreviewText = (text: string) =>
    text.length > 100 ? text.slice(0, 100) + "..." : text;

  // กดปุ่มอ่านเพิ่มเติม / อ่านน้อยลง
  const toggleExpand = (index: number) => {
    setExpandedStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  // project
  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(false);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setAnimate(true);
            });
          });
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
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
                  onClick={() => smoothScrollTo(`#${id}`, getOffset(id))}
                  className={`relative xl:text-2xl lg:text-xl md:text-lg sm:text-md text-sm cursor-pointer transition-colors duration-200 ${
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
          <div className="md:hidden fixed top-0 right-0 sm:w-[18%] w-[20%] h-screen bg-[#1a2f3c]/90 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.9)] z-50 p-4 text-right rounded-l-xl">
            <button
              onClick={() => setMenuOpen(false)}
              className="sm:text-3xl text-2xl absolute sm:top-8 sm:right-12 right-5"
              aria-label="Close menu"
            >
              ✕
            </button>

            <ul className="flex flex-col space-y-6 mt-20">
              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => {
                      smoothScrollTo(`#${id}`, getOffset(id));
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
      <main className="space-y-24 scroll-smooth sm:overflow-x-hidden md:block overflow-x-hidden bg-white ">
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
            .delay-4 {
              animation-delay: 8s;
            }
            .delay-5 {
              animation-delay: 10s;
            }
            .delay-6 {
              animation-delay: 12s;
            }
          `}</style>

          <div className="flex flex-row w-full 2xl:min-h-screen xl:h-[700px] lg:h-[580px] md:h-[480px] sm:h-[450px] h-[300px]  bg-gradient-to-r from-[#3abaa8] to-[#232323] text-white">
            {/* Left Section */}
            <div className="flex flex-col justify-center sm:p-10 p-6  pt-30  lg:p-20 flex-1">
              <h1 className="2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl  sm:text-xl text-xs font-bold uppercase leading-tight float-up-fade-in-out delay-0">
                PHONSINEE KITCHAAUM <br />
              </h1>

              <div className="2xl:w-72 xl:w-52 lg:w-44 md:w-36 sm:w-28 w-0  h-1 bg-white sm:my-6 xl:my-12 my-2  float-up-fade-in-out delay-1" />

              <p className="2xl:text-2xl xl:text-xl lg:text-lg md:text-sm sm:text-sm text-[10px] sm:mb-6 xl:mb-10 mb-4 max-w-2xl leading-relaxed float-up-fade-in-out delay-2">
                “I’m learning to build not just websites — but experiences.”
              </p>

              {/* <p className="text-white 2xl:text-4xl xl:text-3xl lg:text-xl md:text-lg sm:text-md text-xs xl:pl-36   font-bold sm:py-2 sm:px-6 px-4 transition float-up-fade-in-out delay-3">
                Frontend Developer
              </p>

              <p className="text-white 2xl:text-4xl xl:text-3xl lg:text-xl md:text-lg sm:text-md text-xs xl:pl-36   font-bold sm:py-2 sm:px-6 px-4 transition float-up-fade-in-out delay-4">
                Software Testing / QA
              </p>

              <p className="text-white 2xl:text-4xl xl:text-3xl lg:text-xl md:text-lg sm:text-md text-xs xl:pl-36   font-bold sm:py-2 sm:px-6 px-4 transition float-up-fade-in-out delay-5">
                UX/UI Design
              </p> */}

              <p className="text-white 2xl:text-4xl xl:text-3xl lg:text-xl md:text-lg sm:text-md text-xs xl:pl-36   font-bold sm:py-2 sm:px-6 px-4 transition float-up-fade-in-out delay-6">
                Business Analysis
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
        <section
          id="about"
          className="scroll-mt-24 2xl:mt-40 lg:mt-5 xl:mt-32 md:mt-40  px-6"
        >
          <style>{`
  @keyframes bounce-in {
    0% {
      transform: translateY(50px);
      opacity: 0;
    }
    50% {
      transform: translateY(-10px);
      opacity: 1;
    }
    70% {
      transform: translateY(5px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .bounce-in {
    animation: bounce-in 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
  }

  @keyframes slide-in-left {
    0% {
      transform: translateX(-100px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .slide-in-left {
    animation: slide-in-left 1s ease-out forwards;
  }
`}</style>

          <div
            ref={aboutRef}
            className={`transition-all duration-700 ease-out ${
              aboutVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } ${aboutAnimate ? "bounce-in" : ""}`}
          >
            <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold md:mb-8 mb-5  text-center text-black">
              About
            </h2>
            <div className="flex flex-col xl:flex-row items-center gap-10 max-w-6xl 2xl:mx-auto xl:mx-12 lg:mx-20 md:mx-10 sm:mx-8 mx-4 ">
              {/* รูปวงกลมด้านซ้าย */}
              <div
                className={`relative 2xl:w-[900px] 2xl:h-64 xl:w-[800px] xl:h-52 lg:w-[200px] lg:h-52 md:w-[180px] md:h-44 sm:w-[150px] sm:h-36 w-[120px] h-30 rounded-full overflow-hidden shadow-lg ${
                  aboutVisible ? "slide-in-left" : "opacity-0"
                }`}
              >
                <Image
                  src="/9.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>

              {/* ข้อความด้านขวา */}
              <div className="space-y-6 text-left">
                <p className="xl:text-xl lg:text-lg md:text-md sm:text-sm text-sm text-black">
                  I am a third-year Software Engineering student at the
                  University of Phayao, seeking an internship from March 2026 to
                  September 2026. I am passionate about learning and
                  contributing to real-world software development projects. My
                  interests include Business Analysis, and I am excited to
                  collaborate with a team and gain hands-on experience.
                </p>

                <div className="flex flex-wrap xl:flex-nowrap gap-4">
                  <div
                    className={`group lg:text-xl md:text-lg sm:text-md text-sm p-2 shadow-lg rounded-2xl flex items-center gap-2 w-fit transition-all duration-300
    bg-gradient-to-r from-[#3abaa8] to-[#232323] bg-clip-text text-transparent
    hover:text-white hover:bg-gradient-to-r hover:from-[#3abaa8] hover:to-[#232323] hover:bg-clip-padding cursor-pointer
    ${aboutVisible ? "bounce-in" : "opacity-0"}
  `}
                  >
                    HTML
                    <div className="relative w-3 md:w-4 lg:w-5 aspect-square">
                      <Image
                        src="/html.png"
                        alt="HTML Icon"
                        fill
                        className="object-contain transition duration-300 group-hover:invert"
                      />
                    </div>
                  </div>

                  <div
                    className={`group lg:text-xl md:text-lg sm:text-md text-sm p-2 shadow-lg rounded-2xl flex items-center gap-2 w-fit transition-all duration-300
                      bg-gradient-to-r from-[#3abaa8] to-[#232323] bg-clip-text text-transparent
                      hover:text-white hover:bg-gradient-to-r hover:from-[#3abaa8] hover:to-[#232323] hover:bg-clip-padding cursor-pointer
                      ${aboutVisible ? "bounce-in" : "opacity-0"}
                    `}
                  >
                    CSS
                    <div className="relative w-3 md:w-4 lg:w-5 aspect-square">
                      <Image
                        src="/css.png"
                        alt="css Icon"
                        fill
                        className="object-contain transition duration-300 group-hover:invert"
                      />
                    </div>
                  </div>

                  <div
                    className={`group lg:text-xl md:text-lg text-sm p-2 shadow-lg rounded-2xl flex items-center gap-2 w-fit transition-all duration-300
                      bg-gradient-to-r from-[#3abaa8] to-[#232323] bg-clip-text text-transparent
                      hover:text-white hover:bg-gradient-to-r hover:from-[#3abaa8] hover:to-[#232323] hover:bg-clip-padding cursor-pointer
                      ${aboutVisible ? "bounce-in" : "opacity-0"}
                    `}
                  >
                    VUE
                    <div className="relative w-3 md:w-4 lg:w-5 aspect-square">
                      <Image
                        src="/vue.png"
                        alt="vue Icon"
                        fill
                        className="object-contain transition duration-300 group-hover:invert"
                      />
                    </div>
                  </div>

                  <div
                    className={`group lg:text-xl md:text-lg text-sm p-2 shadow-lg rounded-2xl flex items-center gap-2 w-fit transition-all duration-300
                      bg-gradient-to-r from-[#3abaa8] to-[#232323] bg-clip-text text-transparent
                      hover:text-white hover:bg-gradient-to-r hover:from-[#3abaa8] hover:to-[#232323] hover:bg-clip-padding cursor-pointer
                      ${aboutVisible ? "bounce-in" : "opacity-0"}
                    `}
                  >
                    NEXT.JS
                    <div className="relative w-3 md:w-4 lg:w-5 aspect-square">
                      <Image
                        src="/next.png"
                        alt="next Icon"
                        fill
                        className="object-contain transition duration-300 group-hover:invert"
                      />
                    </div>
                  </div>

                  <div
                    className={`group lg:text-xl md:text-lg text-sm p-2 shadow-lg rounded-2xl flex items-center gap-2 w-fit transition-all duration-300
                      bg-gradient-to-r from-[#3abaa8] to-[#232323] bg-clip-text text-transparent
                      hover:text-white hover:bg-gradient-to-r hover:from-[#3abaa8] hover:to-[#232323] hover:bg-clip-padding cursor-pointer
                      ${aboutVisible ? "bounce-in" : "opacity-0"}
                    `}
                  >
                    PHOTOSHOP
                    <div className="relative w-3 md:w-4 lg:w-5 aspect-square">
                      <Image
                        src="/photoshop.png"
                        alt="photoshop Icon"
                        fill
                        className="object-contain transition duration-300 group-hover:invert"
                      />
                    </div>
                  </div>

                  <div
                    className={`group lg:text-xl md:text-lg text-sm p-2 shadow-lg rounded-2xl flex items-center gap-2 w-fit transition-all duration-300
                      bg-gradient-to-r from-[#3abaa8] to-[#232323] bg-clip-text text-transparent
                      hover:text-white hover:bg-gradient-to-r hover:from-[#3abaa8] hover:to-[#232323] hover:bg-clip-padding cursor-pointer
                      ${aboutVisible ? "bounce-in" : "opacity-0"}
                    `}
                  >
                    FIGMA
                    <div className="relative w-3 md:w-4 lg:w-5 aspect-square">
                      <Image
                        src="/figma.png"
                        alt="figma Icon"
                        fill
                        className="object-contain transition duration-300 group-hover:invert"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="service"
          className="scroll-mt-24 2xl:mt-40 md:mt-36 lg:mt-36 md:mb-10 sm:mt-52 mt-40 px-6"
        >
          <style>{`
    @keyframes fade-in-up {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .fade-in-up {
      animation: fade-in-up 1.5s ease-out forwards;
    }
      @keyframes slide-in-left {
    0% {
      opacity: 0;
      transform: translateX(-50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slide-in-right {
    0% {
      opacity: 0;
      transform: translateX(50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .slide-in-left {
    animation: slide-in-left 1s ease-out forwards;
  }

  .slide-in-right {
    animation: slide-in-right 1s ease-out forwards;
  }
  `}</style>

          <div
            ref={serviceRef}
            className={`bg-gradient-to-r from-[#3abaa8] to-[#232323] flex flex-col  justify-center text-center 2xl:px-28 2xl:py-36 xl:py-28 xl:px-24 lg:px-20 lg:py-20 md:px-8 md:py-14 sm:px-7 sm:py-10 px-5 py-8 rounded-[2rem] lg:mx-auto sm:mx-10 mx-5 w-fit text-white transition-all duration-700 ease-out ${
              serviceVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* ✅ เพิ่ม class fade-in-up ชัดเจนเมื่อ serverVisible === true */}
            <h2
              className={`lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold lg:mb-4 mb-2  ${
                serviceAnimate ? "fade-in-up" : ""
              }`}
            >
              Service
            </h2>

            <p
              className={`lg::text-xl md:text-lg sm:text-md text-sm lg:pt-10 pt-5 max-w-2xl transition-all duration-700 ${
                serviceVisible ? "fade-in-up" : ""
              }`}
            >
              HTML/CSS Development: Showcase proficiency in writing clean,
              semantic HTML markup and CSS stylesheets to create visually
              appealing and well-structured web pages.
            </p>

            <div className="flex justify-center 2xl:gap-36 xl:gap-28 lg:gap-24 md:gap-18 sm:gap-14 gap-8 md:pt-10 pt-7">
              {/* กล่อง 1 */}
              <div
                className={`group flex flex-col items-center cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-2xl shadow-lg 2xl:p-6 2xl:px-10 xl:px-8 xl:p-4 lg:px-7 lg:p-3 md:px-6 md:p-2 sm:px-5 sm:p-2 px-3 p-2 w-fit hover:shadow-2xl hover:scale-105 transition duration-300 border border-gray-300 ${
                  serviceVisible ? "slide-in-left" : "opacity-0"
                }`}
              >
                <div
                  className="relative 2xl:w-36 2xl:h-36 xl:w-32 xl:h-32 lg:w-28 lg:h-28 md:w-20 md:h-20 sm:w-14 sm:h-18 w-12 h-14
                "
                >
                  <Image
                    src="/responsive.png"
                    alt="responsive Icon"
                    fill
                    className="object-contain mb-3 transition duration-300"
                  />
                </div>

                <span className="text-black lg:text-lg md:text-md sm:text-sm text-xs font-semibold group-hover:text-[#3abaa8] transition">
                  Responsive
                </span>
              </div>

              {/* กล่อง 2 */}
              <div
                className={`group flex flex-col items-center cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-2xl shadow-lg 2xl:p-6 2xl:px-10 xl:px-8 xl:p-4 lg:px-7 lg:p-3 md:px-7 md:p-3 sm:px-7 sm:p-3 px-5 p-2 w-fit hover:shadow-2xl hover:scale-105 transition duration-300 border border-gray-300 ${
                  serviceVisible ? "slide-in-right" : "opacity-0"
                }`}
              >
                <div className="relative 2xl:w-36 2xl:h-36 xl:w-32 xl:h-32 lg:w-28 lg:h-28 md:w-20 md:h-20 sm:w-14 sm:h-14 w-12 h-14">
                  <Image
                    src="/Design.png"
                    alt="Design Icon"
                    fill
                    className="object-contain mb-3 transition duration-300"
                  />
                </div>
                <span className="text-black lg:text-lg md:text-md sm:text-sm text-xs mt-2 font-semibold group-hover:text-[#3abaa8] transition">
                  Design
                </span>
              </div>
            </div>
          </div>
        </section>

        <style>{`
@keyframes slide-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.slide-in-down {
  animation: slide-in-down 3s ease forwards;
}
 `}</style>
        <section
          id="projects"
          className="2xl:px-10 xl:px-14 lg:px-10 md:px-5 sm:px-32 px-14  lg:mt-5 md:mt-20 sm:mt-40 bg-white text-gray-800"
        >
          <h2 className="xl:text-4xl text-3xl font-bold text-center sm:py-18 py-10 pt-20">
            Projects
          </h2>

          <div className="flex flex-col md:flex-row md:flex-wrap justify-center 2xl:gap-18 md:gap-14 sm:gap-14 gap-10 ">
            {[1, 2, 3].map((num, i) => (
              <div
                key={num}
                ref={projectRefs.current[i]}
                className={`bg-gray-100 rounded-2xl shadow-lg lg:p-6 md:p-8 sm:py-10 sm:px-7 px-5 py-7  w-full max-w-sm flex flex-col items-center text-center hover:shadow-2xl transition duration-300 ${
                  visible[i] ? "slide-in-down" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="relative 2xl:w-[300px] 2xl:h-[200px] xl:w-[230] xl:h-[150] lg:w-[250px] lg:h-[180px] md:w-[250] md:h-[180] sm:w-[280px] sm:h-[190px] w-[230px] h-[140px]">
                  <Image
                    src={`/project${num}.png`}
                    alt={`Project ${num}`}
                    fill
                    className="rounded-xl object-cover mb-4"
                  />
                </div>

                <h3 className="xl:text-xl text-lg font-semibold mt-4">
                  {num === 1
                    ? "Stage website"
                    : num === 2
                    ? "Code writing practice website"
                    : "cookzy"}
                </h3>
                <p className="p-2 text-sm leading-relaxed text-justify">
                  {expandedStates[i]
                    ? fullTexts[i]
                    : getPreviewText(fullTexts[i])}
                </p>
                <button
                  onClick={() => toggleExpand(i)}
                  className="text-[#3abaa8] mt-2 font-semibold hover:underline"
                >
                  {expandedStates[i] ? "less" : "more"}
                </button>

                <div className="flex gap-4 mt-4">
                  <a
                    href={
                      num === 1
                        ? "https://www.figma.com/design/FrNXz7oBN18pjIV021FNgn/Design?node-id=0-1&p=f&t=i95LB8fRbOIyTlUp-0"
                        : num === 2
                        ? "https://www.figma.com/design/cPyGfpF9ZkJYBGb6I80h0O/UX-UI-coding-web-project?node-id=615-482&t=SzBNtwdNRYbTTf70-0"
                        : "https://www.figma.com/design/F2e70oBKFuebGMwn7oogPs/Untitled--Copy-?node-id=0-1&p=f&t=ZuFJCAvK5G9m0fYT-0"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#3abaa8] text-white rounded-xl hover:bg-[#2a9c8f] transition"
                  >
                    Figma
                  </a>
                  <a
                    href={
                      num === 1
                        ? "https://github.com/AranchaiMoonkum/stage-website"
                        : num === 2
                        ? "https://github.com/korarit/coding-web-frontend"
                        : "https://github.com/pskjksr/food"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <style>{`
        @keyframes bounce-in-down {
          0% {
            opacity: 0;
            transform: translateY(-50px);
          }
          60% {
            opacity: 1;
            transform: translateY(20px);
          }
          80% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .bounce-in-down {
          animation: bounce-in-down 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards;
        }
      `}</style>

        <section
          ref={sectionRef}
          id="contact"
          className={`bg-white   scroll-mt-24 xl:my-72 lg:my-60 mt-36 px-6 ${
            animate ? "bounce-in-down" : ""
          }`}
        >
          <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold 2xl:mb-18 lg:mb-14 mb-10 text-black text-center">
            Contact
          </h2>

          <div className="flex justify-center items-center flex-wrap lg:gap-12 xl:gap-14 md:gap-10 sm:gap-8 gap-6 mt-10 2xl:mb-96 xl:mb-72 lg:mb-56 md:mb-40 sm:mb-32 mb-28">
            <a
              href="https://www.facebook.com/phonsinee.kitchaaum"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-9 sm:w-10 md:w-12 2xl:w-20 xl:w-18 lg:w-14 aspect-square">
                <Image
                  src="/f.png"
                  alt="facebook Icon"
                  fill
                  className="object-contain transition duration-300 hover:opacity-70"
                />
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/phonsinee-undefined-163377372/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-9 sm:w-10 md:w-12 2xl:w-20 xl:w-18 lg:w-14 aspect-square">
                <Image
                  src="/in.png"
                  alt="linkedin Icon"
                  fill
                  className="object-contain transition duration-300 hover:opacity-70"
                />
              </div>
            </a>

            <a
              href="https://github.com/66022804"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-9 sm:w-10 md:w-12 2xl:w-20 xl:w-18 lg:w-14 aspect-square">
                <Image
                  src="/github.png"
                  alt="github Icon"
                  fill
                  className="object-contain transition duration-300 hover:opacity-70"
                />
              </div>
            </a>

            <a
              href="https://www.instagram.com/gift._028/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-9 sm:w-10 md:w-12 2xl:w-20 xl:w-18 lg:w-14 aspect-square">
                <Image
                  src="/ig.png"
                  alt="instagram Icon"
                  fill
                  className="object-contain transition duration-300 hover:opacity-70"
                />
              </div>
            </a>

            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=phonsinee20@gmail.com">
              <div className="relative w-9 sm:w-10 md:w-12 2xl:w-20 xl:w-18 lg:w-14 aspect-square">
                <Image
                  src="/gmail.png"
                  alt="gmail Icon"
                  fill
                  className="object-contain transition duration-300 hover:opacity-70"
                />
              </div>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
