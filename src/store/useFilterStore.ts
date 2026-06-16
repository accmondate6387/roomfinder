// ==================================================
// Filter Store (Zustand)
// ==================================================
// Manages property search filter state across components.
// ==================================================

import { create } from "zustand";
import type { PropertyFilters } from "@/types";

export interface FilterState extends PropertyFilters {
  // Actions
  setFilter: <K extends keyof PropertyFilters>(
    key: K,
    value: PropertyFilters[K]
  ) => void;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  resetFilters: () => void;
  toggleAmenity: (amenity: string) => void;
}

const defaultFilters: PropertyFilters = {
  city: "Prayagraj",
  area: undefined,
  priceMin: undefined,
  priceMax: undefined,
  propertyType: undefined,
  roomType: undefined,
  gender: undefined,
  amenities: [],
  availability: undefined,
  verified: undefined,
  nearCoaching: undefined,
  nearCoachingRadius: 2,
  sort: "newest",
  q: undefined,
  page: 1,
  limit: 12,
};

export const useFilterStore = create<FilterState>((set) => ({
  ...defaultFilters,

  setFilter: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
      page: key !== "page" ? 1 : (value as number), // Reset page when filter changes
    })),

  setFilters: (filters) =>
    set((state) => ({
      ...state,
      ...filters,
      page: 1,
    })),

  resetFilters: () => set({ ...defaultFilters }),

  toggleAmenity: (amenity) =>
    set((state) => {
      const current = state.amenities || [];
      const exists = current.includes(amenity);
      return {
        amenities: exists
          ? current.filter((a) => a !== amenity)
          : [...current, amenity],
        page: 1,
      };
    }),
}));
