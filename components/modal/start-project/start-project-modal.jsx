import { useEffect, useRef, useState } from "react";

import Lenis from "lenis";

import { IoClose } from "react-icons/io5";
import { motion } from "motion/react";

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
  initial: { clipPath: "inset(0% 0% 0% 100%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: "inset(0% 0% 0% 100%)",
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

export const StartProjectModal = ({ lenis, setStartProjectModal }) => {
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
        className="fixed right-0 top-0 m-4 px-5 pt-1 w-full max-w-200 h-[calc(100vh-32px)] 
        bg-bg-s backdrop-blur-3xl rounded-sm z-9999
        max-lg:h-dvh max-lg:p-5 max-lg:w-screen max-lg:m-0 max-lg:rounded-none 
        will-change-auto"
        variants={menuAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          onClick={() => setStartProjectModal(false)}
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
          className="absolute top-5 right-5 z-30 will-change-auto"
        >
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#f5f5f5",
            }}
            className="group size-15 rounded-sm 
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
          <div className="mt-25 h-fit overflow-hidden">
            <motion.h2
              variants={textSlide}
              initial="initial"
              animate="animate"
              className="font-neue font-bold
                          text-p text-[74px] text-start tracking-[-0.05em]
                          leading-none uppercase"
            >
              Start a Project
            </motion.h2>
            <div className="relative mt-8 w-full flex flex-col items-start">
              {/* FULL NAME */}
              <div className="mb-12 w-full flex flex-col items-start">
                <label
                  htmlFor="name"
                  className="mb-4 text-chivo-p-14 uppercase group"
                >
                  Full Name
                </label>

                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      text-chivo-p-14 bg-transparent"
                />
              </div>

              {/* EMAIL + PHONE */}
              <div className="mb-12 w-full grid grid-cols-2 gap-5 max-lg:grid-cols-1">
                <div className="flex flex-col items-start">
                  <label
                    htmlFor="email"
                    className="mb-4 text-chivo-p-14 uppercase"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="w-full p-5 border border-p/10 rounded-sm outline-none
        text-chivo-p-14 group uppercase bg-transparent"
                  />
                </div>

                <div className="flex flex-col items-start">
                  <label
                    htmlFor="phone"
                    className="mb-4 text-chivo-p-14 uppercase"
                  >
                    Phone Number
                  </label>

                  <input
                    type="text"
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-5 border border-p/10 rounded-sm outline-none
        text-chivo-p-14 group uppercase bg-transparent"
                  />
                </div>
              </div>

              {/* COMPANY / STUDIO */}
              <div className="mb-12 w-full flex flex-col items-start">
                <label
                  htmlFor="company"
                  className="mb-4 text-chivo-p-14 uppercase group"
                >
                  Company / Studio
                </label>

                <input
                  type="text"
                  id="company"
                  placeholder="Name of company or office (optional)"
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      text-chivo-p-14 bg-transparent"
                />
              </div>

              {/* PROJECT TYPE */}
              <div className="mb-12 w-full flex flex-col items-start">
                <label
                  htmlFor="projectType"
                  className="mb-4 text-chivo-p-14 uppercase group"
                >
                  Project Type
                </label>

                <select
                  id="projectType"
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      bg-transparent text-chivo-p-14 uppercase"
                >
                  <option value="" className="text-p">
                    Select a category
                  </option>
                  <option value="residential" className="text-p">
                    Residential
                  </option>
                  <option value="commercial" className="text-p">
                    Commercial
                  </option>
                  <option value="corporate" className="text-p">
                    Corporate
                  </option>
                  <option value="hospitality" className="text-p">
                    Hospitality
                  </option>
                  <option value="gastronomy" className="text-p">
                    Gastronomy & Restaurants
                  </option>
                  <option value="retail" className="text-p">
                    Retail & Showroom
                  </option>
                  <option value="conceptual" className="text-p">
                    Conceptual Design
                  </option>
                </select>
              </div>

              {/* DESIRED STYLE */}
              <div className="mb-12 w-full flex flex-col items-start">
                <label
                  htmlFor="style"
                  className="mb-4 text-chivo-p-14 uppercase group"
                >
                  Desired Style
                </label>

                <select
                  id="style"
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      bg-transparent text-chivo-p-14 uppercase"
                >
                  <option value="" className="text-p">
                    Select a style
                  </option>
                  <option value="minimalist" className="text-p">
                    Minimalist
                  </option>
                  <option value="contemporary" className="text-p">
                    Contemporary
                  </option>
                  <option value="industrial" className="text-p">
                    Industrial
                  </option>
                  <option value="luxury" className="text-p">
                    High-End Luxury
                  </option>
                  <option value="organic" className="text-p">
                    Organic Modern
                  </option>
                  <option value="brutalist" className="text-p">
                    Brutalist
                  </option>
                  <option value="japandi" className="text-p">
                    Japandi
                  </option>
                </select>
              </div>

              {/* ESTIMATED AREA */}
              <div className="mb-12 w-full flex flex-col items-start">
                <label
                  htmlFor="area"
                  className="mb-4 text-chivo-p-14 uppercase group"
                >
                  Estimated Area
                </label>

                <input
                  type="text"
                  id="area"
                  placeholder="e.g. 1,200 sq ft / 120m²"
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      text-chivo-p-14 bg-transparent"
                />
              </div>

              {/* INVESTMENT RANGE */}
              <div className="mb-12 w-full flex flex-col items-start">
                <label
                  htmlFor="budget"
                  className="mb-4 text-chivo-p-14 uppercase group"
                >
                  Estimated Investment
                </label>

                <select
                  id="budget"
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      bg-transparent text-chivo-p-14 uppercase"
                >
                  <option value="" className="text-p">
                    Select a range
                  </option>
                  <option value="under20k" className="text-p">
                    Under $20,000
                  </option>
                  <option value="20k-50k" className="text-p">
                    $20,000 — $50,000
                  </option>
                  <option value="50k-100k" className="text-p">
                    $50,000 — $100,000
                  </option>
                  <option value="100k-200k" className="text-p">
                    $100,000 — $200,000
                  </option>
                  <option value="200k+" className="text-p">
                    Above $200,000
                  </option>
                </select>
              </div>

              {/* TIMELINE */}
              <div className="mb-12 w-full flex flex-col items-start">
                <label
                  htmlFor="timeline"
                  className="mb-4 text-chivo-p-14 uppercase group"
                >
                  Desired Timeline
                </label>

                <select
                  id="timeline"
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      bg-transparent text-chivo-p-14 uppercase"
                >
                  <option value="" className="text-p">
                    Select a timeline
                  </option>
                  <option value="immediate" className="text-p">
                    Immediate / Urgent
                  </option>
                  <option value="1-3" className="text-p">
                    1 — 3 months
                  </option>
                  <option value="3-6" className="text-p">
                    3 — 6 months
                  </option>
                  <option value="6+" className="text-p">
                    More than 6 months
                  </option>
                </select>
              </div>

              {/* MESSAGE */}
              <div className="w-full flex flex-col items-start">
                <label
                  htmlFor="details"
                  className="mb-4 text-chivo-p-14 uppercase group"
                >
                  About the Project
                </label>

                <textarea
                  id="details"
                  rows={6}
                  placeholder="Tell us a bit about your space, references, needs, and vision for the project..."
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      resize-none bg-transparent text-chivo-p-14 uppercase placeholder:text-p/50"
                />
              </div>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#f5f5f5",
            }}
            className="my-20 p-5 px-10 w-full bg-p backdrop-blur-2xl rounded-sm group cursor-pointer"
          >
            <p
              className="text-chivo-s-14 uppercase
              group-hover:text-p transition-colors duration-500"
            >
              Submit Project
            </p>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed left-0 top-0 w-screen h-dvh backdrop-blur-lg bg-p/75 z-900 cursor-pointer"
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={() => setStartProjectModal(false)}
      />
    </>
  );
};
