"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Lenis from "lenis";
import { IoClose } from "react-icons/io5";

import { FaStarOfLife } from "react-icons/fa";
import TextLink from "@/components/ui/text-link";
import { MdOutlineFileDownload } from "react-icons/md";
import Image from "next/image";
import { ClipText } from "@/components/clip-text";
import { RevealText } from "@/components/reveal-text";

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

const menuAnim = {
  initial: { clipPath: "inset(0% 100% 0% 0%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: "inset(0% 100% 0% 0%)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

const overlayAnim = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

const WorkModal = ({ work, isOpen, onClose, lenis }) => {
  const container = useRef(null);
  const scrollRef = useRef(null);
  const modalLenis = useRef(null);

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 500,
    damping: 50,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, lenis]);

  if (!isOpen || !work) return null;

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 m-2.5 px-2.5 pt-1 w-full max-w-200 h-[calc(100vh-10px)] 
        bg-bg-s backdrop-blur-3xl z-9999
        max-lg:h-dvh max-lg:w-screen max-lg:m-0 
        will-change-auto"
        ref={container}
        variants={menuAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
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
          className="absolute top-2.5 right-2.5 z-30 will-change-auto"
        >
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#f5f5f5",
            }}
            className="group size-15 backdrop-blur-2xl flex items-center justify-center cursor-pointer bg-p"
          >
            <IoClose
              className="text-s text-[24px] group-hover:text-p group-hover:rotate-90
                transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            />
          </motion.button>
        </motion.div>

        <motion.div
          ref={scrollRef}
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
          className="size-full overflow-y-scroll"
        >
          <WorkModalContent work={work} />
        </motion.div>

        <div className="fixed right-0 top-0 w-full h-2.5 z-30">
          <motion.div
            className="absolute left-0 top-0 origin-left w-full h-2.5 bg-p z-20"
            style={{ scaleX }}
          />
          <div className="absolute left-0 top-0 w-full h-2.5 bg-[#f0f0ed] z-10" />
        </div>
      </motion.div>

      {/* OVERLAY */}
      <motion.div
        className="fixed inset-0 bg-p/75 backdrop-blur-lg z-900 cursor-pointer"
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
      />
    </>
  );
};

export default WorkModal;

const WorkModalContent = ({ work }) => {
  return (
    <div className="size-full flex flex-col items-end justify-between max-lg:gap-5">
      <div className="w-full flex flex-col max-lg:mb-5">
        <div className="mt-25 h-fit overflow-hidden max-lg:mt-20 max-lg:mb-5">
          <p className="mb-4 text-chivo-p-14">{work.year}</p>

          <motion.h2
            variants={textSlide}
            initial="initial"
            animate="animate"
            className="font-neue font-light
                  text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
                  leading-[.9]"
          >
            {work.title}
            {/*   <span
              className="
                relative font- top-1.5 left-2 align-top text-[28px]
                tracking-[0.3em]
                max-lg:top-1
              "
            >
              {work.titleMark}
            </span> */}
          </motion.h2>
        </div>
        <div className="mt-10 w-full h-px bg-p/10 max-lg:mt-0"></div>

        <div className="mt-10 max-w-200 w-full flex items-start gap-10">
          <div className="flex-2 flex flex-col gap-3">
            <p className="text-chivo-n-14 text-p/50">Scope</p>
            <p className="text-chivo-p-14">{work.scope}</p>
          </div>
          <div className="flex-2 flex flex-col gap-3">
            <p className="text-chivo-n-14 text-p/50">Location</p>
            <p className="text-chivo-p-14">{work.location}</p>
          </div>
          <div className="flex-2 flex flex-col gap-3 justify-self-end">
            <p className="text-chivo-n-14 text-p/50">Services</p>
            {work.services.map((ser, i) => (
              <p key={i} className="text-chivo-p-14">
                {ser}
              </p>
            ))}
          </div>
        </div>

        <figure className="relative mt-15 w-full h-[75vh] overflow-hidden max-lg:h-[60vh] max-lg:mt-5">
          <Image
            src={work.heroMedia.image}
            className="object-cover brightness-75 size-full"
          />
        </figure>

        <div className="mt-2.5 w-full grid grid-cols-2 gap-2.5">
          <div className="w-full flex flex-col items-start gap-5">
            <div className="w-full h-80 border border-p/10 flex flex-col items-center justify-center max-lg:h-60 max-md:h-50">
              <RevealText
                text={work.duration}
                className="mb-10 font-neue font-light text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%] leading-none"
                delay={0.1}
              />

              <RevealText
                text="weeks of construction"
                className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
                delay={0.1}
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-5">
            <div className="w-full h-80 border border-p/10 flex flex-col items-center justify-center max-lg:h-60 max-md:h-50">
              <RevealText
                text={work.size}
                className="mb-10 font-neue font-light text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%] leading-none"
                delay={0.2}
              />
              <RevealText
                text="square meters"
                className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
                delay={0.2}
              />
            </div>
          </div>
        </div>

        <div className="mt-2.5 w-full flex flex-col items-center gap-5">
          <div className="w-full h-75 border border-p/10 flex flex-col items-center justify-center max-lg:h-60 max-md:h-50">
            <RevealText
              text={work.conclusion}
              className="mb-10 font-neue font-light text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%] leading-none"
              delay={0.3}
            />
            <RevealText
              text="Completion"
              className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
              delay={0.3}
            />
          </div>
        </div>
      </div>

      {/* BLOCKS */}
      <div className="w-full flex flex-col">
        {work.sections?.map((block, i) => {
          switch (block._type) {
            case "workImage":
              return <WorkImageBlock key={i} block={block} />;
            case "workText":
              return <WorkTextBlock key={i} block={block} />;
            default:
              return null;
          }
        })}

        <div className="my-15 w-full h-px bg-p/10"></div>

        <div className="w-full flex items-start max-lg:flex-col">
          <div className="w-full flex-1 max-lg:mb-10">
            <div className="flex items-center gap-5">
              <span className="triangle-p left-1" />
              <RevealText
                text="blueprint download"
                className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
                delay={0.6}
              />
            </div>
          </div>

          <div className="relative -top-1 flex-2 w-full flex flex-col items-start gap-2.5">
            {[
              "Interior Blueprint",
              "Exterior Blueprint",
              "Lighting Blueprint",
            ].map((blueprintName, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 1.1 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#f5f5f5",
                }}
                className="h-15 px-5 w-full bg-p backdrop-blur-2xl flex items-center justify-between group cursor-pointer"
              >
                <p className="text-chivo-n-14 text-s group-hover:text-p transition-colors duration-500 uppercase">
                  {blueprintName}
                </p>
                <div className="flex items-center gap-2 underline underline-offset-2 text-s group-hover:text-p transition-colors duration-500">
                  <MdOutlineFileDownload className="text-s text-[20px] group-hover:text-p transition-colors duration-500" />
                  <p className="text-chivo-n-14 text-s group-hover:text-p transition-colors duration-500 uppercase">
                    download pdf
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="my-10 w-full h-px bg-p/10"></div>

        <div className="w-full min-h-20 flex items-start justify-between">
          <div className="flex-2 flex flex-col gap-3">
            <p className="text-chivo-n-14 text-p/75">Client</p>
            <TextLink bgColor="bg-p" className="relative -left-1">
              <a
                target="_blank"
                rel="noreferrer"
                href={"https://instagram.com/" + work.client}
                className="text-end text-chivo-n-14 text-p group-hover:text-s transition-colors duration-150"
              >
                {work.client}
              </a>
            </TextLink>
          </div>

          <div className="flex-1 pb-5 flex flex-col gap-3">
            <p className="text-chivo-n-14 text-p/75">Collaborators</p>
            <div className="flex flex-col items-start justify-center">
              {work.credits.map((item, i) => (
                <div className="flex items-center" key={i}>
                  <TextLink bgColor="bg-p">
                    <span className="text-chivo-n-14 text-p text-start group-hover:text-s transition-colors duration-150">
                      {item}
                    </span>
                  </TextLink>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 mt-2 flex items-end justify-end max-md:hidden">
            <FaStarOfLife className="text-[14px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkImageBlock = ({ block }) => {
  return (
    <figure className="relative mt-2.5 w-full h-[75vh] overflow-hidden max-lg:h-[40vh] max-lg:mt-5">
      <Image
        src={block.image}
        className="object-cover brightness-75 size-full"
      />
      {block.overlayText && (
        <p className="absolute bottom-5 right-5 text-chivo-s-14">
          {block.overlayText}
        </p>
      )}
    </figure>
  );
};

const WorkTextBlock = ({ block }) => {
  return (
    <div className="my-10 w-full flex max-lg:flex-col max-lg:gap-5">
      <div className="flex-1 max-lg:mb-5">
        <div className="flex items-center gap-5">
          <span className="triangle-p left-1" />
          <RevealText
            text={block.label}
            className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
            delay={0.4}
          />
        </div>
      </div>

      <div className="relative -top-1 flex-2 flex flex-col">
        {(Array.isArray(block.text) ? block.text : [block.text]).map(
          (phrases, i) => (
            <div key={i} className="max-w-150 mb-5 h-fit overflow-hidden">
              <RevealText
                text={phrases}
                className="mb-10 font-neue font-medium text-[clamp(18px,6vw,22px)] text-p text-start tracking-[-4%] leading-none"
                delay={0.5}
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
};
