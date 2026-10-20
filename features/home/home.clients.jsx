"use client";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { clients } from "@/data/data";
import { RevealText } from "@/components/reveal-text";

const HomeClients = () => {
  const container = useRef(null);
  const [hover, setHover] = useState(null);

  const clients2 = [...clients, ...clients];
  return (
    <section
      id="clients"
      data-nav-theme="dark"
      className="relative mt-15 px-5 overflow-hidden max-lg:px-2.5"
    >
      <div className="w-full h-px bg-p/10"></div>
      <div
        className="pt-50 p-5 w-full grid grid-cols-5 
      max-lg:pt-15 max-lg:flex max-lg:items-start max-lg:px-2.5"
      >
        <div className="col-span-2">
          <RevealText
            text="Trusted"
            className="mb-10 font-neue font-light
            text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
            leading-[.9] max-lg:hidden"
          />
        </div>
        <div className="col-span-3 px-5 flex items-start justify-between max-lg:w-full max-lg:p-0">
          <div className="flex flex-col items-start max-lg:order-1">
            <RevealText
              text="Chosen"
              className="font-neue font-light
            text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
            leading-[.9] max-lg:relative max-lg:-top-1.5"
            />

            <RevealText
              text="by Collectors"
              className="ml-15 font-neue font-light
            text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
            leading-[.9] max-lg:ml-10"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="relative -top-0.5 size-2 rotate-45 bg-p" />
            <RevealText
              text="collaborators"
              className="font-chivo font-semibold 
text-[14px] tracking-widest uppercase text-p
leading-[.9]"
            />
          </div>
        </div>
      </div>
      <div className="relative pt-15 w-full max-lg:pb-0">
        <motion.div
          ref={container}
          className="flex w-max items-center gap-25 max-lg:gap-5 max-md:gap-2.5"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: clients.length * 2.5,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {clients2.map((client, i) => {
            const Icon = client.icon;
            const active = hover === i;

            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="relative flex items-center justify-center h-50"
              >
                <div className="w-30 flex items-center justify-center">
                  <div className="flex flex-row">
                    <Icon
                      className={`ml-30 text-[62px] text-p ${
                        active ? "scale-90" : "scale-100"
                      } transition-all duration-500 max-lg:text-[52px] max-md:text-[42px]`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeClients;
