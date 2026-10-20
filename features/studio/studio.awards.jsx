import { useInView } from "react-intersection-observer";

import { motion } from "motion/react";
import { useState } from "react";

import { awards } from "@/data/data";
import { AiOutlinePlus } from "react-icons/ai";

import { RevealText } from "@/components/reveal-text";

const textSlide = {
  initial: { y: "100%" },
  animate: (custom) => ({
    y: "0%",
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
      delay: custom,
    },
  }),
};

const StudioAwards = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const [opened, setOpened] = useState(0);

  const handleToggle = (index) => {
    setOpened(opened === index ? null : index);
  };

  return (
    <section id="about" className="relative p-5 py-15" ref={ref}>
      <div className="grid grid-cols-5 gap-5">
        <div className="col-start-3 col-span-full">
          <div className="size-fit flex items-center gap-4">
            <span className="relative -top-0.5 size-2 rotate-45 bg-p" />
            <p className="text-chivo-p-14 text-end">Awards & recognition</p>
          </div>
          <div className="relative mt-10 w-full">
            <div className="flex flex-col">
              {awards.map((item, i) => (
                <motion.div key={i} className="border-b border-p/5">
                  <button
                    onClick={() => handleToggle(i)}
                    className="w-full flex items-center justify-between py-5 cursor-pointer max-lg:items-start"
                  >
                    <div className="flex items-center gap-10 max-lg:flex-col max-lg:items-start">
                      <div className="h-fit overflow-hidden">
                        <motion.h3
                          variants={textSlide}
                          initial="initial"
                          animate={inView && "animate"}
                          custom={0.5 + 0.15 * i}
                          className=" font-neue font-light
    text-[clamp(36px,6vw,42px)] text-p text-start tracking-[-6%]
    leading-[.9]"
                        >
                          {item.title}
                        </motion.h3>
                      </div>
                    </div>

                    <motion.div
                      animate={{
                        rotate: opened === i ? 45 : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                    >
                      <div className="relative h-fit overflow-hidden max-lg:-top-2">
                        <motion.div
                          variants={textSlide}
                          initial="initial"
                          animate={inView && "animate"}
                          custom={0.15 * i}
                        >
                          <AiOutlinePlus className="text-[42px] text-p max-lg:text-[32px]" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: opened === i ? "auto" : 0,
                      opacity: opened === i ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-5 pb-15 pl-5 max-w-[900px] max-lg:pl-0">
                      <div className="grid grid-cols-1 gap-10 mb-15">
                        <div>
                          <p className="text-chivo-n-14 text-p/50 mb-2">
                            Organização
                          </p>

                          <p className="text-chivo-p-14">{item.organization}</p>
                        </div>

                        <div>
                          <p className="text-chivo-n-14 text-p/50 mb-2">
                            Categoria
                          </p>

                          <p className="text-chivo-p-14">{item.category}</p>
                        </div>

                        <div>
                          <p className="text-chivo-n-14 text-p/50 mb-2">
                            Resultado
                          </p>

                          <p className="text-chivo-p-14">{item.result}</p>
                        </div>
                      </div>
                      <div className="my-10 w-full h-px bg-p/10"></div>
                      <RevealText
                        className="mb-10 max-w-125 font-neue font-normal 
    text-p text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-none"
                        text="Unusual develops timeless landmarks shaped by architecture, design and a deep understanding of contemporary living."
                        animate="animate"
                      >
                        {item.description}
                      </RevealText>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioAwards;
