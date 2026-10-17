import { useInView } from "react-intersection-observer";
import bgCover from "@/public/assets/images/home/bg.jpg";
import { motion } from "motion/react";

import {
  LuFilter,
  LuGlobe,
  LuLampCeiling,
  LuPanelTop,
  LuRuler,
  LuSofa,
} from "react-icons/lu";

import Image from "next/image";
import { RevealText } from "@/components/reveal-text";

const services = [
  {
    id: "01",
    title: "Architectural Planning",
    description:
      "We design layouts, spatial flows, and architectural details that define how each room functions and is experienced.",
    button: "architectural projects",
    href: "/studio",
    icon: LuRuler,
    bg: "bg-[#101010]",
    top: "top-0",
    delay: 0.5,
  },
  {
    id: "02",
    title: "Interior Design",
    description:
      "Creating complete interiors with a perfect balance of materials, proportion, and timeless aesthetic language.",
    button: "exclusive interiors",
    href: "/studio",
    icon: LuPanelTop,
    bg: "bg-[#202020]",
    top: "top-5",
    delay: 0.65,
  },
  {
    id: "03",
    title: "Custom & Styling",
    description:
      "Selecting and curating bespoke furniture, artwork, and decor elements that enhance the identity of your home.",
    button: "custom furniture",
    href: "/studio",
    icon: LuSofa,
    icon2: LuFilter,
    bg: "bg-[#303030]",
    top: "top-10",
    delay: 0.8,
    darkButton: true,
  },
];

const HomeStatement = () => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  return (
    <section
      id="statement"
      data-nav-theme="dark"
      className="w-full h-fit grid grid-cols-5 max-lg:flex max-lg:flex-col max-lg:items-start "
      ref={ref}
    >
      <div className="p-5 col-span-2 size-full flex items-start justify-between max-lg:order-1 max-lg:px-2.5">
        <motion.figure
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{
            clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
            transition: {
              duration: 0.8,
              delay: 0.25,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="relative w-full h-screen bg-bg-p-2 flex items-center justify-center max-lg:h-[75vh] max-md:h-[55vh] 
             will-change-auto"
        >
          <Image
            src={bgCover}
            width={2000}
            height={2000}
            alt="Interior design showpiece"
            className="object-cover w-100 h-100 
         max-md:w-75 max-md:h-75"
            placeholder="blur"
          />
        </motion.figure>
      </div>
      <div
        className="pt-10 p-5 relative w-full col-start-3 col-span-full flex flex-col items-start justify-between
      max-lg:px-2.5"
      >
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col">
            <RevealText
              text="Creating"
              className="font-neue font-light
                  text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
                  leading-[.9]"
            />
            <RevealText
              text="Generational"
              className="ml-15 font-neue font-light
                  text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
                  leading-[.9]"
            />
            <RevealText
              text="Spaces"
              className="font-neue font-light
                  text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
                  leading-[.9]"
            />
          </div>
          <div className="mb-15 flex items-center gap-4">
            <span className="relative -top-0.5 size-2 rotate-45 bg-p" />
            <RevealText
              text="what we do"
              className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
            />
          </div>
        </div>

        <div className="w-full flex flex-col">
          <div className="my-15 w-full h-px bg-p/10 max-lg:my-10"></div>
          <div className="flex items-start justify-between gap-2.5 max-lg:flex-col">
            {services.map((service) => (
              <div
                key={service.id}
                className="w-full  border-p/10 p-2.5 flex flex-col items-start justify-end max-lg:border-b "
              >
                <div className="h-full flex flex-col items-start justify-between">
                  <div className="w-full mb-25 flex items-center justify-between max-lg:mb-15">
                    {service.icon2 ? (
                      <div className="flex items-center gap-2">
                        <div className="p-4">
                          <service.icon className="text-p text-[32px]" />
                        </div>
                        +
                        <div className="p-4">
                          <service.icon2 className="text-p text-[32px]" />
                        </div>
                      </div>
                    ) : (
                      <div className="p-4">
                        <service.icon className="text-p text-[32px]" />
                      </div>
                    )}
                  </div>

                  <div className="max-w-125 flex flex-col items-start">
                    <div className="mb-10 flex items-center gap-4">
                      <span className="relative -top-0.5 size-2 rotate-45 bg-p" />
                      <RevealText
                        text={service.title}
                        className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-p
    leading-[.9]"
                      />
                    </div>

                    <RevealText
                      text={service.description}
                      className="mb-10 font-neue  font-normal 
    text-p text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-[1.1]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeStatement;
