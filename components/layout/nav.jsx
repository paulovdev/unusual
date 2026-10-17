"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

import { usePathname } from "next/navigation";
import { FaBehance, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import reelCover from "@/public/assets/images/home/bg-4.jpg";

import TransitionLink from "../ui/link";
import TextLink from "../ui/text-link";
import Image from "next/image";

export const menuOverlay = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.25,
    },
  },
};

const navData = [
  { label: "Index", href: "/" },
  { label: "Studio", href: "/studio" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const Menu = ({ pathname, setMenu, mobile }) => {
  const menuContainer = {
    initial: {
      height: "0px",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    animate: {
      height: "500px",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.25,
      },
    },
    exit: {
      height: "0px",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.25,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={menuContainer}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed right-10 top-15
          w-273 bg-p/20 backdrop-blur-2xl z-90 select-none pointer-events-none
         max-lg:w-full max-lg:right-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.25,
            },
          }}
          exit={{
            opacity: 0,
            y: 15,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="relative p-5 size-full grid grid-cols-5 pointer-events-auto
          max-lg:flex max-lg:items-start max-lg:justify-between"
        >
          <div className="col-start-1 col-span-2 w-full flex flex-col items-start">
            <p
              className="mt-5 mb-10 font-chivo font-medium text-s/50
    text-[14px] tracking-widest leading-none uppercase "
            >
              Browse the website
            </p>

            {navData.map((nav, i) => {
              const active = pathname === nav.href;

              return (
                <TransitionLink
                  key={i}
                  href={nav.href}
                  onClick={() => setMenu(false)}
                  className={`cursor-pointer ${active ? "mt-2.5 mb-4" : "mb-2"} size-fit flex items-center gap-2`}
                >
                  <TextLink bgColor={active ? "bg-[#202020]" : "bg-s"}>
                    <p
                      className={`max-w-125 
                      ${active ? "text-s/50 hover:text-s/75" : "text-s hover:text-p"} 
                  font-neue font-light
    text-[clamp(42px,5vw,58px)] text-p text-start tracking-[-7%]
    leading-[.9]
               transition-colors duration-150 ease-[cubic-bezier(0.76,0,0.24,1)]`}
                    >
                      {nav.label}
                    </p>
                  </TextLink>
                </TransitionLink>
              );
            })}
            <div className="mb-5 mt-10 flex items-center gap-5 ">
              <FaXTwitter className="text-s text-[24px] cursor-pointer" />
              <FaInstagram className="text-s text-[24px] cursor-pointer" />
              <FaBehance className="text-s text-[24px] cursor-pointer" />
            </div>
          </div>
          <div className="col-start-4 col-span-full overflow-hidden max-md:hidden max-lg:size-full">
            <Image
              src={reelCover}
              width={3000}
              height={3000}
              alt=""
              className="object-cover size-full brightness-75 "
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        onClick={() => setMenu(false)}
        variants={menuOverlay}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 bg-p/50 backdrop-blur-lg w-screen h-screen z-80"
      />
    </>
  );
};

const Nav = () => {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [mobile, setMobile] = useState(false);

  const navContainer = {
    initial: {
      width: mobile ? "100%" : "400px",

      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    animate: {
      width: mobile ? "100%" : "600px",

      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      width: mobile ? "100%" : "400px",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.5,
      },
    },
  };

  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 768);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.nav
          className="fixed inset-0 w-full grid grid-cols-5 z-100 pointer-events-none mix-blend-exclusion
          max-lg:flex max-lg:items-start max-lg:justify-between"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="w-full col-start-3 col-span-3">
            <motion.button
              /*   variants={navContainer}
            initial="initial"
            animate={menu ? "animate" : "exit"}
            exit="exit" */
              className="px-5 h-15 w-full
        flex items-center justify-between pointer-events-auto max-lg:pr-2
     "
            >
              <div className="flex items-center gap-5 max-lg:hidden">
                <span className="relative top-0 left-1 size-2 rotate-45 bg-s" />
                <p
                  className="font-chivo font-medium text-s 
    text-[14px] tracking-widest leading-none uppercase "
                >
                  {navData.map((item) => (
                    <span key={item.href}>
                      {pathname === item.href ? item.label : ""}
                    </span>
                  ))}
                </p>
              </div>

              <div
                className="font-chivo font-medium text-s 
    text-[14px] tracking-widest leading-none uppercase max-lg:hidden"
              >
                21:45 UAE
              </div>
              <div className="relative size-fit flex items-center gap-4">
                <TextLink bgColor="bg-s">
                  <motion.p
                    className="font-chivo font-medium text-s 
    text-[14px] tracking-widest leading-none uppercase  
                        group-hover:text-p 
                       transition-colors duration-150 ease-[cubic-bezier(0.76,0,0.24,1)] 
                       flex items-center gap-4"
                  >
                    get in touch
                  </motion.p>
                </TextLink>
              </div>
              <div
                className="relative right-5 flex items-center justify-between gap-5 
                max-lg:right-0"
                onClick={() => setMenu(!menu)}
              >
                <div className="size-fit flex flex-col items-start gap-1.5">
                  <motion.span
                    className="block w-6 h-px bg-s"
                    animate={menu ? { rotate: -45, y: 4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  />
                  <motion.span
                    className="block h-px bg-s"
                    initial={{ width: "12px" }}
                    animate={
                      menu
                        ? { rotate: 45, y: -3, width: "24px" }
                        : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  />
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={menu ? "fechar" : "menu"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
                    }}
                    className="min-w-15 font-chivo font-medium text-s 
    text-[14px] tracking-widest leading-none uppercase "
                  >
                    {menu ? "CLOSE" : "MENU"}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.button>
          </div>
        </motion.nav>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {menu && <Menu pathname={pathname} setMenu={setMenu} mobile={mobile} />}
      </AnimatePresence>
    </>
  );
};

export default Nav;
