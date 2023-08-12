import { Tag } from "@/app/constants/tags";
import { create } from "zustand";

interface AppState {
  inputFile: File | null;
  tags: (Tag | string)[];
}

type AppStateSetters = {
  [K in keyof AppState as `set${Capitalize<string & K>}`]: (
    value: AppState[K],
  ) => void;
};

export const appState = create<AppState & AppStateSetters>((set) => ({
  inputFile: null,
  tags: [],
  setInputFile: (inputFile) => set({ inputFile }),
  setTags: (tags) => set({ tags }),
}));
