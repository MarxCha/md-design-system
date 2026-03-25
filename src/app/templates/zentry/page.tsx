"use client";

import About from "@/components/templates/zentry/About";
import Hero from "@/components/templates/zentry/Hero";
import NavBar from "@/components/templates/zentry/Navbar";
import Features from "@/components/templates/zentry/Features";
import Story from "@/components/templates/zentry/Story";
import Contact from "@/components/templates/zentry/Contact";
import Footer from "@/components/templates/zentry/Footer";

export default function ZentryPage() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
}
