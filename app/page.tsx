import React from "react";

export default function Cv() {
  return (
    <>
      {/* Fixed Navbar */}
      <nav className="bg-gray-800 text-white px-8 py-6 fixed w-full top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">MySite</div>
          <ul className="flex space-x-6">
            <li>
              <a href="#home" className="hover:text-yellow-400 text-2xl">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-yellow-400 text-2xl">
                About
              </a>
            </li>
            <li>
              <a href="#server" className="hover:text-yellow-400 text-2xl">
                Server
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-yellow-400text-2xl  text-2xl"
              >
                Projects
              </a>
            </li>
            <li>
              <a href="#photo" className="hover:text-yellow-400 text-2xl">
                Photo
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-yellow-400 text-2xl">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Page Content */}
      <main className="pt-24 px-6 space-y-24 scroll-smooth">
        <section id="home" className="scroll-mt-24">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative w-[1500px] h-[1400px] overflow-hidden rounded-lg ">
              {/* ชั้นภาพชัดเจน อยู่ตรงกลางขนาดเต็มกล่อง */}
              <div
                className="absolute inset-12 bg-center bg-cover rounded-lg"
                style={{ backgroundImage: "url('/m.jpg')" }}
              ></div>

              {/* กล่องข้อความอยู่บนสุด */}
              <div className="relative z-10 flex items-center justify-center h-full px-12">
                <div className="ackdrop-blur-md text-white p-8 rounded-lg text-center shadow-xl max-w-md mx-auto">
                  <h2 className="text-3xl font-bold mb-4 ">
                    PHONSINEE KITCHAAUM
                  </h2>
                  <p>Frontend Developer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24">
          <h2 className="text-3xl font-bold mb-4">About</h2>
          <p>This is the about section of your CV.</p>
        </section>

        <section id="server" className="scroll-mt-24">
          <h2 className="text-3xl font-bold mb-4">Server</h2>
          <p>Information about your server or backend.</p>
        </section>

        <section id="projects" className="scroll-mt-24">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p>Showcase your past work or personal projects.</p>
        </section>

        <section id="photo" className="scroll-mt-24">
          <h2 className="text-3xl font-bold mb-4">Photo</h2>
          <p>Gallery or image section.</p>
        </section>

        <section id="contact" className="scroll-mt-24 mb-10">
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <p>Contact information or contact form.</p>
        </section>
      </main>
    </>
  );
}
