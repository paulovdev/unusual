"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Lenis from "lenis";
import { IoClose } from "react-icons/io5";

import Image from "next/image";
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

const ArticleModal = ({ article, isOpen, onClose, lenis }) => {
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

  if (!isOpen || !article) return null;

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
          <ArticleModalContent article={article} />
        </motion.div>

        <div className="fixed right-0 top-0 w-full h-2.5 z-30">
          <motion.div
            className="absolute left-0 top-0 origin-left w-full h-2.5 bg-p z-20"
            style={{ scaleX }}
          />
          <div className="absolute left-0 top-0 w-full h-2.5 bg-[#f0f0ed] z-10" />
        </div>
      </motion.div>

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

export default ArticleModal;

const ArticleModalContent = ({ article }) => {
  return (
    <div className="size-full flex flex-col items-end justify-between max-lg:gap-5">
      <div className="w-full flex flex-col max-lg:mb-5">
        <div className="mt-25 h-fit overflow-hidden max-lg:mt-20 max-lg:mb-5">
          <RevealText
            text={article.publishedAt}
            className="mb-5 font-chivo font-semibold 
text-[14px] tracking-widest uppercase text-p/60
leading-[.9]"
          />
          <RevealText
            text={article.title}
            className="font-neue font-light
                  text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
                  leading-[.9]"
          />
        </div>

        <div className="mt-10 w-full h-px bg-p/15 max-lg:mt-0"></div>
        <div className="mt-10 max-w-200 w-full flex items-start gap-10">
          <div className="flex-1 flex flex-col gap-3 justify-self-end">
            <RevealText
              text="reading time"
              className="font-chivo font-semibold 
            text-[14px] tracking-widest uppercase text-p/60
            leading-[.9]"
            />
            <RevealText
              text="3 min"
              className="font-chivo font-semibold 
            text-[14px] tracking-widest uppercase text-p
            leading-[.9]"
            />
          </div>
          <div className="flex-1 flex flex-col gap-3 justify-self-end">
            <RevealText
              text="published by"
              className="font-chivo font-semibold 
            text-[14px] tracking-widest uppercase text-p/60
            leading-[.9]"
            />
            <RevealText
              text={article.credits}
              className="font-chivo font-semibold 
            text-[14px] tracking-widest uppercase text-p
            leading-[.9]"
            />
          </div>
        </div>
        <figure className="relative mt-15 w-full h-[75vh] overflow-hidden max-lg:h-[40vh] max-lg:mt-5">
          <Image
            src={article.heroMedia.image}
            alt="0"
            className="object-cover brightness-75 size-full"
          />
        </figure>
      </div>

      <div className="w-full flex flex-col">
        {article.sections?.map((block, i) => {
          switch (block._type) {
            case "articleText":
              return <ArticleTextBlock key={i} block={block} />;
            default:
              return null;
          }
        })}
        <div className="mt-15 w-full h-px bg-p/15"></div>
      </div>
    </div>
  );
};

const ArticleTextBlock = ({ block }) => {
  return (
    <div className="my-10 w-full flex max-lg:flex-col max-lg:gap-5">
      <div className="flex-1 max-lg:mb-5">
        <div className="flex items-center gap-5">
          <span className="relative left-1 -top-0.5 size-2 rotate-45 bg-p" />
          <RevealText
            text={block.label}
            className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
            delay={0.1}
          />
        </div>
      </div>

      <div className="relative -top-1 flex-2 flex flex-col">
        {(Array.isArray(block.text) ? block.text : [block.text]).map(
          (phrases, i) => (
            <div key={i} className="max-w-150 mb-5 h-fit overflow-hidden">
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
  );
};
