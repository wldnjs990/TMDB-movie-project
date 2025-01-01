import { create } from "zustand";

interface T_movieInfoModalStore {
  isMovieInfoModalOpen: boolean;
  setMovieInfoModalOpen: () => void;
  setMovieInfoModalClose: () => void;
  showingMovieInfo: T_MovieResult;
  setShowingMovieInfo: (getData: T_MovieResult) => void;
  trailerKey: string;
  setTrailerKey: (getData: string) => void;
}

export const useMovieInfoModalStore = create<T_movieInfoModalStore>((set) => ({
  isMovieInfoModalOpen: false,
  setMovieInfoModalOpen: () => set(() => ({ isMovieInfoModalOpen: true })),
  setMovieInfoModalClose: () => set(() => ({ isMovieInfoModalOpen: false })),
  showingMovieInfo: {} as T_MovieResult,
  setShowingMovieInfo: (movieInfo) =>
    set(() => ({
      showingMovieInfo: movieInfo,
    })),
  trailerKey: "",
  setTrailerKey: (getData) => set(() => ({ trailerKey: getData })),
}));
