import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { IoClose } from "react-icons/io5";
import { motion } from "motion/react";
import { useWorkStore } from "@/store/useWorkStore";
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

export const FiltersModal = ({ lenis }) => {
  const scrollRef = useRef(null);
  const modalLenis = useRef(null);
  const {
    activeYear,
    setActiveYear,
    activeScope,
    setActiveScope,
    activeServices,
    setActiveServices,
    activeFeatured,
    setActiveFeatured,
    closeFilters,
    resetFilters,
  } = useWorkStore();

  const years = ["all", "2026", "2025", "2024", "2023"];

  const categories = [
    {
      label: "Residential Interior Design",
      value: "residential-interior-design",
    },
    {
      label: "Penthouse Renovation",
      value: "penthouse-renovation",
    },
    {
      label: "Commercial Architecture",
      value: "commercial-architecture",
    },
    {
      label: "Furniture & Styling",
      value: "furniture-styling",
    },
  ];

  const services = [
    {
      label: "Interior Design",
      value: "interior-design",
    },
    {
      label: "Custom Furniture",
      value: "custom-furniture",
    },
    {
      label: "Lighting Design",
      value: "lighting-design",
    },
    {
      label: "Architectural Planning",
      value: "architectural-planning",
    },
    {
      label: "Styling",
      value: "styling",
    },
    {
      label: "Art Curation",
      value: "art-curation",
    },
  ];

  const yearLabel = (y) => {
    if (y === "all") return "All";
    return y;
  };

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

  const resetAll = () => {
    resetFilters();
  };

  const Item = ({ label, active, onClick }) => (
    <button onClick={onClick} className="flex items-center gap-2 uppercase">
      <RevealText
        text={label}
        className={`font-chivo font-semibold 
    text-[14px] tracking-widest uppercase 
    leading-[.9]
           ${active ? "text-p" : "text-p/60 hover:text-p/75"}`}
        delay={0.1}
      />
      {active && (
        <span className="relative -top-px size-3.5 rounded-full border border-p flex justify-center items-center">
          <IoClose className="text-p text-[14px]" />
        </span>
      )}
    </button>
  );

  const ItemYear = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`p-2 size-35 rounded-full group
         ${active ? "bg-p" : "border border-p/10 hover:bg-p"} 
        flex items-center justify-center gap-2 uppercase 
        transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] max-lg:size-30 max-md:size-20`}
    >
      <span
        className={`text-chivo-n-14 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
           ${active ? "text-s" : "text-p/50 group-hover:text-s"}`}
      >
        {label}
      </span>
    </button>
  );

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
        {/* Close Button */}
        <motion.button
          type="button"
          onClick={closeFilters}
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

        {/* Scroll Container */}
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
          className="relative size-full overflow-y-scroll flex flex-col justify-between"
          ref={scrollRef}
        >
          <div className="mb-15 flex flex-col items-start">
            {/* Modal Title */}
            <div className="mt-25 h-fit overflow-hidden max-lg:mb-5">
              <RevealText
                text="Filters"
                className="mb-5 font-neue font-light
                text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
                leading-[.9]"
              />
            </div>
            <div className="my-5 w-full h-px bg-p/15"></div>

            {/* CATEGORY (SCOPE) */}
            <div className="w-full flex items-start max-lg:flex-col max-lg:gap-5">
              <div className="flex-1 max-lg:mb-5">
                <div className="size-fit flex items-center gap-5">
                  <span className="relative left-1 -top-0.5 size-2 rotate-45 bg-p" />
                  <RevealText
                    text="category"
                    className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
                    delay={0.1}
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                {categories.map((cat) => (
                  <Item
                    label={cat.label}
                    active={activeScope.includes(cat.value)}
                    onClick={() => setActiveScope(cat.value)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-p/10 mt-15 mb-5" />

            {/* YEAR */}
            <div className="w-full flex items-start flex-col max-lg:gap-5">
              <div className="mb-10">
                <div className="size-fit flex items-center gap-5">
                  <span className="relative left-1 -top-0.5 size-2 rotate-45 bg-p" />
                  <RevealText
                    text="year"
                    className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
                    delay={0.1}
                  />
                </div>
              </div>
              <div className="w-full flex items-center justify-between gap-2.5">
                {years.map((y) => (
                  <ItemYear
                    label={yearLabel(y)}
                    active={activeYear === y}
                    onClick={() => setActiveYear(y)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-p/10 mt-15 mb-5" />

            {/* SERVICES */}
            <div className="w-full flex items-start max-lg:flex-col max-lg:gap-5">
              <div className="flex-1 max-lg:mb-5">
                <div className="size-fit flex items-center gap-5">
                  <span className="relative left-1 -top-0.5 size-2 rotate-45 bg-p" />
                  <RevealText
                    text="services"
                    className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
                    delay={0.1}
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                {services.map((service) => (
                  <Item
                    label={service.label}
                    active={activeServices.includes(service.value)}
                    onClick={() => setActiveServices(service.value)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-p/10 my-5 max-lg:mb-15" />

            {/* FEATURED */}
            <div className="mb-15 w-full flex items-start max-lg:flex-col max-lg:gap-5">
              <div className="flex-1 max-lg:mb-5">
                <div className="size-fit flex items-center gap-5">
                  <span className="relative left-1 -top-0.5 size-2 rotate-45 bg-p" />
                  <RevealText
                    text="featured"
                    className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
                    delay={0.1}
                  />
                </div>
              </div>

              <div className="flex-1">
                <Item
                  label="Featured projects"
                  active={activeFeatured}
                  onClick={() => setActiveFeatured(!activeFeatured)}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fixed Footer */}
        <div className="fixed bottom-0 left-0 bg-bg-s p-2.5 w-full">
          <div className="flex items-center justify-between gap-5">
            <motion.button
              whileTap={{ scale: 1.1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#f5f5f5",
              }}
              onClick={resetAll}
              className="h-15 px-10 w-full bg-p backdrop-blur-2xl group"
            >
              <p className="text-chivo-n-14 text-s group-hover:text-p transition-colors duration-500">
                clear
              </p>
            </motion.button>

            <motion.button
              whileTap={{ scale: 1.1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#000",
              }}
              onClick={closeFilters}
              className="h-15 px-10 w-full bg-bg-s-2 backdrop-blur-2xl group"
            >
              <p className="text-chivo-p-14 group-hover:text-s transition-colors duration-500">
                apply
              </p>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Overlay Backdrop */}
      <motion.div
        className="fixed left-0 top-0 w-screen h-dvh backdrop-blur-lg bg-p/75 z-900 cursor-pointer"
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={closeFilters}
      />
    </>
  );
};
