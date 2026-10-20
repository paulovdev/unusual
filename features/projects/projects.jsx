"use client";
import Nav from "@/components/layout/nav";
import ProjectsIntro from "@/features/projects/projects.intro";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import ProjectsWorks from "./projects.works";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { useWorkStore } from "@/store/useWorkStore";
import WorkModal from "@/components/modal/work/work-modal";
import { FiltersModal } from "@/components/modal/filters/filters-modal";
import { SearchModal } from "@/components/modal/search/search-modal";
import { usePageTransition } from "@/store/pageTransition";
import Footer from "@/components/layout/footer";

const canvasPushVariants = {
  expanded: {
    x: "0%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  // Exemplo 1: Filters empurra para a direita (20%)
  filtersPushed: {
    x: "20%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  // Exemplo 2: Search empurra para a esquerda (-20%)
  searchPushed: {
    x: "-20%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  // Exemplo 3: WorkModal empurra para a direita com outra proporção (ex: 30%)
  workPushed: {
    x: "30%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const ProjectsHero = () => {
  const lenisRef = useRef(null);
  const { isReady } = usePageTransition();
  const {
    activeWork,
    clearActiveWork,
    isFiltersOpen,
    closeFilters,
    isSearchOpen,
    closeSearch,
    activeYear,
    activeScope,
    activeServices,
    activeFeatured,
  } = useWorkStore();

  const activeFiltersCount = [
    activeYear !== "all",
    activeScope.length > 0,
    activeServices.length > 0,
    activeFeatured,
  ].filter(Boolean).length;

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: true,
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
    };
  }, []);

  // Lógica para definir qual animação aplicar com base em qual modal está aberta
  const getAnimationState = () => {
    if (isFiltersOpen) return "filtersPushed";
    if (isSearchOpen) return "searchPushed";
    if (activeWork) return "workPushed";
    return "expanded";
  };

  return (
    <>
      <Nav lenis={lenisRef} />
      {isReady && (
        <motion.main
          variants={canvasPushVariants}
          animate={getAnimationState()}
          className="relative bg-bg-s"
        >
          <ProjectsIntro lenis={lenisRef} />
          <ProjectsWorks
            activeFiltersCount={activeFiltersCount}
            lenis={lenisRef}
          />
        </motion.main>
      )}
      <Footer />
      <AnimatePresence mode="wait">
        {isFiltersOpen && (
          <FiltersModal lenis={lenisRef} onClose={closeFilters} />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isSearchOpen && <SearchModal lenis={lenisRef} onClose={closeSearch} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {activeWork && (
          <WorkModal
            work={activeWork}
            isOpen={!!activeWork}
            onClose={clearActiveWork}
            lenis={lenisRef}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsHero;
