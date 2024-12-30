import { useEffect, useRef } from "react";
import { useMovieInfoModalStore } from "../../store/movieInfoBoxStore";

export default function MovieInfoModal() {
  const contentRef = useRef<HTMLDivElement>(null);

  const setMovieInfoModalClose = useMovieInfoModalStore(
    (state) => state.setMovieInfoModalClose
  );
  const showingMovieInfo = useMovieInfoModalStore(
    (state) => state.showingMovieInfo
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "21px";

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, []);
  return (
    <article className="w-full h-screen fixed top-0 left-0 overflow-y-scroll z-50">
      <article
        className="flex justify-center bg-black bg-opacity-70"
        ref={contentRef}
        onClick={(e) => {
          if (e.target === contentRef.current) {
            setMovieInfoModalClose();
          }
        }}
      >
        <article className="w-full max-w-[1200px] h-[3000px] mx-[30px] mt-[30px] mb-[10px] rounded-lg bg-[#181818]">
          <article className="relative before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-gradient-to-t from-[#181818] to-transition">
            <img
              src={`https://image.tmdb.org/t/p/original/${showingMovieInfo.backdrop_path}`}
              alt="백드랍 이미지"
              className="rounded-t-lg"
            />
          </article>
        </article>
      </article>
    </article>
  );
}
