import { useRef } from "react";
import bgCover from "@/public/assets/images/about/bg-hero.jpg";
import Image from "next/image";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";

import { ClipText } from "@/components/clip-text";

const textSlide = {
  initial: { y: "100%" },
  animate: (custom) => ({
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
      delay: custom,
    },
  }),
};

const StudioIntro = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const brightness = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const filter = useMotionTemplate`brightness(${brightness})`;

  return (
    <section
      id="intro"
      data-nav-theme="light"
      className="relative w-full h-dvh overflow-hidden"
      ref={container}
    >
      <motion.div
        className="relative w-screen h-screen overflow-hidden transform-gpu"
        style={{ y, filter }}
      >
        <div className="absolute inset-0 w-full">
          <motion.figure
            initial={{ scale: 1 }}
            animate={{
              scale: 1.1,
              transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            exit={{ scale: 1 }}
            className="size-full overflow-hidden"
          >
            <Image
              src={bgCover}
              width={4000}
              height={4000}
              alt="home-hero-image"
              className="object-cover size-full brightness-75"
              placeholder="blur"
              priority
            />
          </motion.figure>
        </div>
        <div className="absolute inset-0 p-5 size-full flex items-center justify-center max-lg:px-2.5">
          <div
            className="absolute inset-0 p-5 size-full grid grid-cols-5 
          max-lg:flex max-lg:flex-col max-lg:items-end max-lg:justify-end max-lg:px-2.5"
          >
            <div className="relative col-span-full col-start-3 flex flex-col items-start justify-end">
              <ClipText
                animate="animate"
                text="A Spatial Practice"
                className="font-neue font-light text-[clamp(36px,6vw,72px)] text-s text-start tracking-[-7%] leading-none"
              />
              <ClipText
                animate="animate"
                text="Crafting Silent Luxury"
                className="ml-15 font-neue font-light text-[clamp(36px,6vw,72px)] text-s text-start tracking-[-7%] leading-none"
              />

              <div className="relative mt-5 ml-15 mb-5 h-fit overflow-hidden ">
                <motion.p
                  initial="initial"
                  animate="animate"
                  custom={0.25}
                  variants={textSlide}
                  className="font-chivo font-medium text-s 
    text-[14px] tracking-widest leading-none uppercase "
                >
                  unusual® studio — about
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default StudioIntro;
