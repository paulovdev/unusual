"use client";
import { useEffect, useRef } from "react";

import Nav from "@/components/layout/nav";

import StudioAbout from "@/features/studio/studio.about";
import StudioIntro from "@/features/studio/studio.intro";
import StudioNumbers from "@/features/studio/studio.numbers";
import StudioTeam from "@/features/studio/studio.team";
import StudioApproach from "@/features/studio/studio.approach";
import StudioTestimonials from "@/features/studio/studio.testimonials";

import { usePageTransition } from "@/store/pageTransition";
import Lenis from "lenis";

import Footer from "@/components/layout/footer";

export default function StudioHero() {
  const lenisRef = useRef(null);
  const { isReady } = usePageTransition();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Nav lenis={lenisRef} />
      {isReady && (
        <main className="relative bg-bg-s">
          <StudioIntro />
          <StudioAbout />
          <StudioNumbers />
          <StudioApproach />
          <StudioTeam />
          <StudioTestimonials />
        </main>
      )}
      <Footer />
    </>
  );
}
