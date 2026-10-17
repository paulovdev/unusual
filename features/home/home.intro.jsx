import { useRef, useEffect } from "react";
import bgCoverHero from "@/public/assets/images/home/bg.jpg";
import bgCover1 from "@/public/assets/images/home/bg-1.jpg";
import bgCover2 from "@/public/assets/images/home/bg-2.jpg";
import bgCover3 from "@/public/assets/images/home/bg-3.jpg";
import Image from "next/image";

import {
  motion,
  useAnimate,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";

import { MdOutlineArrowDownward } from "react-icons/md";
import { usePreLoader } from "@/store/pageTransition";
import { RevealText } from "@/components/reveal-text";
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

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const HomeIntro = () => {
  const container = useRef(null);
  const {
    isReadyPreLoader,
    hasPlayedPreloader,
    setHasPlayedPreloader,
    setReadyPreLoader,
  } = usePreLoader();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (hasPlayedPreloader) {
      usePreLoader.getState().setReadyPreLoader(true);
      return;
    }

    const run = async () => {
      document.body.style.cursor = "wait";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      await wait(600);

      await Promise.all([
        animate(
          ".loader-image",
          { left: "784px" },
          { duration: 0, ease: "linear" },
        ),
        animate(
          ".loader-reveal-1",
          { clipPath: "inset(0% 0% 0% 0%)" },
          { duration: 1, ease: [0.87, 0, 0.13, 1] },
        ),
        animate(
          ".loader-text",
          { y: 0 },
          { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
        ),
      ]);

      await animate(
        ".loader-reveal-2",
        { clipPath: "inset(0% 0% 0% 0%)" },
        { duration: 1.1, ease: [0.87, 0, 0.13, 1] },
      );

      await animate(
        ".loader-reveal-3",
        { clipPath: "inset(0% 0% 0% 0%)" },
        { duration: 1.2, ease: [0.87, 0, 0.13, 1] },
      );

      await animate(
        ".loader-reveal",
        { clipPath: "inset(0% 0% 0% 0%)" },
        { duration: 1.3, ease: [0.87, 0, 0.13, 1] },
      );

      await wait(300);

      await Promise.all([
        animate(
          ".loader-container",
          { padding: "0px" },
          { duration: 1.5, ease: [0.87, 0, 0.13, 1] },
        ),
        animate(
          ".loader-image",
          {
            filter: "brightness(75%)",
            width: "100vw",
            height: "100vh",
            left: "0px",
            borderRadius: "0rem",
          },
          { duration: 1.5, ease: [0.87, 0, 0.13, 1] },
        ),
        animate(
          ".loader-text",
          { y: -20 },
          { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
        ),
      ]);

      await wait(600);
      setReadyPreLoader(true);

      document.body.style.cursor = "auto";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      setHasPlayedPreloader(true);
    };

    run();
  }, [animate, hasPlayedPreloader, setReadyPreLoader, setHasPlayedPreloader]);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const brightness = useTransform(scrollYProgress, [0, 0.8], ["100%", "0%"]);
  const filter = useMotionTemplate`brightness(${brightness})`;

  return (
    <section
      id="intro"
      className="relative w-full h-dvh overflow-hidden z-20"
      ref={container}
    >
      <motion.div
        className="relative p-5 w-screen h-screen overflow-hidden transform-gpu"
        style={{ y, filter }}
      >
        <div
          ref={scope}
          className="fixed inset-0 bg-bg-s overflow-hidden pointer-events-none select-none
      "
          style={
            hasPlayedPreloader
              ? {
                  background: "transparent",
                }
              : undefined
          }
        >
          <div
            className="loader-container absolute  max-md:p-5 inset-0 
          flex items-center "
            style={
              hasPlayedPreloader
                ? {
                    padding: "0rem",
                  }
                : undefined
            }
          >
            <div
              className="loader-image relative w-100 h-100  overflow-hidden
              max-md:h-75
          "
              style={
                hasPlayedPreloader
                  ? {
                      width: "100vw",
                      height: "100vh",
                      borderRadius: 0,
                      filter: "brightness(75%)",
                    }
                  : undefined
              }
            >
              {/* BG1 */}
              <motion.div
                className="
              loader-reveal-1
              absolute
              inset-0 transform-gpu
            "
                initial={{
                  clipPath: hasPlayedPreloader
                    ? undefined
                    : "inset(100% 0% 0% 0%)",
                }}
              >
                <Image
                  src={bgCover1}
                  alt=""
                  fill
                  priority
                  className="object-cover size-full"
                  placeholder="blur"
                />
              </motion.div>

              {/* BG2 */}
              <motion.div
                className="
              loader-reveal-2
              absolute
              inset-0 transform-gpu
            "
                initial={{
                  clipPath: hasPlayedPreloader
                    ? undefined
                    : "inset(0% 100% 0% 0%)",
                }}
              >
                <Image
                  src={bgCover2}
                  alt=""
                  fill
                  priority
                  className="object-cover size-full"
                  placeholder="blur"
                />
              </motion.div>

              {/* BG3 */}
              <motion.div
                className="
              loader-reveal-3
              absolute
              inset-0 transform-gpu
            "
                initial={{
                  clipPath: hasPlayedPreloader
                    ? undefined
                    : "inset(0% 0% 100% 0%)",
                }}
              >
                <Image
                  src={bgCover3}
                  alt=""
                  fill
                  priority
                  className="object-cover size-full"
                  placeholder="blur"
                />
              </motion.div>

              {/* BG HERO */}
              <motion.div
                className="
              loader-reveal
              absolute
              inset-0 transform-gpu
            "
                initial={{
                  clipPath: hasPlayedPreloader
                    ? undefined
                    : "inset(0% 0% 0% 100%)",
                }}
              >
                <Image
                  src={bgCoverHero}
                  alt=""
                  fill
                  priority
                  className="object-cover size-full"
                />
              </motion.div>
            </div>
          </div>

          <div className="absolute left-196 bottom-7 max-md:bottom-5">
            <div className="w-[calc(100%+15px)] h-fit overflow-hidden ">
              <motion.div
                initial={{ y: 20 }}
                className="loader-text text-chivo-p-14 text-start flex items-center gap-6"
              >
                <span className="relative left-2 -top-px size-2.5 bg-p rotate-45" />
                loading
                <div className="relative -left-4 -top-1 flex items-center">
                  {[0, 1, 2].map((item) => (
                    <motion.span
                      key={item}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: item * 0.2,
                        ease: "easeInOut",
                      }}
                      className="text-[24px]"
                    >
                      .
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 p-5 size-full grid grid-cols-5 
         max-lg:flex max-lg:flex-col max-lg:items-end max-lg:justify-end "
        >
          <div className="relative col-span-full col-start-3 flex flex-col items-start justify-end">
            <ClipText
              animate={isReadyPreLoader && "animate"}
              text="Creators of"
              className="font-neue font-light text-[clamp(36px,6vw,72px)] text-s text-start tracking-[-7%] leading-none"
            />
            <ClipText
              animate={isReadyPreLoader && "animate"}
              text="Refined Living"
              className="ml-15 font-neue font-light text-[clamp(36px,6vw,72px)] text-s text-start tracking-[-7%] leading-none"
            />

            <div className="relative mt-5 ml-15 mb-5 h-fit overflow-hidden ">
              <motion.p
                initial="initial"
                animate={isReadyPreLoader && "animate"}
                custom={0.25}
                variants={textSlide}
                className="font-chivo font-medium text-s 
    text-[14px] tracking-widest leading-none uppercase "
              >
                Living & Iconic Spaces
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeIntro;
