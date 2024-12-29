import { create } from "zustand";

interface T_moreInfoPageStore {
  movieInfoList: T_MovieResult[];
  setMovieInfoList: (getData: T_MovieResult[]) => void;
  addMovieInfoList: (getData: T_MovieResult[]) => void;
  pageCount: number;
  plusPageCount: () => void;
  resetPageCount: () => void;
}

export const moreInfoPageStore = create<T_moreInfoPageStore>((set) => ({
  movieInfoList: [],
  setMovieInfoList: (getData) => set(() => ({ movieInfoList: getData })),
  addMovieInfoList: (getData) =>
    set((state) => ({ movieInfoList: [...state.movieInfoList, ...getData] })),
  pageCount: 5,
  plusPageCount: () => {
    set((state) => ({ pageCount: state.pageCount + 1 }));
  },
  resetPageCount: () => {
    set(() => ({ pageCount: 5 }));
  },
}));
