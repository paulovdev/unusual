import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useInView } from "react-intersection-observer";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { testimonials } from "@/data/data";
import { useState } from "react";
import { RevealText } from "@/components/reveal-text";

const Card = ({ testimonial, inView }) => {
  return (
    <motion.div
      className="w-full h-[60vh] mb-5 grid grid-cols-5 gap-5
     max-lg:flex max-lg:flex-col max-lg:items-start max-lg:h-fit"
    >
      <div
        className="relative -top-15 col-span-2 w-full flex items-start justify-start
      max-lg:top-0 max-lg:order-1"
      >
        <motion.figure
          initial={{
            clipPath: "inset(0% 100% 0% 0%)",
          }}
          animate={{
            clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",

            transition: {
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          exit={{
            clipPath: "inset(0% 100% 0% 0%)",
          }}
          className="relative w-125   overflow-hidden  
                  max-md:h-75 max-xsm:h-65"
        >
          <Image
            src={testimonial.spaceImg}
            width={2222}
            height={22222}
            alt={testimonial.client}
            className="object-cover brightness-75"
            placeholder="blur"
          />
        </motion.figure>
      </div>

      <motion.div
        className="col-span-3 col-start-3 p-5 w-full flex flex-col items-start justify-between 
      max-lg:p-0"
      >
        <div className="flex-4">
          <motion.figure
            initial={{
              clipPath: "inset(0% 100% 0% 0%)",
            }}
            animate={{
              clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",

              transition: {
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            exit={{
              clipPath: "inset(0% 100% 0% 0%)",
            }}
            className="mb-10 overflow-hidden size-30 rounded-full max-lg:size-20 max-lg:mb-0"
          >
            <Image
              src={testimonial.clientImg}
              width={250}
              height={250}
              alt={testimonial.client}
              className="relative object-cover brightness-75"
              placeholder="blur"
            />
          </motion.figure>
          <RevealText
            text={testimonial.text}
            className="font-neue font-light
    text-[clamp(36px,6vw,42px)] text-p text-start tracking-[-7%]
    leading-[.9] max-lg:mb-15"
            indent={100}
            exit={true}
          />
        </div>
        <div className="flex-1 w-full flex items-center justify-between ">
          <RevealText
            text={testimonial.space}
            className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9] "
            exit={true}
          />
          <RevealText
            text={testimonial.client}
            className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9] "
            exit={true}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const StudioTestimonials = () => {
  const [index, setIndex] = useState(0);

  const canGoPrev = index > 0;
  const canGoNext = index < testimonials.length - 1;

  const handleNext = () => {
    if (!canGoNext) return;
    setIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!canGoPrev) return;
    setIndex((prev) => prev - 1);
  };

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  return (
    <section id="about" className="px-5 pt-20 max-lg:pt-10 " ref={ref}>
      <div
        className="w-full grid grid-cols-5 
      max-lg:flex max-lg:flex-col max-lg:items-start "
      >
        <div
          className="col-start-3 px-5 col-span-full flex items-start justify-between 
        max-lg:p-0 max-lg:w-full max-lg:mb-5"
        >
          <div className="size-fit flex items-center gap-5">
            <span className="relative -top-0.5 left-1 size-2 rotate-45 bg-p" />
            <RevealText
              text="testimonials"
              className="font-chivo font-semibold text-p 
    text-[14px] tracking-widest leading-none uppercase"
            />
          </div>
          <div className="flex items-center gap-5">
            <motion.button
              whileTap={canGoPrev ? { scale: 0.95 } : {}}
              whileHover={
                canGoPrev
                  ? {
                      scale: 1.1,
                      backgroundColor: "rgba(255,255,255,0.8)",
                    }
                  : {}
              }
              disabled={!canGoPrev}
              className={`group size-15  
            border border-p/10 backdrop-blur-2xl 
            flex items-center justify-center
            cursor-pointer
    ${canGoPrev ? "bg-p cursor-pointer" : "bg-p/50 cursor-not-allowed opacity-50"}
  `}
              onClick={handlePrev}
            >
              <GoArrowLeft
                className={`${canGoPrev ? "text-s group-hover:text-p" : "text-s opacity-50"} 
              text-[24px] transition-colors duration-500`}
              />
            </motion.button>

            <motion.button
              whileTap={canGoNext ? { scale: 0.95 } : {}}
              whileHover={
                canGoNext
                  ? {
                      scale: 1.1,
                      backgroundColor: "rgba(255,255,255,0.8)",
                    }
                  : {}
              }
              disabled={!canGoNext}
              className={`group size-15  
            border border-p/10 backdrop-blur-2xl 
            flex items-center justify-center
            cursor-pointer 
    ${canGoNext ? "bg-p cursor-pointer" : "bg-p/50 cursor-not-allowed opacity-50"}
  `}
              onClick={handleNext}
            >
              <GoArrowRight
                className={`${canGoNext ? "text-s group-hover:text-p" : "text-s opacity-50"}
               text-[24px] transition-colors duration-500`}
              />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <Card
          key={index}
          index={index}
          testimonial={testimonials[index]}
          inView={inView}
        />
      </AnimatePresence>
    </section>
  );
};

export default StudioTestimonials;
