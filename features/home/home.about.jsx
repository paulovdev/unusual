import Button from "@/components/ui/button";
import reelCover from "@/public/assets/images/home/reel.png";
import { useInView } from "react-intersection-observer";

import TransitionLink from "@/components/ui/link";
import { motion } from "motion/react";
import { IoMdPlay } from "react-icons/io";
import { useRef, useState } from "react";

import Image from "next/image";
import { RevealText } from "@/components/reveal-text";

const HomeAbout = () => {
  const container = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { ref: reelView, inView: reelInView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section
      id="about"
      className="mb-5 w-full h-fit flex flex-col items-start"
      ref={container}
    >
      <div
        className="pt-25 grid grid-cols-5 gap-5 
      max-lg:pt-10 max-lg:flex max-lg:flex-col max-lg:items-start "
      >
        <div
          className="col-span-2 p-5 relative w-full flex items-start justify-start max-lg:order-2"
          ref={reelView}
        >
          <motion.figure
            initial={{
              clipPath: "inset(100% 100% 100% 100%)",
            }}
            animate={{
              clipPath: reelInView
                ? "inset(0% 0% 0% 0%)"
                : "inset(100% 100% 100% 100%)",

              transition: {
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            className="relative w-125 h-full overflow-hidden  
          max-lg:h-100 max-md:h-75 max-xsm:h-65 max-lg:w-full"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();

              const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
              const y = (e.clientY - rect.top - rect.height / 2) * 0.15;

              setMouse({ x, y });
            }}
            onMouseLeave={() => {
              setMouse({ x: 0, y: 0 });
            }}
          >
            <Image
              src={reelCover}
              width={4000}
              height={400}
              className="object-cover size-full brightness-75 "
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                animate={{
                  x: mouse.x,
                  y: mouse.y,
                  scale: 1.1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                }}
                className="size-25 bg-s/10 border border-s/10 
              rounded-full flex items-center justify-center backdrop-blur-md"
              >
                <IoMdPlay className="relative left-0.5 text-s text-[24px]" />
              </motion.span>
            </div>
            <div className="absolute inset-8 flex items-end justify-between max-md:inset-5">
              <p
                className="font-chivo font-semibold 
    text-[14px] tracking-widest leading-none uppercase text-s max-lg:text-[12px] text-end"
              >
                watch reel
              </p>
              <p
                className="font-chivo font-semibold 
    text-[14px] tracking-widest leading-none uppercase text-s max-lg:text-[12px] text-end "
              >
                00:56
              </p>
            </div>
          </motion.figure>
        </div>

        <div className="col-span-3 p-5 w-full flex flex-col items-start max-lg:order-1">
          <div className="flex flex-col items-start " ref={ref}>
            <div className="mb-10 flex items-center gap-4">
              <span className="relative -top-0.5 size-2 rotate-45 bg-p" />
              <RevealText
                text="OUR PHILOSOPHY"
                className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
              />
            </div>
            <RevealText
              text="Unusual develops timeless landmarks shaped by architecture, design and creative landscapes with a deep understanding of contemporary luxury."
              className="mb-10 font-neue font-light
    text-[clamp(36px,6vw,42px)] text-p text-start tracking-[-7%]
    leading-[.9]"
              indent={200}
            />
            <RevealText
              text="Each project begins with a clear vision - to create spaces that balance elegance, privacy and enduring comfort. 
              The result is architecture that is timeless and quietly"
              className="mb-20 font-neue font-light
    text-[clamp(36px,6vw,42px)] text-p text-start tracking-[-7%]
    leading-[.9]"
            />
            <RevealText
              className="mb-10 max-w-125 font-neue  font-normal 
    text-p text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-[1.1]"
              text="Unusual develops timeless landmarks shaped by architecture, design and a deep understanding of contemporary living."
              delay={0.2}
            />
            <TransitionLink href="/studio">
              <Button
                text="learn more"
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
      </div>
    </section>
  );
};

export default HomeAbout;
