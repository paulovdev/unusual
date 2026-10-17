"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import reelCover from "@/public/assets/images/about/bg-1.png";
import { RevealText } from "@/components/reveal-text";
import TransitionLink from "@/components/ui/link";
import Button from "@/components/ui/button";

const StudioAbout = () => {
  const { ref: aboutRef, inView: aboutInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="about" ref={aboutRef} className="w-full bg-s text-p">
      <div className="px-5 pt-20 pb-15 max-lg:pt-10">
        <div className="mb-10 flex items-center gap-4">
          <span className="relative -top-0.5 size-2 rotate-45 bg-p" />
          <RevealText
            text="Our story"
            className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
          />
        </div>

        <div
          className="grid grid-cols-5 gap-5 
        max-lg:flex max-lg:flex-col max-lg:items-start "
        >
          <div className="col-span-2 flex flex-col justify-between">
            <div className="flex flex-col items-start">
              <RevealText
                className="font-neue font-light text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%] leading-none"
                text="Spaces that"
              />
              <RevealText
                className="ml-15 font-neue font-light text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%] leading-none"
                text="Stand beyond time."
                delay={0.1}
              />
            </div>

            <div className="mt-40">
              <RevealText
                className="mb-10 max-w-125 font-neue  font-normal 
    text-p text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-[1.1]"
                text="Unusual develops timeless landmarks shaped by architecture, design and a deep understanding of contemporary living."
                delay={0.2}
              />
              <TransitionLink href="/studio">
                <Button
                  text="Discover our approach"
                  bg="bg-p"
                  textColor="text-s"
                  iconColor="text-s"
                  hoverBg="bg-bg-s-2"
                  hoverTextColor="text-p"
                  hoverIconColor="text-p"
                />
              </TransitionLink>
            </div>
          </div>

          <div className="relative overflow-hidden col-start-3 col-span-full h-[75vh] max-lg:w-full max-lg:h-[60vh] max-md:h-[55vh]">
            <Image
              src={reelCover}
              alt="Contemporary architecture with sculptural forms and natural materials"
              priority={false}
              width={12312}
              height={123123}
              placeholder="blur"
              className="object-cover size-full"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-black/45 to-transparent p-5 md:p-7">
              <RevealText
                text="Architecture / 001"
                className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-s
    leading-[.9]"
                delay={0.25}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px my-10 bg-p/10 max-lg:my-0"></div>

      <div
        className="pt-40 w-full grid grid-cols-5
       max-lg:pt-10 max-lg:flex max-lg:flex-col max-lg:items-start "
      >
        <div className="col-start-3 col-span-full px-5 flex flex-col items-start justify-between">
          <RevealText
            text="Unusual develops timeless landmarks shaped by architecture, design and creative landscapes with a deep understanding of contemporary luxury."
            className="mb-10 font-neue font-light
    text-[clamp(36px,6vw,42px)] text-p text-start tracking-[-6%]
    leading-[.9]"
          />
          <RevealText
            className="mb-10 max-w-125 font-neue font-normal 
    text-p text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-[1.1]"
            text="Unusual develops timeless landmarks shaped by architecture, design and a deep understanding of contemporary living."
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
};

export default StudioAbout;
