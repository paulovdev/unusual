import { ClipText } from "@/components/clip-text";
import { RevealText } from "@/components/reveal-text";
import { motion } from "motion/react";
import { MdOutlineArrowDownward } from "react-icons/md";
import { useInView } from "react-intersection-observer";

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

const ProjectsIntro = ({ work }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section id="about" className="pt-75 mb-10 px-5 grid grid-cols-5" ref={ref}>
      <div className="col-start-3 col-span-2 flex flex-col items-start">
        <div className="relative col-span-full col-start-3 flex flex-col items-start justify-end">
          <ClipText
            text="Spaces"
            animate="animate"
            className=" font-neue font-light text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%] leading-none"
          />
          <ClipText
            text="Defined By Details"
            animate="animate"
            className="ml-15 font-neue font-light text-[clamp(36px,6vw,72px)] text-p text-start tracking-[-7%] leading-none"
          />

          <div className="relative mt-10 ml-15 mb-5 h-fit overflow-hidden ">
            <motion.p
              initial="initial"
              animate="animate"
              custom={0.25}
              variants={textSlide}
              className="relative left-1 text-chivo-s-14 text-p text-start
                flex items-center gap-2"
            >
              A Waterfront Residence Defined by Privacy.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsIntro;
