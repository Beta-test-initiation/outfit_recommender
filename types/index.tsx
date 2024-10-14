export interface WardrobeItem {
    id: number;
    name: string;
    color: string;
    type: string;
  }
  
  export interface OutfitSuggestion {
    top: WardrobeItem | undefined;
    bottom: WardrobeItem | undefined;
    shoes: WardrobeItem | undefined;
  }