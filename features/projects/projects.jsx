"use client";

import Nav from "@/components/layout/nav";
import ProjectsIntro from "@/features/projects/projects.intro";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import ProjectsWorks from "./projects.works";
import { AnimatePresence } from "motion/react";

import { useWorkStore } from "@/store/useWorkStore";
import WorkModal from "@/components/modal/work/work-modal";
import { FiltersModal } from "@/components/modal/filters/filters-modal";
import { SearchModal } from "@/components/modal/search/search-modal";
import { usePageTransition } from "@/store/pageTransition";
import String from "@/components/ui/string";
import Footer from "@/components/layout/footer";

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

  return (
    <>
      <Nav lenis={lenisRef} />
      {isReady && (
        <main className="relative bg-bg-s">
          <ProjectsIntro lenis={lenisRef} />
          <ProjectsWorks
            activeFiltersCount={activeFiltersCount}
            lenis={lenisRef}
          />
        </main>
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
