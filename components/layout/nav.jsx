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

const menuOverlay = {
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
const wordReveal = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "-50%",
  },
  transition: {
    duration: 0.75,
    ease: [0.33, 1, 0.68, 1],
  },
};
const Menu = ({ pathname, setMenu }) => {
  return (
    <>
      <motion.div
        variants={menuContainer}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed top-15
          w-full z-90 select-none pointer-events-none"
      >
        <div
          className="relative w-[calc(100%-20px)] left-5 px-5 grid grid-cols-5 
        max-lg:flex max-lg:p-0 max-lg:left-0 max-lg:w-full"
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
            className="relative col-start-3 col-span-full p-5 size-full bg-p/20 backdrop-blur-2xl 
             pointer-events-auto flex items-start justify-between max-lg:px-4"
          >
            <div className="w-full flex flex-col items-start">
              <p
                className="mt-5 mb-10 font-chivo font-semibold text-s/50
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
            <div className="size-fit max-md:hidden">
              <Image
                src={reelCover}
                width={3000}
                height={3000}
                alt=""
                className="object-cover w-180 h-60 size-full brightness-75 "
              />
            </div>
          </motion.div>
        </div>
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

const Nav = ({ lenis }) => {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [mobile, setMobile] = useState(false);

  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolledToSection, setIsScrolledToSection] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 1000) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const sections = document.querySelectorAll("[data-nav-theme]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setIsScrolledToSection(
            visibleSections[0].target.dataset.navTheme === "dark",
          );
        }
      },
      {
        rootMargin: "-3% 0px -100% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (!lenis?.current) return;

    if (menu) {
      lenis.current.stop();
    } else {
      lenis.current.start();
    }

    return () => {
      lenis.current?.start();
    };
  }, [menu, lenis]);

  const isLight = isScrolledToSection;
  const navText = menu ? "text-s" : isLight ? "text-p" : "text-s";
  const navBg = menu ? "bg-s" : isLight ? "bg-p" : "bg-s";
  const getBg = menu ? "bg-p" : isLight ? "bg-p" : "bg-s";
  const getText = menu
    ? "text-s"
    : isLight
      ? "text-p group-hover:text-s"
      : "text-s group-hover:text-p ";
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.nav
          className={`fixed inset-0 w-full grid grid-cols-5 z-100 pointer-events-none 
            max-lg:flex max-lg:items-start max-lg:justify-between transition-colors duration-300 ${navText}`}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: showNav ? 1 : 0, y: showNav ? 0 : -50 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="w-full col-start-3 col-span-3">
            <motion.button
              className="px-5 h-15 w-full flex items-center justify-between pointer-events-auto 
            max-lg:pr-2 max-lg:px-2.5"
            >
              <div className="flex items-center gap-5 max-lg:hidden">
                <span
                  className={`relative -top-px left-1 size-2 rotate-45 ${navBg} transition-colors duration-300`}
                />
                <p className="font-chivo font-semibold text-[14px] tracking-widest leading-none uppercase">
                  {navData.map((item) => (
                    <span key={item.href}>
                      {pathname === item.href ? item.label : ""}
                    </span>
                  ))}
                </p>
              </div>

              <div className="font-chivo font-semibold text-[14px] tracking-widest leading-none uppercase max-lg:hidden">
                21:45 UAE
              </div>

              <div className="relative size-fit flex items-center gap-4 group">
                <TextLink bgColor={getBg}>
                  <motion.p
                    className={`font-chivo font-semibold text-[14px] tracking-widest leading-none uppercase flex items-center gap-4 
                      ${getText} transition-colors duration-150`}
                  >
                    get in touch
                  </motion.p>
                </TextLink>
              </div>

              <div
                className="relative flex items-center justify-between gap-5"
                onClick={() => setMenu(!menu)}
              >
                <div className="size-fit flex flex-col items-start gap-1.5">
                  <motion.span
                    className={`block w-6 h-0.5 ${navBg}`}
                    animate={menu ? { rotate: -45, y: 4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  />
                  <motion.span
                    className={`block h-0.5 ${navBg}`}
                    initial={{ width: "12px" }}
                    animate={
                      menu
                        ? { rotate: 45, y: -3, width: "24px" }
                        : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                  />
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <div className="h-[15px] overflow-hidden cursor-default">
                    <motion.div
                      variants={wordReveal}
                      initial="initial"
                      animate={menu ? "animate" : "initial"}
                      className="min-w-14 flex flex-col items-start justify-center"
                    >
                      <span
                        className={`block font-chivo font-semibold text-[14px] tracking-widest leading-none uppercase ${navText}`}
                      >
                        MENU
                      </span>
                      <span
                        className={`block font-chivo font-semibold text-[14px] tracking-widest leading-none uppercase ${navText}`}
                      >
                        CLOSE
                      </span>
                    </motion.div>
                  </div>
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
