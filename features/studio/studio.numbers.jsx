import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
  useScroll,
} from "motion/react";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import numberBg from "@/public/assets/images/about/numbers.png";
import { useInView } from "react-intersection-observer";
import { ClipText } from "@/components/ui/clip-text";
import { RevealText } from "@/components/reveal-text";
import { awards } from "@/data/data";
import { AiOutlinePlus } from "react-icons/ai";

const numbers = [
  {
    number: 75,
    suffix: "+",
    label: "Years of heritage",
    bg: "bg-[#101010]",
  },
  {
    number: 180,
    prefix: "£",
    suffix: "M+",
    label: "Landmarks built",
    bg: "bg-[#202020]",
  },
  {
    number: 300,
    suffix: "+",
    label: "Global awards",
    bg: "bg-[#303030]",
  },
  {
    number: 25,
    suffix: "+",
    label: "Transformed residential environments",
    bg: "bg-[#404040]",
  },
];

function CounterNumber({ value, prefix = "", suffix = "", start }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(count, "change", (latest) => {
    setDisplay(Math.floor(latest));
  });

  useEffect(() => {
    if (!start) return;

    const controls = animate(count, value, {
      duration: 1.8,
      ease: [0.33, 1, 0.68, 1],
    });

    return controls.stop;
  }, [start, value]);

  return (
    <>
      {prefix}
      {display}
      {suffix}
    </>
  );
}

const StudioNumbers = () => {
  const container = useRef(null);
  const [opened, setOpened] = useState(0);

  const handleToggle = (index) => {
    setOpened(opened === index ? null : index);
  };
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section
      id="what-we-do"
      className="relative h-[200vh] p-5 py-15 max-lg:py-10 max-lg:h-[150vh]"
      ref={ref}
    >
      <div className="absolute inset-0 w-screen h-full" ref={container}>
        <Image
          src={numberBg}
          width={3000}
          height={3000}
          alt="numbers-bg"
          placeholder="blur"
          className="size-full object-cover brightness-50"
        />
      </div>
      <div
        className="size-full grid grid-cols-5 
      max-lg:flex max-lg:flex-col max-lg:items-start "
      >
        <div className="col-start-3 col-span-full p-5 max-lg:p-0">
          <div className="mb-10 flex items-center gap-4 max-lg:mb-15">
            <span className="relative -top-0.5 size-2 rotate-45 bg-s" />
            <RevealText
              text="metrics"
              className="font-chivo font-semibold 
             text-[14px] tracking-widest uppercase text-s
             leading-[.9]"
            />
          </div>
          <div className="w-full h-fit grid grid-cols-4 max-md:grid-cols-2">
            {numbers.map((item, i) => {
              const cardY = useTransform(
                scrollYProgress,
                [0, 0.75],
                [`${60 * i}%`, "0%"],
              );
              return (
                <motion.div
                  key={i}
                  style={{ y: cardY }}
                  className={`min-h-100 
                flex flex-col justify-center items-start max-lg:min-h-20`}
                >
                  <div className="h-fit overflow-hidden">
                    <motion.h2
                      initial={{ y: "100%" }}
                      animate={inView ? { y: "0%" } : {}}
                      transition={{
                        duration: 0.8,
                        delay: 0.15 + i * 0.15,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                      className="
                   font-neue font-semibold text-[clamp(36px,6vw,82px)] text-s text-start tracking-[-7%] leading-none
                    will-change-transform max-md:text-[clamp(48px,2vw,42px)]
                  "
                    >
                      <CounterNumber
                        value={item.number}
                        prefix={item.prefix}
                        suffix={item.suffix}
                        start={inView}
                      />
                    </motion.h2>
                  </div>
                  {[item.label].map((phrases, i) => (
                    <div key={i} className="max-w-75">
                      <ClipText
                        text={phrases}
                        animate={inView && "animate"}
                        delay={0.15 * i}
                        tag="h2"
                        className="mt-5 font-neue  font-normal text-start text-s/60 text-[clamp(16px,1.4vw,20px)] tracking-[-0.04em] leading-[1.2]"
                      />
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          style={{ y }}
          className="relative top-40 col-span-2 h-[110vh] max-lg:top-75 max-lg:w-full max-lg:h-full"
        >
          <div
            className="relative size-fit py-15 overflow-hidden bg-bg-p/75 backdrop-blur-md p-5 
          flex flex-col justify-between max-lg:w-full"
          >
            <div className="flex flex-col items-start justify-between">
              <RevealText
                className="font-neue font-light text-[clamp(36px,6vw,72px)] text-s text-start tracking-[-7%] leading-none"
                text="A Quieter"
              />

              <RevealText
                className="ml-15 font-neue font-light text-[clamp(36px,6vw,72px)] text-s text-start tracking-[-7%] leading-none"
                text="Kind of Luxury."
                delay={0.1}
              />
            </div>

            <div className="w-full bg-s/15 h-px mt-10 mb-30 max-lg:mb-5 max-lg:mt-5"></div>

            <div className="w-full flex-1 overflow-y-auto max-lg:h-fit">
              <div className="mb-10 flex items-center gap-4">
                <span className="relative left-1 -top-1 size-2 rotate-45 bg-s max-lg:-top-0.5" />
                <RevealText
                  text="Awards & recognition"
                  className="font-chivo font-semibold text-[14px] tracking-widest uppercase text-s leading-none"
                />
              </div>

              <div className="flex flex-col">
                {awards.map((item, i) => (
                  <div key={i} className="border-b border-s/10">
                    <button
                      onClick={() => handleToggle(i)}
                      className="w-full flex items-center justify-between py-4 cursor-pointer text-left"
                    >
                      <h3
                        className="font-neue  font-normal 
    text-s text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-[1.1]"
                      >
                        {item.title}
                      </h3>
                      <motion.div
                        animate={{ rotate: opened === i ? 45 : 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                      >
                        <AiOutlinePlus className="text-xl text-s" />
                      </motion.div>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: opened === i ? "auto" : 0,
                        opacity: opened === i ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div
                        className="py-5 font-chivo font-semibold 
    text-[14px] tracking-widest  text-s
    leading-[.9] flex flex-col gap-2"
                      >
                        <div className="mb-5 flex flex-col items-start">
                          <RevealText
                            text="Organização:"
                            className="font-chivo font-semibold 
    text-[14px] tracking-widest text-s/60 uppercase
    leading-[.9]"
                            exit={true}
                          />
                          <RevealText
                            text={item.organization}
                            className="mt-2 font-neue  font-normal 
    text-s text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-[1.1]"
                            exit={true}
                          />
                        </div>

                        <div className="flex flex-col items-start ">
                          <RevealText
                            text="Categoria:"
                            className="font-chivo font-semibold 
    text-[14px] tracking-widest text-s/60 uppercase
    leading-[.9]"
                            exit={true}
                          />
                          <RevealText
                            text={item.category}
                            className="mt-2 font-neue  font-normal 
    text-s text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-[1.1]"
                            exit={true}
                          />
                        </div>
                        <RevealText
                          text={item.description}
                          className="mt-5 max-w-150 font-neue  font-normal 
    text-s text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-[1.1]"
                          exit={true}
                        />
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioNumbers;
