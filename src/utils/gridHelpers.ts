// Grid layout helper functions for SystemPage

export const getDesktopGridClass = (pillarId: string, selectedId: string | null): string => {
  if (!selectedId) {
    if (pillarId === 'pillar1') return "lg:col-span-2";
    if (pillarId === 'pillar4') return "lg:col-span-2";
    if (pillarId === 'pillar5') return "lg:col-span-2";
    if (pillarId === 'pillar7') return "lg:col-span-3";
    return "lg:col-span-1";
  }

  // Active State logic for Desktop
  if (pillarId === selectedId) {
    return "lg:col-span-3";
  }

  // Neighbor Logic for Desktop
  if (selectedId === 'pillar1') {
    if (pillarId === 'pillar3') return "lg:col-span-2";
    if (pillarId === 'pillar4') return "lg:col-span-2";
    if (pillarId === 'pillar7') return "lg:col-span-2";
    return "lg:col-span-1";
  }
  if (selectedId === 'pillar2') {
    if (pillarId === 'pillar1') return "lg:col-span-3";
    if (pillarId === 'pillar4') return "lg:col-span-2";
    if (pillarId === 'pillar5') return "lg:col-span-2";
    if (pillarId === 'pillar7') return "lg:col-span-3";
    return "lg:col-span-1";
  }
  if (selectedId === 'pillar3') {
    if (pillarId === 'pillar2') return "lg:col-span-2";
    if (pillarId === 'pillar5') return "lg:col-span-2";
    if (pillarId === 'pillar7') return "lg:col-span-2";
    return "lg:col-span-1";
  }
  if (selectedId === 'pillar4') return "lg:col-span-1"; 
  if (selectedId === 'pillar5') {
    if (pillarId === 'pillar1') return "lg:col-span-2";
    if (pillarId === 'pillar4') return "lg:col-span-2";
    if (pillarId === 'pillar7') return "lg:col-span-2";
    return "lg:col-span-1";
  }
  if (selectedId === 'pillar6') {
    if (pillarId === 'pillar2') return "lg:col-span-2";
    if (pillarId === 'pillar3') return "lg:col-span-2";
    if (pillarId === 'pillar5') return "lg:col-span-3";
    if (pillarId === 'pillar7') return "lg:col-span-3";
    return "lg:col-span-1";
  }
  if (selectedId === 'pillar7') {
    if (pillarId === 'pillar1') return "lg:col-span-2";
    if (pillarId === 'pillar4') return "lg:col-span-2";
    if (pillarId === 'pillar5') return "lg:col-span-2";
    return "lg:col-span-1";
  }
  return "lg:col-span-1";
};

export const getTabletGridClass = (pillarId: string, selectedId: string | null): string => {
  
  // DEFAULT STATE (No Selection)
  // Logic: 6 items @ 1 slot, P7 @ 2 slots = 8 slots (4 rows).
  if (!selectedId) {
    if (pillarId === 'pillar7') return "md:col-span-2";
    return "md:col-span-1";
  }

  // ACTIVE STATE LOGIC
  
  // 1. ACTIVE CARD IS ALWAYS FULL WIDTH
  if (pillarId === selectedId) {
    return "md:col-span-2";
  }

  // 2. EVEN CARDS ACTIVE (2, 4, 6)
  // Cause misalignment because they start on the right side.
  // We must expand the PREVIOUS card to push the active card to a new row.
  // And expand the LAST card (P7) to fill the bottom gap.
  
  // P2 Active
  if (selectedId === 'pillar2') {
    if (pillarId === 'pillar1') return "md:col-span-2"; // Expand prev
    if (pillarId === 'pillar7') return "md:col-span-2"; // Balance bottom
    return "md:col-span-1";
  }

  // P4 Active
  if (selectedId === 'pillar4') {
    if (pillarId === 'pillar3') return "md:col-span-2"; // Expand prev
    if (pillarId === 'pillar7') return "md:col-span-2"; // Balance bottom
    return "md:col-span-1";
  }

  // P6 Active
  if (selectedId === 'pillar6') {
    if (pillarId === 'pillar5') return "md:col-span-2"; // Expand prev
    if (pillarId === 'pillar7') return "md:col-span-2"; // Balance bottom
    return "md:col-span-1";
  }

  // 3. ODD CARDS ACTIVE (1, 3, 5, 7)
  // These naturally start on the left (or fill a row), so remaining items = 6.
  // 6 items @ 1 slot = 3 rows. No gaps. Everyone stays span-1.
  return "md:col-span-1";
};
