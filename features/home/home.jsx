"use client";
import bgCover from "@/public/assets/images/price.jpg";
import HomeIntro from "@/features/home/home.intro";
import { usePageTransition, usePreLoader } from "@/store/pageTransition";
import Lenis from "lenis";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

import Nav from "@/components/layout/nav";
import HomeAbout from "./home.about";
import HomeWorks from "./home.works";
import HomeStatement from "./home.statement";
import HomeClients from "./home.clients";

import Footer from "@/components/layout/footer";
import HomeArticles from "./home.articles";
import HomeCTA from "./home.cta";
import { RevealText } from "@/components/reveal-text";
import Image from "next/image";

const HomeHero = () => {
  const { isReady } = usePageTransition();
  const { isReadyPreLoader } = usePreLoader();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!isReady) return;

    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, [isReady]);

  return (
    <>
      {isReadyPreLoader && <Nav />}
      {isReady && (
        <>
          <motion.main className="relative bg-bg-s">
            <HomeIntro />
            <HomeAbout /> <div className="w-full h-px bg-p/10"></div>
            <div
              className="pt-50 p-5 w-full grid grid-cols-5 
            max-lg:pt-15 max-lg:flex max-lg:items-start"
            >
              <div className="col-span-2">
                <RevealText
                  text="Exceptional"
                  className="mb-10 font-neue font-light
                  text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
                  leading-[.9] max-lg:hidden"
                />
              </div>
              <div className="col-span-3 px-5 flex items-start justify-between max-lg:w-full max-lg:p-0">
                <div className="flex flex-col items-start max-lg:order-1">
                  <RevealText
                    text="Approved"
                    className="font-neue font-light
                  text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
                  leading-[.9] max-lg:relative max-lg:-top-1.5"
                  />

                  <RevealText
                    text="by Visionares"
                    className="ml-15 font-neue font-light
                  text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
                  leading-[.9] max-lg:ml-10"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <span className="relative -top-0.5 size-2 rotate-45 bg-p" />
                  <RevealText
                    text="partners"
                    className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
                  />
                </div>
              </div>
            </div>
            <HomeClients />
            <HomeWorks lenis={lenisRef} />
            <HomeStatement />
            <HomeArticles lenis={lenisRef} />
            {/*   <HomeCTA lenis={lenisRef} /> */}
          </motion.main>
          <Footer />
        </>
      )}
    </>
  );
};

export default HomeHero;
