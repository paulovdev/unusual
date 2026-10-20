import { team } from "@/data/data";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import teamCover from "@/public/assets/images/about/team.jpg";
import { RevealText } from "@/components/reveal-text";

const StudioTeam = ({ member: activeMember, setMember: setActiveMember }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const hotspots = [
    { name: "Ethan Walker", top: "55%", left: "22%" },
    { name: "Sophie Mitchell", top: "42%", left: "49%" },
    { name: "Lucas Anderson", top: "56%", left: "81%" },
  ];

  return (
    <section
      id="team"
      data-nav-theme="light"
      className="relative w-full bg-p text-s overflow-hidden"
    >
      <div
        ref={container}
        className="max-lg:hidden relative flex items-center justify-center min-h-screen h-screen w-full overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            style={{ y }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <Image
              src={teamCover}
              alt="Team Cover"
              priority
              fill
              className="object-cover brightness-75"
            />

            <div className="absolute inset-0 z-20">
              {team.map((member, index) => {
                const spot = hotspots[index] || {
                  top: "50%",
                  left: `${20 + index * 15}%`,
                };
                const isActive = activeMember?.name === member.name;

                return (
                  <div
                    key={member.name || index}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 p-2 md:p-4 group cursor-pointer"
                    style={{ top: spot.top, left: spot.left }}
                    onClick={() => setActiveMember(member)}
                  >
                    <button
                      type="button"
                      aria-label={`Select ${member.name}`}
                      className="relative size-3 flex items-center justify-center pointer-events-auto"
                    >
                      <motion.span className="absolute size-2.5 bg-bg-s-2 rotate-45 transition-transform group-hover:scale-125" />
                      <motion.span className="absolute size-4 border border-s rotate-45 transition-transform group-hover:scale-110" />
                    </button>

                    <div className="overflow-hidden pointer-events-none">
                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0.85,
                          x: 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1.5 rounded"
                      >
                        <span className="mb-1 font-neue font-normal text-s text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-none space-nowrap">
                          {member.name}
                        </span>
                        <span className="font-neue font-normal text-s/60 text-[clamp(16px,4vw,20px)] tracking-[-4%] leading-none space-nowrap">
                          {member.role}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-lg:block hidden relative w-full z-10 mb-10">
        <div className="relative w-full min-h-130 overflow-hidden mb-5 max-md:min-h-100">
          <Image
            src={teamCover}
            alt="Team Cover"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-p via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 max-lg:left-2.5">
            <div className="mb-10 flex items-center gap-3">
              <span className="relative -top-0.5 size-2 rotate-45 bg-s/60" />
              <RevealText
                text="Our team"
                className="font-chivo font-semibold text-[14px] tracking-widest uppercase text-s/60 leading-none"
              />
            </div>
            <RevealText
              text="Meet a team"
              className="mt-2 font-neue font-light text-[clamp(36px,6vw,72px)] text-s text-start tracking-[-7%] leading-[.9]"
              delay={0.1}
            />
          </div>
        </div>

        <div
          className="grid grid-cols-1 gap-2.5 px-5
          max-lg:grid-cols-2 max-md:grid-cols-1 max-lg:px-2.5"
        >
          {team.map((member) => (
            <button
              key={member.name}
              onClick={() => setActiveMember(member)}
              className="py-5 flex items-center justify-between p-4 bg-s/5 border border-s/5 active:bg-s/10 text-left transition-colors group"
            >
              <div className="flex flex-col gap-0.5">
                <span className="mb-2 font-neue  font-normal text-s text-[clamp(16px,4vw,20px)] tracking-[-0.04em] leading-[1.2]">
                  {member.name}
                </span>
                <span className="font-chivo font-semibold text-[12px] tracking-widest uppercase text-s/60 leading-none">
                  {member.role}
                </span>
              </div>
              <div className="relative size-3 flex items-center justify-center">
                <span className="absolute size-2.5 bg-bg-s-2 rotate-45 transition-transform group-hover:scale-125" />
                <span className="absolute size-4 border border-s rotate-45 transition-transform group-hover:scale-110" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioTeam;
