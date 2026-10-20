"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

import { useInView } from "react-intersection-observer";
import { worksData } from "@/data/works-data";
import Image from "next/image";
import { useMousePosition } from "@/hooks/useMousePosition";
import { RevealText } from "@/components/reveal-text";

const textSlideAnim = {
  initial: { y: "100%" },
  animate: {
    y: "0",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.15,
    },
  },
  exit: {
    y: "-100%",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const Works = ({ work, setActiveWork, activeWork, index, setActiveIndex }) => {
  const [hover, setHover] = useState(null);
  const { x, y } = useMousePosition();

  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const yT = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  useEffect(() => {
    const element = container.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveIndex(index);
        }
      },
      {
        threshold: 0.6,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [index, setActiveIndex]);

  return (
    <>
      <div
        id={`work-${work.id}`}
        ref={container}
        className="
          relative top-0 w-full h-screen 
          grid grid-cols-5 p-5 gap-5 group cursor-pointer pointer-events-auto
           max-lg:flex max-lg:flex-col max-lg:items-start max-lg:px-2.5"
        onMouseEnter={() => {
          setHover(work.id);
        }}
        onMouseLeave={() => {
          setHover(null);
        }}
        onClick={() => {
          setHover(null);
          setActiveWork(work);
        }}
      >
        <div
          ref={ref}
          className="absolute size-full col-start-3 flex flex-col items-start justify-center z-20 pointer-events-none"
        >
          <motion.div
            className="h-fit overflow-hidden"
            animate={{
              opacity: activeWork ? 0 : 1,
            }}
          >
            <motion.h2
              initial={{ y: "100%" }}
              animate={{
                y: inView ? 0 : "100%",
                transition: {
                  duration: 0.8,
                  ease: [0.33, 1, 0.68, 1],
                },
              }}
              custom={0}
              className="font-neue font-light text-[clamp(36px,6vw,72px)] text-s text-start tracking-[-7%] leading-[.9]"
            >
              {work.title}
            </motion.h2>
          </motion.div>
          <motion.div
            className="mt-4 h-fit overflow-hidden"
            animate={{
              opacity: activeWork ? 0 : 1,
            }}
          >
            <motion.p
              initial={{ y: "100%" }}
              animate={{
                y: inView ? 0 : "100%",
                transition: {
                  duration: 0.8,
                  delay: 0.25,
                  ease: [0.33, 1, 0.68, 1],
                },
              }}
              custom={0}
              className="max-w-125 font-neue font-normal 
    text-s/60 text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-none"
            >
              {work.location}
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute inset-0 w-screen h-screen z-10 pointer-events-none">
          <div className="relative size-full overflow-hidden">
            <motion.figure
              style={{
                y: yT,
                scale,
              }}
              initial={{
                filter: "brightness(0.5) blur(10px)",
              }}
              animate={{
                filter: inView
                  ? "brightness(1) blur(0px)"
                  : "brightness(0.5) blur(10px)",
              }}
              transition={{
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="absolute inset-0 h-[130%]"
            >
              <Image
                src={work.heroMedia.image}
                width={4000}
                height={4000}
                placeholder="blur"
                className="size-full object-cover brightness-75
                "
                alt="0"
              />
            </motion.figure>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {hover && (
          <motion.div
            className="fixed bg-p/15 rounded-full backdrop-blur-lg border border-s/3 z-1000"
            style={{
              left: x,
              top: y,
              translateX: "-50%",
              translateY: "-50%",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] },
            }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: {
                duration: 0.25,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.1,
              },
            }}
          >
            <motion.div className="size-45 flex items-center justify-center text-center p-2">
              <div className="h-fit overflow-hidden">
                <motion.p
                  className="font-chivo font-semibold text-[14px] tracking-widest uppercase text-s leading-[.9]"
                  {...textSlideAnim}
                >
                  open Project
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HomeWorks = ({ work = worksData, lenis, activeWork, setActiveWork }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const workFeatureFilter = work.filter((item) =>
    item.featured !== undefined ? item.featured : true,
  );

  function handleAnchor(index, item) {
    setActiveIndex(index);

    const element = document.getElementById(`work-${item.id}`);

    if (!element) return;

    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(element, {
        duration: 2,
      });
    } else {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <section
      id="works"
      data-nav-theme="light"
      className="relative pointer-events-none"
    >
      <div
        className="relative top-0 px-5 grid grid-cols-5 z-50 
        max-lg:flex max-lg:flex-col max-lg:items-start max-md:px-0"
      >
        <div className="relative top-15 px-5 col-start-3 size-fit flex items-center gap-4">
          <span className="relative -top-0.5 size-2 rotate-45 bg-s" />
          <RevealText
            text="SELECTED CASE STUDIES"
            className="font-chivo font-semibold 
            text-[14px] tracking-widest uppercase text-s
            leading-[.9]"
          />
        </div>
      </div>

      <div className="absolute inset-0 z-70">
        <div
          className="sticky top-0 h-screen p-5 grid grid-cols-5 
        max-lg:flex max-lg:justify-end max-lg:items-end max-lg:px-5"
        >
          <div className="col-start-3 col-span-full mb-2.5 ml-3 flex items-end gap-15 max-lg:gap-10">
            <div className="w-60 h-15 absolute bottom-1.5 right-[49%] pointer-events-auto z-70"></div>
            {workFeatureFilter.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleAnchor(index, item)}
                className="relative w-2.5 h-2.5 flex items-center justify-center group z-90 pointer-events-auto
               "
              >
                <motion.span
                  animate={{
                    opacity: activeIndex === index ? 1 : 0.5,
                    rotate: activeIndex === index ? 135 : 45,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="absolute w-2.5 h-2.5 bg-bg-s"
                />

                {activeIndex !== index && (
                  <motion.span
                    initial={{
                      opacity: 0,
                      rotate: 45,
                    }}
                    animate={{
                      opacity: 0,
                      rotate: 45,
                    }}
                    whileHover={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    className="absolute -top-0.75 -left-0.75 
                    w-4 h-4 border border-[#FFFFFF]
                    "
                  />
                )}

                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.span
                      key="active"
                      initial={{
                        scale: 0,
                        opacity: 0,
                        rotate: 45,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        rotate: 45,
                      }}
                      exit={{ rotate: 45, scale: 0, opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                      className="absolute -top-0.75 -left-0.75 
                      w-4 h-4 border border-[#FFFFFF]
                      "
                    />
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col items-center justify-center select-none">
        {workFeatureFilter.map((item, index) => (
          <Works
            key={item.id}
            work={item}
            index={index}
            setActiveWork={setActiveWork}
            activeWork={activeWork}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeWorks;
