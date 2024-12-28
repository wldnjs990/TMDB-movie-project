import { create } from "zustand";

interface T_GenreStore {
  genreList: T_genre[];
  setGenreList: (getData: T_genre[]) => void;
}

export const useGenreStore = create<T_GenreStore>((set) => ({
  genreList: [],
  setGenreList: (getData) => set(() => ({ genreList: getData })),
}));
