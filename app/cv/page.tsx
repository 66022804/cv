import React from "react";

export default function Cv() {
  return (
    <>
      {/* Fixed Navbar */}
      <nav className="bg-gray-800 text-white px-6 py-4 fixed w-full top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">MySite</div>
          <ul className="flex space-x-6">
            <li>
              <a href="#home" className="hover:text-yellow-400">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-yellow-400">
                About
              </a>
            </li>
            <li>
              <a href="#server" className="hover:text-yellow-400">
                Server
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-yellow-400">
                Projects
              </a>
            </li>
            <li>
              <a href="#photo" className="hover:text-yellow-400">
                Photo
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-yellow-400">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Page Content */}
      <main className="pt-24 px-6 space-y-24 scroll-smooth">
        <section id="home" className="scroll-mt-24">
          <h2 className="text-3xl font-bold mb-4">Home</h2>
          <p>Welcome to the homepage section.</p>
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
