import React from "react";
import AboutSection from "../components/home/About";
import Experience from "../components/home/Experience";
import Education from "../components/home/Education";

export function About() {
  return (
    <div className="section-container pt-20 space-y-12">
      <AboutSection />
      <Experience />
      <Education />
    </div>
  );
}

export default About;
