import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Lenis from "lenis";

import { IoClose } from "react-icons/io5";
import { motion } from "motion/react";

import { BiSearch } from "react-icons/bi";
import { useWorkStore } from "@/store/useWorkStore";
import { RxUpdate } from "react-icons/rx";
import { worksData } from "@/data/works-data";
import { RevealText } from "@/components/reveal-text";

const menuAnim = {
  initial: { clipPath: "inset(0% 0% 0% 100%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    clipPath: "inset(0% 0% 0% 100%)",
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

export const SearchModal = ({ lenis, work = worksData }) => {
  const { setActiveWork, query, setQuery, closeSearch } = useWorkStore();
  const [randomSuggestions, setRandomSuggestions] = useState(
    () => work?.slice(0, 4) || [],
  );
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

  const suggestions = query
    ? work.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      )
    : randomSuggestions;

  const shuffleSuggestions = () => {
    const arr = [...work];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setRandomSuggestions(arr.slice(0, 4));
  };

  return (
    <>
      <motion.div
        className="fixed right-0 top-0 m-2.5 px-2.5 pt-1 w-full max-w-200 h-[calc(100vh-10px)] 
        bg-bg-s backdrop-blur-3xl z-9999
        max-lg:h-dvh max-lg:w-screen max-lg:m-0 
        will-change-auto"
        variants={menuAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.button
          type="button"
          onClick={closeSearch}
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
          <motion.div
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
          </motion.div>
        </motion.button>
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
          className="size-full overflow-y-scroll"
          ref={scrollRef}
        >
          <div className="mt-25 mb-5 flex flex-col items-start">
            <RevealText
              text="To look for"
              className="mb-5 font-neue font-light
                              text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
                              leading-[.9]"
            />

            <div className="relative w-full max-lg:mb-10">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search for projects..."
                className="w-full p-5 border border-p/10 outline-none 
                font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
              />
              {query ? (
                <span
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-3.5 group"
                >
                  <IoClose
                    className="text-p text-[28px] 
                  hover:scale-110 hover:rotate-90 
                  transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  />
                </span>
              ) : (
                <span className="absolute right-4 top-3.5">
                  <BiSearch className="text-p text-[28px]" />{" "}
                </span>
              )}
            </div>

            <div className="my-10 w-full flex items-start max-lg:flex-col max-lg:gap-5">
              <div className="flex-1">
                <div className="relative left-1 size-fit flex items-center gap-5 max-lg:mb-0">
                  <span className="relative left-1 -top-px size-2 rotate-45 bg-p" />
                  {query === "" ? (
                    <RevealText
                      text="suggestions"
                      className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
                    />
                  ) : (
                    <RevealText
                      text={`${suggestions.length} ${
                        suggestions.length === 1 ? "result" : "results"
                      }`}
                      className="font-chivo font-semibold text-[14px] tracking-widest uppercase text-p leading-[.9]"
                    />
                  )}
                </div>
              </div>
              <div className="flex-[1.25] w-full flex flex-col gap-2.5">
                {suggestions.map((item, i) => (
                  <motion.div
                    key={item.title}
                    layout
                    className="relative w-full group"
                    onClick={() => {
                      setActiveWork(item);
                      closeSearch();
                    }}
                  >
                    <figure
                      className="w-full h-60 overflow-hidden 
                     group max-lg:h-75"
                    >
                      <Image
                        src={item?.heroMedia?.image}
                        width={1000}
                        height={1000}
                        alt=""
                        className="size-full object-cover brightness-90 group-hover:scale-110
           transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                      />

                      <div className="absolute left-5 bottom-5">
                        <RevealText
                          text={item.title}
                          className="mb-2 font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-s
    leading-[.9]"
                          delay={0.1}
                        />

                        <div className="size-fit flex items-center gap-3">
                          <span className="relative left-1 -top-px size-2 rotate-45 bg-s/60" />
                          <RevealText
                            text={item.titleMark}
                            className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-s/60
    leading-[.9]"
                            delay={0.2}
                          />
                        </div>
                      </div>
                    </figure>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <div className="fixed bottom-0 left-0 bg-bg-s p-2.5 w-full">
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#f5f5f5",
            }}
            onClick={() => {
              if (query) {
                setQuery("");
              } else {
                shuffleSuggestions();
              }
            }}
            className="h-15 px-10 w-full bg-p backdrop-blur-2xl 
            flex items-center justify-center gap-5 group"
          >
            <RxUpdate
              className="text-[22px] text-s group-hover:rotate-155 group-hover:text-p
            transition-colors duration-150 ease-[cubic-bezier(0.76,0,0.24,1)]"
            />
            <p
              className="font-azeret font-medium 
            text-s text-[14px] tracking-[0.05em] leading-none uppercase
             group-hover:text-p transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            >
              update suggestions
            </p>
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="fixed left-0 top-0 w-screen h-dvh backdrop-blur-lg bg-p/75 z-900 cursor-pointer"
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={closeSearch}
      />
    </>
  );
};
