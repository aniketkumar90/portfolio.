import React from "react";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Experience from "../components/home/Experience";
import ProjectCarousel from "../components/projects/ProjectCarousel";
import Skills from "../components/home/Skills";
import Education from "../components/home/Education";
import { CertificationsSection, CreativeToolsSection } from "../components/home/Certifications";
import About from "../components/home/About";
import Contact from "../components/home/Contact";

export function Home() {
  return (
    <>
      <div className="section-container home-container">
        <Hero />
        <Stats />
      </div>

      <div className="section-container">
        <Experience />
      </div>

      <div className="section-container">
        <ProjectCarousel />
      </div>

      <div className="section-container">
        <Skills />
      </div>

      <div className="section-container">
        <Education />
      </div>

      <div className="section-container">
        <CertificationsSection />
      </div>

      <div className="section-container">
        <CreativeToolsSection />
      </div>

      <div className="section-container">
        <About />
      </div>

      <div className="section-container">
        <Contact />
      </div>
    </>
  );
}

export default Home;
