import Image from "next/image";
import { useEffect, useRef } from "react";

import Lenis from "lenis";

import { IoClose } from "react-icons/io5";
import { motion } from "motion/react";

import { FaStarOfLife } from "react-icons/fa";

import TextLink from "@/components/ui/text-link";
import { RevealText } from "@/components/reveal-text";

const menuAnim = {
  initial: { clipPath: "inset(0% 100% 0% 0%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    clipPath: "inset(0% 100% 0% 0%)",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const overlayAnim = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const TeamModal = ({ member, lenis, onClose }) => {
  const scrollRef = useRef(null);
  const modalLenis = useRef(null);
  useEffect(() => {
    lenis?.current?.stop();

    modalLenis.current = new Lenis({
      wrapper: scrollRef.current,
      content: scrollRef.current,
      smoothWheel: true,
      syncTouch: true,
    });

    function raf(time) {
      modalLenis.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      modalLenis.current?.destroy();

      lenis?.current?.start();
    };
  }, [lenis]);
  return (
    <>
      <motion.div
        className="fixed left-0 top-0 m-2.5 px-2.5 pt-1 w-full max-w-200 h-[calc(100vh-10px)]
        bg-bg-s backdrop-blur-3xl z-9999
        max-lg:h-dvh max-lg:w-screen max-lg:m-0 
        will-change-auto"
        variants={menuAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          type="button"
          onClick={onClose}
          initial={{ scale: 0, rotate: -90 }}
          animate={{
            scale: 1,
            rotate: 0,
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2,
            },
          }}
          exit={{
            scale: 0,
            rotate: 90,
            transition: {
              duration: 0.4,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="absolute top-2.5 right-2.5 z-30 group"
        >
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#f5f5f5",
            }}
            className="group size-15  
            backdrop-blur-2xl 
            flex items-center justify-center
            cursor-pointer bg-p"
          >
            <IoClose
              className="text-s text-[24px] group-hover:text-p group-hover:rotate-90
                transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            />
          </motion.button>
        </motion.div>

        <div className="size-full overflow-y-scroll" ref={scrollRef}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            exit={{
              opacity: 0,
              y: 15,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            className="flex flex-col items-end justify-between max-lg:justify-start max-lg:gap-5"
          >
            <div className="w-full flex flex-col max-lg:mb-0">
              <div className="mt-25 h-fit overflow-hidden">
                <RevealText
                  text={member.role}
                  className="relative left-1 mb-4 font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p/60
    leading-[.9]"
                />
                <RevealText
                  text={member.name}
                  className="mb-2 font-neue font-light text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%] leading-none"
                />
              </div>
            </div>

            <div className="mt-10 w-full h-px bg-p/15 max-lg:mt-0"></div>

            <div className="mt-5 w-full min-h-15 flex items-start justify-between max-lg:mt-0 max-lg:min-h-10">
              <div className="w-fit flex justify-start">
                <TextLink bgColor="bg-p" className="">
                  <a
                    target="_blank"
                    href={"https://instagram.com/" + member.email}
                    className="flex-1 font-chivo font-semibold text-[14px] tracking-widest uppercase text-p leading-none truncate group-hover:text-s 
                      transition-colors duration-150 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  >
                    e-mail
                  </a>
                </TextLink>
              </div>

              <div className="w-full flex items-center justify-center">
                <TextLink
                  bgColor="bg-p"
                  className="flex items-center justify-center"
                >
                  <a
                    target="_blank"
                    href={"https://instagram.com/" + member.instagram}
                    className="flex-1  font-chivo font-semibold text-[14px] tracking-widest uppercase text-p leading-none truncate group-hover:text-s 
                      transition-colors duration-150 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  >
                    instagram
                  </a>
                </TextLink>
              </div>

              <div className="flex-1 mt-2 flex items-end justify-end">
                <FaStarOfLife className="text-p text-[16px]" />
              </div>
            </div>

            <div className="relative w-full">
              <figure className="relative w-full h-[50vh] overflow-hidden max-lg:h-[40vh] ">
                <Image
                  src={member.src}
                  alt={member.name}
                  fill
                  sizes=""
                  placeholder="blur"
                  className="object-cover "
                />
              </figure>
            </div>

            <div
              className="border-b border-p/10 py-10 w-full flex items-start
       max-lg:flex-col max-lg:items-start max-lg:gap-5 max-lg:py-5"
            >
              <div className="flex-1">
                <div className="mb-2.5 flex items-center gap-5">
                  <span className="relative -top-0.5 left-1 size-2 rotate-45 bg-p" />
                  <RevealText
                    text="bio"
                    className="font-chivo font-semibold 
                    text-[14px] tracking-widest uppercase text-p
                    leading-[.9]"
                  />
                </div>
              </div>
              <div className="flex-2 flex flex-col">
                {(Array.isArray(member.bio) ? member.bio : [member.bio]).map(
                  (phrases, i) => (
                    <div
                      key={i}
                      className="max-w-150 mb-5 h-fit overflow-hidden"
                    >
                      <RevealText
                        text={phrases}
                        className="mb-10 font-neue font-normal 
    text-p text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-none"
                        delay={0.2}
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="fixed left-0 top-0 w-screen h-dvh backdrop-blur-lg bg-p/75 z-900 cursor-pointer"
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
      />
    </>
  );
};
