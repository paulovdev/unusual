"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

import { usePathname } from "next/navigation";
import {
  FaBehanceSquare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaSearch,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { worksData } from "@/data/works-data";
import { useWorkStore } from "@/store/useWorkStore";
import { FaSquareXTwitter } from "react-icons/fa6";
import reelCover from "@/public/assets/images/home/bg-1.jpg";

import TextLink from "../ui/text-link";
import Image from "next/image";
import { RevealText } from "../reveal-text";
import TransitionLink from "../ui/link";
import { BiSearch } from "react-icons/bi";

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
    clipPath: "inset(0% 0% 100% 0%)",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
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
const socialContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};
const socialItem = {
  initial: { opacity: 0, y: -5 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const Menu = ({ pathname, setMenu }) => {
  return (
    <>
      <div
        className="fixed top-15
          w-full z-90 select-none pointer-events-none"
      >
        <motion.div
          variants={menuContainer}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-[calc(100%-20px)] h-[calc(100vh-85px)] left-5 px-5 grid grid-cols-5 
  max-lg:flex max-lg:p-0 max-lg:left-0 max-lg:w-full"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.25,
              },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            className="relative col-start-3 col-span-full p-5 size-full bg-bg-s backdrop-blur-2xl 
      pointer-events-auto flex items-start justify-between max-lg:px-4"
          >
            <div className="size-full flex flex-col items-start justify-between">
              <div className="">
                <RevealText
                  text="Browse the website"
                  className="mt-5 mb-10 font-chivo font-semibold text-p/60
text-[14px] tracking-widest leading-none uppercase"
                  exit={true}
                  delay={0.2}
                  once={false}
                />

                {navData.map((nav, i) => {
                  const active = pathname === nav.href;

                  return (
                    <TransitionLink
                      key={i}
                      href={nav.href}
                      onClick={() => setMenu(false)}
                      className={`cursor-pointer mb-1 size-fit flex items-center gap-2`}
                    >
                      <TextLink bgColor={active ? "bg-p/60" : "bg-p"}>
                        <RevealText
                          text={nav.label}
                          delay={i * 0.025}
                          exit={true}
                          once={false}
                          className={`max-w-125 
              ${active ? "text-p/40 hover:text-s/60" : "text-p hover:text-s"} 
            font-neue font-light text-[clamp(42px,5vw,58px)] text-p text-start tracking-[-7%] leading-[.9]
       transition-colors duration-150 ease-[cubic-bezier(0.76,0,0.24,1)]`}
                        />
                      </TextLink>
                    </TransitionLink>
                  );
                })}
              </div>
              <motion.div
                variants={socialContainer}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mb-2 flex items-center gap-3"
              >
                <motion.div variants={socialItem}>
                  <FaSquareXTwitter className="text-p text-[32px]" />
                </motion.div>

                <motion.div variants={socialItem}>
                  <FaInstagramSquare className="text-p text-[32px]" />
                </motion.div>

                <motion.div variants={socialItem}>
                  <FaBehanceSquare className="text-p text-[32px]" />
                </motion.div>

                <motion.div variants={socialItem}>
                  <FaLinkedin className="text-p text-[32px]" />
                </motion.div>

                <motion.div variants={socialItem}>
                  <FaFacebookSquare className="text-p text-[32px]" />
                </motion.div>
              </motion.div>
            </div>

            <div className="size-full max-md:hidden flex flex-col items-end justify-between gap-4">
              <motion.figure
                variants={menuOverlay}
                className="relative size-full overflow-hidden group "
              >
                <Image
                  src={reelCover}
                  width={3000}
                  height={3000}
                  alt="Showreel Preview"
                  className="object-cover w-200 h-80 size-full brightness-75"
                />

                <div className="absolute top-4 left-4 z-10 flex items-center gap-4 ">
                  <span className="relative -top-px size-2 rotate-45 bg-s " />

                  <span
                    className="font-chivo font-semibold 
    text-[14px] tracking-widest leading-none uppercase text-s"
                  >
                    UNUSUAL
                  </span>
                </div>
              </motion.figure>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.3,
                    duration: 0.6,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
                exit={{ opacity: 0, y: 10 }}
                className="w-full flex flex-col"
              >
                <div className="mb-2 flex items-start justify-between">
                  <RevealText
                    text="Location"
                    className=" font-chivo font-semibold 
    text-[14px] tracking-widest leading-none uppercase text-p/60"
                  />
                  <RevealText
                    text="Rio de Janeiro, BR"
                    className=" font-chivo font-semibold 
    text-[14px] tracking-widest leading-none uppercase text-p"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <RevealText
                    text="Inquiries"
                    className=" font-chivo font-semibold 
    text-[14px] tracking-widest leading-none uppercase text-p/60"
                  />
                  <TextLink bgColor="bg-p">
                    <div
                      className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase 
    leading-[.9] text-p  text-end
                        group-hover:text-s 
                       transition-colors duration-150 ease-[cubic-bezier(0.76,0,0.24,1)]"
                    >
                      <RevealText
                        text="hello@shapes.studio"
                        className=" font-chivo font-semibold 
    text-[14px] tracking-widest leading-none uppercase "
                      />
                    </div>
                  </TextLink>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

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

const Search = ({ setSearch, work = worksData }) => {
  const { query, setQuery, setActiveWork } = useWorkStore();

  const [randomSuggestions, setRandomSuggestions] = useState(() =>
    work.slice(0, 3),
  );

  const suggestions = query.trim()
    ? work.filter((item) =>
        item.title.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : randomSuggestions;

  const shuffleSuggestions = () => {
    const arr = [...work];

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    setRandomSuggestions(arr.slice(0, 3));
  };
  const handleSelect = (item) => {
    setActiveWork(item);
    setSearch(false);
    setQuery("");
  };

  return (
    <>
      <motion.div
        variants={menuContainer}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute top-10 left-0 w-130 max-w-[calc(100vw-20px)] z-20 max-lg:right-0"
      >
        <div className="w-full h-fit overflow-hidden bg-bg-p-2 size-full overflow-y-scroll">
          <div className="flex flex-col items-start p-5">
            <div className="my-2.5 w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative -top-0.5 size-2 rotate-45 bg-s" />
                {query === "" ? (
                  <RevealText
                    text="suggestions"
                    className="font-chivo font-semibold 
    text-[14px] tracking-widest uppercase text-s
    leading-[.9]"
                  />
                ) : (
                  <RevealText
                    text={`${suggestions.length} ${
                      suggestions.length === 1 ? "result" : "results"
                    }`}
                    className="font-chivo font-semibold text-[14px] tracking-widest uppercase text-s leading-[.9]"
                  />
                )}
              </div>

              <div
                onClick={() => {
                  if (query) {
                    setQuery("");
                  } else {
                    shuffleSuggestions();
                  }
                }}
                className="flex items-center gap-3 group"
              >
                <RxUpdate className="relative -top-0.5 text-s text-[18px] group-hover:rotate-180 transition-transform duration-500" />
                <RevealText
                  text="Update"
                  className="font-chivo font-semibold text-[14px] tracking-widest uppercase text-s leading-[.9]"
                />
              </div>
            </div>
          </div>

          <div className="overflow-y-auto px-5 pb-5 flex flex-col gap-2.5">
            {suggestions.length > 0 ? (
              suggestions.map((item) => (
                <motion.button
                  type="button"
                  key={item.id ?? item.title}
                  layout
                  className="relative w-full h-60 shrink-0 overflow-hidden group text-left"
                >
                  <TransitionLink
                    key={item.id ?? item.title}
                    href={`/projects?project=${item.id}`}
                    onClick={() => handleSelect(item)}
                  >
                    <figure
                      className="w-full h-60 overflow-hidden 
                                        group max-lg:h-75"
                    >
                      <Image
                        src={item?.heroMedia?.image}
                        width={1000}
                        height={1000}
                        alt=""
                        placeholder="blur"
                        className="size-full object-cover brightness-90 group-hover:scale-110
                              transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                      />

                      <div className="absolute left-5 bottom-5">
                        <RevealText
                          text={item.title}
                          className="mb-2 font-chivo font-semibold 
                       text-[14px] tracking-widest uppercase text-s
                       leading-[.9]"
                        />

                        <div className="size-fit flex items-center gap-3">
                          <span className="relative left-1 -top-0.5 size-2 rotate-45 bg-s/60" />
                          <RevealText
                            text={item.location}
                            className="font-chivo font-semibold 
                       text-[14px] tracking-widest uppercase text-s/60
                       leading-[.9]"
                          />
                        </div>
                      </div>
                    </figure>
                  </TransitionLink>
                </motion.button>
              ))
            ) : (
              <RevealText
                text="No projects found."
                className="font-chivo font-semibold 
                       text-[14px] tracking-widest uppercase text-s
                       leading-[.9]"
              />
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        onClick={() => setSearch(false)}
        variants={menuOverlay}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 w-screen h-screen z-10"
      />
    </>
  );
};

const Nav = ({ lenis }) => {
  const pathname = usePathname();
  const { query, setQuery } = useWorkStore();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
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
            max-lg:flex max-lg:items-start max-lg:justify-between transition-colors duration-100 ${navText}`}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: showNav ? 1 : 0, y: showNav ? 0 : -50 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="w-full col-start-3 col-span-3">
            <motion.div
              className="px-5 h-15 w-full flex items-center justify-between pointer-events-auto 
            max-lg:pr-2 max-lg:px-2.5"
            >
              <div className="flex items-center gap-5 max-lg:hidden ">
                <span
                  className={`relative -top-px left-1 size-2 rotate-45 ${navBg} transition-colors duration-100`}
                />
                <p className="font-chivo font-semibold text-[14px] tracking-widest leading-none uppercase">
                  {navData.map((item) => (
                    <span key={item.href}>
                      {pathname === item.href ? item.label : ""}
                    </span>
                  ))}
                </p>
              </div>

              {pathname !== "/projects" && (
                <div className="relative z-20 flex items-center gap-3">
                  <div
                    className={`flex items-center gap-3 ${navText} z-30`}
                    onClick={() => {
                      if (!search) {
                        setSearch(true);
                        setMenu(false);
                      }
                    }}
                  >
                    <FaSearch className="relative top-px text-[12px]" />

                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search"
                      className={`outline-none placeholder:opacity-100
    ${navText === "text-s" ? "placeholder:text-s" : "placeholder:text-p"}
    font-chivo font-semibold text-[14px] tracking-widest leading-none uppercase
  `}
                    />
                    <AnimatePresence>
                      {search && (
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{
                            duration: 0.8,
                            ease: [0.76, 0, 0.24, 1],
                          }}
                          className={`absolute -bottom-2 left-0 w-full h-0.5 ${navBg} origin-left`}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  {/*    {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className={navText}
                    aria-label="Clear search"
                  >
                    <IoClose className="text-[18px]" />
                  </button>
                )} */}

                  <AnimatePresence>
                    {search && <Search setSearch={setSearch} />}
                  </AnimatePresence>
                </div>
              )}

              {/*  */}

              <div className="relative size-fit flex items-center gap-4 group max-lg:hidden z-10">
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
            </motion.div>
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
