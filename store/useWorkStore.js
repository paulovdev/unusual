import { create } from "zustand";

export const useWorkStore = create((set) => ({
  // Active Work Modal
  activeWork: null,
  setActiveWork: (work) =>
    set({
      activeWork: work,
    }),

  clearActiveWork: () =>
    set({
      activeWork: null,
    }),

  // FILTERS
  activeYear: "all",
  activeScope: [], // Mapeado para 'scope' do worksData
  activeServices: [], // Mapeado para 'services' do worksData
  activeFeatured: false,

  setActiveYear: (v) =>
    set({
      activeYear: v,
    }),

  setActiveScope: (value) =>
    set((state) => {
      const exists = state.activeScope.includes(value);
      return {
        activeScope: exists
          ? state.activeScope.filter((v) => v !== value)
          : [...state.activeScope, value],
      };
    }),

  setActiveServices: (value) =>
    set((state) => {
      const exists = state.activeServices.includes(value);
      return {
        activeServices: exists
          ? state.activeServices.filter((v) => v !== value)
          : [...state.activeServices, value],
      };
    }),

  setActiveFeatured: (v) =>
    set({
      activeFeatured: v,
    }),

  resetFilters: () =>
    set({
      activeYear: "all",
      activeScope: [],
      activeServices: [],
      activeFeatured: false,
    }),

  // SEARCH
  query: "",
  setQuery: (q) =>
    set({
      query: q,
    }),

  // MODALS
  isFiltersOpen: false,
  isSearchOpen: false,

  openFilters: () =>
    set({
      isFiltersOpen: true,
    }),
  closeFilters: () =>
    set({
      isFiltersOpen: false,
    }),
  openSearch: () =>
    set({
      isSearchOpen: true,
    }),
  closeSearch: () =>
    set({
      isSearchOpen: false,
    }),
}));
