import { create } from "zustand";

interface T_testStore {
  testingData: T_nowPlaying | {};
  setTestingData: (getData: T_nowPlaying) => void;
  testingResult: T_nowPlayingMovieResult[];
  setTestingResult: (getData: T_nowPlayingMovieResult[]) => void;
}

export const useTestStore = create<T_testStore>((set) => ({
  testingData: {},
  setTestingData: (getData) => set(() => ({ testingData: getData })),
  testingResult: [],
  setTestingResult: (getData) => set(() => ({ testingResult: getData })),
}));
