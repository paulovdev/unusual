"use client";

import HomeIntro from "@/features/home/home.intro";
import { usePageTransition, usePreLoader } from "@/store/pageTransition";
import Lenis from "lenis";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

import Nav from "@/components/layout/nav";
import HomeAbout from "./home.about";
import HomeWorks from "./home.works";
import HomeStatement from "./home.statement";
import HomeClients from "./home.clients";
import HomeArticles from "./home.articles";
import Footer from "@/components/layout/footer";

import WorkModal from "@/components/modal/work/work-modal";
import ArticleModal from "@/components/modal/article/article-modal";

const canvasPushVariants = {
  expanded: {
    x: "0%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },

  pushedRight: {
    x: "20%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const HomeHero = () => {
  const { isReady } = usePageTransition();
  const { isReadyPreLoader } = usePreLoader();
  const lenisRef = useRef(null);

  const [activeWork, setActiveWork] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    if (!isReady) return;

    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    if (!isReadyPreLoader) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isReady, isReadyPreLoader]);

  const isAnyModalOpen = Boolean(activeWork || activeArticle);

  return (
    <>
      {isReadyPreLoader && <Nav lenis={lenisRef} />}
      {isReady && (
        <>
          <motion.main
            variants={canvasPushVariants}
            animate={isAnyModalOpen ? "pushedRight" : "expanded"}
            className="relative bg-bg-s"
          >
            <HomeIntro lenis={lenisRef} />
            <HomeAbout />
            <HomeClients />
            <HomeWorks
              lenis={lenisRef}
              activeWork={activeWork}
              setActiveWork={setActiveWork}
            />
            <HomeStatement />
            <HomeArticles
              lenis={lenisRef}
              activeArticle={activeArticle}
              setActiveArticle={setActiveArticle}
            />
          </motion.main>
          <Footer />

          <AnimatePresence mode="wait">
            {activeWork && (
              <WorkModal
                work={activeWork}
                isOpen={!!activeWork}
                onClose={() => setActiveWork(null)}
                lenis={lenisRef}
              />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {activeArticle && (
              <ArticleModal
                article={activeArticle}
                isOpen={!!activeArticle}
                onClose={() => setActiveArticle(null)}
                lenis={lenisRef}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default HomeHero;
