import { Outlet } from "react-router";
import { useMovieInfoModalStore } from "../store/movieInfoBoxStore";
import MovieInfoModal from "../components/movieInfo/movie_info_modal/MovieInfoModal";

export default function LayOut() {
  const isMovieInfoModalOpen = useMovieInfoModalStore(
    (state) => state.isMovieInfoModalOpen
  );
  return (
    <main className="bg-black text-white flex flex-col gap-[20px] min-h-screen">
      <section className="w-[80%] mx-auto py-[50px] px-[50px]">
        <Outlet />
        {isMovieInfoModalOpen && <MovieInfoModal />}
      </section>
    </main>
  );
}
