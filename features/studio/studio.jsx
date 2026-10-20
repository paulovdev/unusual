"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import Nav from "@/components/layout/nav";

import StudioAbout from "@/features/studio/studio.about";
import StudioIntro from "@/features/studio/studio.intro";
import StudioNumbers from "@/features/studio/studio.numbers";
import StudioTeam from "@/features/studio/studio.team";
import StudioApproach from "@/features/studio/studio.approach";
import StudioTestimonials from "@/features/studio/studio.testimonials";
import { TeamModal } from "@/components/modal/team/team-modal";

import { usePageTransition } from "@/store/pageTransition";
import Lenis from "lenis";

import Footer from "@/components/layout/footer";

const canvasPushVariants = {
  expanded: {
    x: "0%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },

  pushedRight: {
    x: "20%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function StudioHero() {
  const lenisRef = useRef(null);
  const { isReady } = usePageTransition();
  const [member, setMember] = useState(null);

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
        <motion.main
          variants={canvasPushVariants}
          animate={member ? "pushedRight" : "expanded"}
          className="relative bg-bg-s"
        >
          <StudioIntro />
          <StudioAbout />
          <StudioNumbers />
          <StudioApproach />
          <StudioTeam lenis={lenisRef} member={member} setMember={setMember} />
          <StudioTestimonials />
        </motion.main>
      )}
      <Footer />

      <AnimatePresence mode="wait">
        {member && (
          <TeamModal
            member={member}
            lenis={lenisRef}
            onClose={() => setMember(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
