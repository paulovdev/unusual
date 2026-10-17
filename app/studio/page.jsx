"use client";
import { useEffect, useRef } from "react";

import Nav from "@/components/layout/nav";
import { RevealText } from "@/components/reveal-text";

import StudioAbout from "@/features/studio/studio.about";
import StudioIntro from "@/features/studio/studio.intro";
import StudioNumbers from "@/features/studio/studio.numbers";
import StudioTeam from "@/features/studio/studio.team";
import StudioTestimonials from "@/features/studio/studio.testimonials";
import { usePageTransition } from "@/store/pageTransition";

import Lenis from "lenis";
import Image from "next/image";
import Footer from "@/components/layout/footer";

const capabilities = [
  "Interior Architecture",
  "Bespoke Furniture + Styling",
  "Turnkey Project Management",
  "Architectural Lighting Design",
  "Material + Finish Curation",
  "Spatial Planning + Concept",
  "Residential + Hospitality",
  "Site Supervision + Execution",
];

const expertise = [
  "Creative Direction",
  "Concept Development",
  "Spatial Storytelling",
  "Material Research",
  "Furniture Selection",
  "Lighting Atmosphere",
  "Design Coordination",
  "Project Delivery",
];
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
      <Nav />
      {isReady && (
        <main className="relative bg-bg-s">
          <StudioIntro />
          <StudioAbout />
          <StudioNumbers />

          <div
            className="pt-50 pb-25 p-5 w-full grid grid-cols-5 gap-10
            max-lg:pt-10 max-lg:flex max-lg:flex-col max-lg:items-start "
          >
            <div className="col-span-2">
              <RevealText
                className="mb-10 max-w-125 font-neue  font-normal text-p text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-[1.1]"
                text="We craft timeless spaces shaped by architecture, bespoke design, and a deep understanding of contemporary living."
              />
            </div>

            <div className="col-span-3 flex flex-col justify-between gap-5">
              <div className="flex flex-col items-start w-full">
                <RevealText
                  text="Approach"
                  className="font-neue font-light text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%] leading-[.9]"
                />
                <RevealText
                  text="& Services"
                  className="ml-15 font-neue font-light text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%] leading-[.9]"
                  delay={0.1}
                />

                <RevealText
                  className="mt-8 max-w-125 font-neue  font-normal text-p text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-[1.1]"
                  text="Our practice combines refined aesthetics, intelligent spatial planning, and meticulous material curation to translate ambitious concepts into functional, elevated environments."
                  delay={0.2}
                />
              </div>

              <div className="pt-15 border-t border-p/15 w-full">
                <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
                  <div className="w-full">
                    <div className="mb-10 flex items-center gap-3">
                      <span className="relative -top-0.5 size-2 rotate-45 bg-p" />
                      <RevealText
                        text="What We Do"
                        className="font-chivo font-semibold text-[14px] tracking-widest uppercase text-p leading-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-y-3">
                      {capabilities.map((service, i) => (
                        <RevealText
                          key={service}
                          text={`(${String(i + 1).padStart(2, "0")}) ${service}`}
                          className="font-neue  font-normal text-p text-[clamp(16px,4vw,20px)] tracking-[-0.04em] leading-[1.2]"
                          delay={i * 0.1}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="w-full">
                    <div className=" mb-10 flex items-center gap-3">
                      <span className="relative -top-0.5 size-2 rotate-45 bg-p" />
                      <RevealText
                        text="Our Expertise"
                        className="font-chivo font-semibold text-[14px] tracking-widest uppercase text-p leading-none"
                        delay={0.1}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-y-3">
                      {expertise.map((service, i) => (
                        <RevealText
                          key={service}
                          text={`(${String(i + 1).padStart(2, "0")}) ${service}`}
                          className="font-neue  font-normal text-p text-[clamp(16px,4vw,20px)] tracking-[-0.04em] leading-[1.2]"
                          delay={i * 0.1}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <StudioTeam />
          {/*  <div className="relative w-full h-screen ">
            <figure className="absolute inset-0 overflow-hidden h-screen w-screen">
              <Image
                src={teamCover}
                width={4000}
                height={400}
                className="object-cover size-full brightness-75 "
              />
            </figure>

            <div className="absolute inset-0 grid grid-cols-5 ">
              <div className="pt-10 col-start-3 ">
                <div className="mb-10 flex items-center gap-3">
                  <span className="relative -top-0.5 size-2 rotate-45 bg-s" />
                  <RevealText
                    text="People throughout the practice"
                    className="font-chivo font-semibold text-[14px] tracking-widest uppercase text-s leading-none"
                  />
                </div>
              </div>
            </div>
          </div> */}

          {/*  <StudioTeam lenis={lenisRef} /> */}
          <StudioTestimonials />
        </main>
      )}
      <Footer />
    </>
  );
}
