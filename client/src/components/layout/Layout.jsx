import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SceneFX from "../home/SceneFX";

export function Layout({ children, onOpenAdmin }) {
  return (
    <div className="portfolio-page min-h-screen text-ink relative">
      <Navbar onOpenAdmin={onOpenAdmin} />
      <div className="bg-grid" aria-hidden />
      <SceneFX />

      <main className="relative z-10">{children}</main>

      <Footer />
    </div>
  );
}

export default Layout;
