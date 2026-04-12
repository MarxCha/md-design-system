"use client";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

import "@/components/templates/gsap-cocktails/gsap-cocktails.css";
import {
  Navbar,
  Hero,
  Cocktails,
  About,
  Art,
  Menu,
  Contact,
} from "@/components/templates/gsap-cocktails";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function GsapCocktailsPage() {
  return (
    <div className="gsap-cocktails-template">
      <main className="relative">
        <Navbar />
        <Hero />
        <Cocktails />
        <About />
        <Art />
        <Menu />
        <Contact />
      </main>
    </div>
  );
}
