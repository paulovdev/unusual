import { useInView } from "react-intersection-observer";
import pillarsCover from "@/public/assets/images/home/pillars.png";
import { motion } from "motion/react";

import { LuRuler, LuPanelTop, LuSofa, LuFilter } from "react-icons/lu";

import Image from "next/image";
import { RevealText } from "@/components/reveal-text";
import TransitionLink from "@/components/ui/link";
import Button from "@/components/ui/button";

const pillarsData = [
  {
    id: "01",
    title: "Volume & Scale",
    description:
      "Sculpting layout balance, structural harmony, and natural light channels to build raw architectural foundations.",
    button: "explore space",
    href: "/studio",
    icon: LuRuler,
    bg: "bg-[#101010]",
    top: "top-0",
    delay: 0.5,
  },
  {
    id: "02",
    title: "Tactile Atmosphere",
    description:
      "Curating refined material palettes, organic finishes, and light interactions that give living areas an ethereal presence.",
    button: "view interiors",
    href: "/studio",
    icon: LuPanelTop,
    bg: "bg-[#202020]",
    top: "top-5",
    delay: 0.65,
  },
  {
    id: "03",
    title: "Bespoke Curation",
    description:
      "Designing custom joinery, sourcing collector items, and positioning art pieces that complete the spatial narrative.",
    button: "discover curation",
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
            src={pillarsCover}
            width={2000}
            height={2000}
            alt="Interior design showpiece"
            className="object-cover w-125 h-125 
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
              text="Curating "
              className="font-neue font-light
  text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
  leading-[.9]"
            />
            <RevealText
              text="Sculpting Modern"
              className="ml-15 font-neue font-light
  text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
  leading-[.9]"
            />
            <RevealText
              text="Silent Proportions"
              className="font-neue font-light
  text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%]
  leading-[.9]"
            />
          </div>
          <div className="mb-15 flex items-center gap-4">
            <span className="relative -top-0.5 size-2 rotate-45 bg-p" />
            <RevealText
              text="our pillars"
              className="font-chivo font-semibold 
text-[14px] tracking-widest uppercase text-p
leading-[.9]"
            />
          </div>
        </div>

        <div className="w-full flex flex-col">
          <div className="my-15 w-full h-px bg-p/10 max-lg:my-10"></div>
          <div className="flex items-start justify-between gap-2.5 max-lg:flex-col">
            {pillarsData.map((item) => (
              <div
                key={item.id}
                className="w-full border-p/10 p-2.5 flex flex-col items-start justify-end max-lg:border-b"
              >
                <div className="h-full flex flex-col items-start justify-between">
                  <div className="w-full min-h-40 flex items-center justify-between max-lg:mb-15">
                    {item.icon2 ? (
                      <div className="flex items-center gap-2">
                        <div className="">
                          <item.icon className="text-p text-[30px]" />
                        </div>
                        <span className="ml-2 font-chivo font-semibold text-[22px] tracking-widest uppercase text-p">
                          +
                        </span>
                        <div className="">
                          <item.icon2 className="text-p text-[28px]" />
                        </div>
                      </div>
                    ) : (
                      <div className="">
                        <item.icon className="text-p text-[30px]" />
                      </div>
                    )}
                  </div>

                  <div className="max-w-125 min-h-10 flex flex-col items-start">
                    <div className="mb-10 flex items-center gap-4">
                      <span className="relative -top-0.5 size-2 rotate-45 bg-p" />
                      <RevealText
                        text={item.title}
                        className="font-chivo font-semibold 
text-[14px] tracking-widest uppercase text-p
leading-[.9]"
                      />
                    </div>

                    <RevealText
                      text={item.description}
                      className="min-h-35 font-neue font-normal 
    text-p text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-none"
                    />

                    <TransitionLink href={item.href} className="mb-10">
                      <Button
                        text={item.button}
                        bg="bg-p"
                        textColor="text-s"
                        iconColor="text-s"
                        hoverBg="bg-bg-s-2"
                        hoverTextColor="text-p"
                        hoverIconColor="text-p"
                      />
                    </TransitionLink>
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
