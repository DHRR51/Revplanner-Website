import { useState } from 'react';

interface UseAccordionReturn {
  openIndices: Set<number>;
  toggle: (index: number) => void;
  toggleExpandAll: () => void;
  allOpen: boolean;
}

export function useAccordion(count: number): UseAccordionReturn {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      if (prev.has(index)) {
        // close it
        return new Set();
      }
      // accordion: open only this one
      return new Set([index]);
    });
  };

  const toggleExpandAll = () => {
    setOpenIndices((prev) => {
      if (prev.size === count) {
        return new Set();
      }
      return new Set(Array.from({ length: count }, (_, i) => i));
    });
  };

  const allOpen = openIndices.size === count;

  return { openIndices, toggle, toggleExpandAll, allOpen };
}
